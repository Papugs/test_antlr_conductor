import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import {
  CharStream,
  CommonTokenStream,
  AbstractParseTreeVisitor,
} from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import {
  ExpressionContext,
  ProgContext,
  RustParser,
  StatementContext,
  VarDeclarationContext,
  FunctionDeclarationContext,
  ReturnStatementContext,
  IfStatementContext,
  BlockStatementContext,
  PrimaryContext,
  LiteralContext,
  ArrayLiteralContext,
  WhileLoopContext,
  ExpressionListContext,
  ParameterListContext,
  ParameterContext,
} from "./parser/src/RustParser";
import { RustVisitor } from "./parser/src/RustVisitor";

// **********************
// Virtual Machine Types and Constants
// **********************

// Tags for values stored in heap
const FALSE_TAG = 0;
const TRUE_TAG = 1;
const NUMBER_TAG = 2;
const NULL_TAG = 3;
const UNASSIGNED_TAG = 4;
const UNDEFINED_TAG = 5;
const BLOCKFRAME_TAG = 6;
const CALLFRAME_TAG = 7;
const CLOSURE_TAG = 8;
const FRAME_TAG = 9;
const ENVIRONMENT_TAG = 10;
const PAIR_TAG = 11;
const BUILTIN_TAG = 12;

// Instructions for VM
interface Instruction {
  tag: string;
  val?: any;
  sym?: string;
  addr?: number;
  arity?: number;
  pos?: [number, number];
  num?: number;
}

// **********************
// Heap Implementation
// **********************

class Heap {
  private heap: DataView;
  private heap_size: number;
  private free: number;
  private word_size = 8;
  private size_offset = 5;
  private node_size = 10;

  // Special canonical values
  public False: number;
  public True: number;
  public Null: number;
  public Unassigned: number;
  public Undefined: number;

  constructor(heapsize_words: number) {
    this.heap_size = heapsize_words;
    const data = new ArrayBuffer(heapsize_words * this.word_size);
    this.heap = new DataView(data);
    this.initializeFreeList();
    this.allocateLiteralValues();
  }

  private initializeFreeList(): void {
    // Initialize free list similar to JS VM
    let i = 0;
    for (i = 0; i <= this.heap_size - this.node_size; i = i + this.node_size) {
      this.heap_set(i, i + this.node_size);
    }
    this.heap_set(i - this.node_size, -1); // End of free list
    this.free = 0;
  }

  private allocateLiteralValues(): void {
    this.False = this.heap_allocate(FALSE_TAG, 1);
    this.True = this.heap_allocate(TRUE_TAG, 1);
    this.Null = this.heap_allocate(NULL_TAG, 1);
    this.Unassigned = this.heap_allocate(UNASSIGNED_TAG, 1);
    this.Undefined = this.heap_allocate(UNDEFINED_TAG, 1);
  }

  // Core heap operations
  public heap_allocate(tag: number, size: number): number {
    if (size > this.node_size) {
      throw new Error("limitation: nodes cannot be larger than 10 words");
    }
    if (this.free === -1) {
      // Later we'll implement mark-sweep here
      throw new Error("heap memory exhausted");
    }
    const address = this.free;
    this.free = this.heap_get(this.free);
    this.heap.setInt8(address * this.word_size, tag);
    this.heap.setUint16(address * this.word_size + this.size_offset, size);
    return address;
  }

  // Basic heap operations
  public heap_get(address: number): number {
    return this.heap.getFloat64(address * this.word_size);
  }

  public heap_set(address: number, x: number): void {
    this.heap.setFloat64(address * this.word_size, x);
  }

  public heap_get_child(address: number, child_index: number): number {
    return this.heap_get(address + 1 + child_index);
  }

  public heap_set_child(
    address: number,
    child_index: number,
    value: number
  ): void {
    this.heap_set(address + 1 + child_index, value);
  }

  public heap_get_tag(address: number): number {
    return this.heap.getInt8(address * this.word_size);
  }

  public heap_get_size(address: number): number {
    return this.heap.getUint16(address * this.word_size + this.size_offset);
  }

  public heap_get_number_of_children(address: number): number {
    return this.heap_get_tag(address) === NUMBER_TAG
      ? 0
      : this.heap_get_size(address) - 1;
  }

  // Low-level byte management
  public heap_set_byte_at_offset(
    address: number,
    offset: number,
    value: number
  ): void {
    this.heap.setUint8(address * this.word_size + offset, value);
  }

  public heap_get_byte_at_offset(address: number, offset: number): number {
    return this.heap.getUint8(address * this.word_size + offset);
  }

  public heap_set_2_bytes_at_offset(
    address: number,
    offset: number,
    value: number
  ): void {
    this.heap.setUint16(address * this.word_size + offset, value);
  }

  public heap_get_2_bytes_at_offset(address: number, offset: number): number {
    return this.heap.getUint16(address * this.word_size + offset);
  }

  // Type checking
  public is_Number(address: number): boolean {
    return this.heap_get_tag(address) === NUMBER_TAG;
  }

  public is_Boolean(address: number): boolean {
    return this.is_True(address) || this.is_False(address);
  }

  public is_True(address: number): boolean {
    return this.heap_get_tag(address) === TRUE_TAG;
  }

  public is_False(address: number): boolean {
    return this.heap_get_tag(address) === FALSE_TAG;
  }

  public is_Null(address: number): boolean {
    return this.heap_get_tag(address) === NULL_TAG;
  }

  public is_Undefined(address: number): boolean {
    return this.heap_get_tag(address) === UNDEFINED_TAG;
  }

  public is_Unassigned(address: number): boolean {
    return this.heap_get_tag(address) === UNASSIGNED_TAG;
  }

  // Environment frames and closures
  public heap_allocate_Frame(number_of_values: number): number {
    return this.heap_allocate(FRAME_TAG, number_of_values + 1);
  }

  public heap_allocate_Environment(number_of_frames: number): number {
    return this.heap_allocate(ENVIRONMENT_TAG, number_of_frames + 1);
  }

  public heap_Environment_extend(
    frame_address: number,
    env_address: number
  ): number {
    const old_size = this.heap_get_size(env_address);
    const new_env_address = this.heap_allocate_Environment(old_size);
    let i;
    for (i = 0; i < old_size - 1; i++) {
      this.heap_set_child(
        new_env_address,
        i,
        this.heap_get_child(env_address, i)
      );
    }
    this.heap_set_child(new_env_address, i, frame_address);
    return new_env_address;
  }

  public heap_get_Environment_value(
    env_address: number,
    position: [number, number]
  ): number {
    const [frame_index, value_index] = position;
    const frame_address = this.heap_get_child(env_address, frame_index);
    return this.heap_get_child(frame_address, value_index);
  }

  public heap_set_Environment_value(
    env_address: number,
    position: [number, number],
    value: number
  ): void {
    const [frame_index, value_index] = position;
    const frame_address = this.heap_get_child(env_address, frame_index);
    this.heap_set_child(frame_address, value_index, value);
  }

  public heap_allocate_Closure(arity: number, pc: number, env: number): number {
    const address = this.heap_allocate(CLOSURE_TAG, 2);
    this.heap_set_byte_at_offset(address, 1, arity);
    this.heap_set_2_bytes_at_offset(address, 2, pc);
    this.heap_set_child(address, 0, env);
    return address;
  }

  public is_Closure(address: number): boolean {
    return this.heap_get_tag(address) === CLOSURE_TAG;
  }

  public heap_get_Closure_arity(address: number): number {
    return this.heap_get_byte_at_offset(address, 1);
  }

  public heap_get_Closure_pc(address: number): number {
    return this.heap_get_2_bytes_at_offset(address, 2);
  }

  public heap_get_Closure_environment(address: number): number {
    return this.heap_get_child(address, 0);
  }

  public heap_allocate_Blockframe(env: number): number {
    const address = this.heap_allocate(BLOCKFRAME_TAG, 2);
    this.heap_set_child(address, 0, env);
    return address;
  }

  public is_Blockframe(address: number): boolean {
    return this.heap_get_tag(address) === BLOCKFRAME_TAG;
  }

  public heap_get_Blockframe_environment(address: number): number {
    return this.heap_get_child(address, 0);
  }

  public heap_allocate_Callframe(env: number, pc: number): number {
    const address = this.heap_allocate(CALLFRAME_TAG, 2);
    this.heap_set_2_bytes_at_offset(address, 2, pc);
    this.heap_set_child(address, 0, env);
    return address;
  }

  public is_Callframe(address: number): boolean {
    return this.heap_get_tag(address) === CALLFRAME_TAG;
  }

  public heap_get_Callframe_environment(address: number): number {
    return this.heap_get_child(address, 0);
  }

  public heap_get_Callframe_pc(address: number): number {
    return this.heap_get_2_bytes_at_offset(address, 2);
  }

  // Value management
  public heap_allocate_Number(n: number): number {
    const number_address = this.heap_allocate(NUMBER_TAG, 2);
    this.heap_set(number_address + 1, n);
    return number_address;
  }

  // Conversions between JS values and heap addresses
  public address_to_JS_value(address: number): any {
    if (this.is_Boolean(address)) {
      return this.is_True(address) ? true : false;
    } else if (this.is_Number(address)) {
      return this.heap_get(address + 1);
    } else if (this.is_Undefined(address)) {
      return undefined;
    } else if (this.is_Unassigned(address)) {
      return "<unassigned>";
    } else if (this.is_Null(address)) {
      return null;
    } else if (this.is_Closure(address)) {
      return "<closure>";
    } else {
      return `unknown tag: ${this.heap_get_tag(address)}`;
    }
  }

  public JS_value_to_address(value: any): number {
    if (typeof value === "boolean") {
      return value ? this.True : this.False;
    } else if (typeof value === "number") {
      return this.heap_allocate_Number(value);
    } else if (value === undefined) {
      return this.Undefined;
    } else if (value === null) {
      return this.Null;
    } else {
      throw new Error(`Cannot convert JS value to address: ${value}`);
    }
  }
}

// **********************
// Virtual Machine
// **********************

class RustVM {
  private heap: Heap;
  private OS: number[]; // Operand Stack - values are heap addresses
  private PC: number; // Program Counter
  private E: number; // Environment pointer
  private RTS: number[]; // Return stack - contains frame addresses
  private instructions: Instruction[];

  constructor(heapsize: number) {
    this.heap = new Heap(heapsize);
    this.OS = [];
    this.RTS = [];
    this.PC = 0;
    this.instructions = [];

    // Initialize the environment with an empty frame
    const emptyFrame = this.heap.heap_allocate_Frame(0);
    this.E = this.heap.heap_allocate_Environment(0);
    this.E = this.heap.heap_Environment_extend(emptyFrame, this.E);
  }

  // Initialize the VM with a program
  public loadProgram(instructions: Instruction[]): void {
    this.instructions = instructions;
    this.PC = 0;
  }

  // Stack operations
  private push(value: number): void {
    this.OS.push(value);
  }

  private pop(): number {
    if (this.OS.length === 0) {
      throw new Error("Stack underflow");
    }
    return this.OS.pop()!;
  }

  private peek(offset: number = 0): number {
    if (this.OS.length <= offset) {
      throw new Error("Stack underflow in peek");
    }
    return this.OS[this.OS.length - 1 - offset];
  }

  // VM execution
  public run(): any {
    while (
      this.PC < this.instructions.length &&
      this.instructions[this.PC].tag !== "DONE"
    ) {
      const instr = this.instructions[this.PC++];
      this.executeInstruction(instr);
    }

    // Return the final value on the stack
    return this.heap.address_to_JS_value(this.peek());
  }

  private executeInstruction(instr: Instruction): void {
    switch (instr.tag) {
      case "LDC": // Load constant
        this.push(this.heap.JS_value_to_address(instr.val));
        break;

      case "LD": // Load variable
        const val = this.heap.heap_get_Environment_value(this.E, instr.pos!);
        if (this.heap.is_Unassigned(val)) {
          throw new Error(`Variable ${instr.sym} is unassigned`);
        }
        this.push(val);
        break;

      case "ASSIGN": // Assign to variable
        this.heap.heap_set_Environment_value(this.E, instr.pos!, this.peek());
        break;

      case "POP": // Pop top value from stack
        this.pop();
        break;

      case "UNOP": // Unary operation
        const operand = this.pop();
        const jsVal = this.heap.address_to_JS_value(operand);
        let result;

        switch (instr.sym) {
          case "-":
            result = -jsVal;
            break;
          case "!":
            result = !jsVal;
            break;
          default:
            throw new Error(`Unknown unary operator: ${instr.sym}`);
        }

        this.push(this.heap.JS_value_to_address(result));
        break;

      case "BINOP": // Binary operation
        const right = this.pop();
        const left = this.pop();
        const leftVal = this.heap.address_to_JS_value(left);
        const rightVal = this.heap.address_to_JS_value(right);
        let binopResult;

        switch (instr.sym) {
          case "+":
            binopResult = leftVal + rightVal;
            break;
          case "-":
            binopResult = leftVal - rightVal;
            break;
          case "*":
            binopResult = leftVal * rightVal;
            break;
          case "/":
            if (rightVal === 0) {
              throw new Error("Division by zero");
            }
            binopResult = leftVal / rightVal;
            break;
          case "%":
            binopResult = leftVal % rightVal;
            break;
          case "<":
            binopResult = leftVal < rightVal;
            break;
          case ">":
            binopResult = leftVal > rightVal;
            break;
          case "<=":
            binopResult = leftVal <= rightVal;
            break;
          case ">=":
            binopResult = leftVal >= rightVal;
            break;
          case "==":
            binopResult = leftVal === rightVal;
            break;
          case "!=":
            binopResult = leftVal !== rightVal;
            break;
          case "&&":
            binopResult = leftVal && rightVal;
            break;
          case "||":
            binopResult = leftVal || rightVal;
            break;
          default:
            throw new Error(`Unknown binary operator: ${instr.sym}`);
        }

        this.push(this.heap.JS_value_to_address(binopResult));
        break;

      case "JOF": // Jump on false
        const condition = this.pop();
        if (this.heap.is_False(condition)) {
          this.PC = instr.addr!;
        }
        break;

      case "GOTO": // Unconditional jump
        this.PC = instr.addr!;
        break;

      case "ENTER_SCOPE": // Create a new scope
        this.RTS.push(this.heap.heap_allocate_Blockframe(this.E));
        const frame_address = this.heap.heap_allocate_Frame(instr.num!);
        this.E = this.heap.heap_Environment_extend(frame_address, this.E);

        // Initialize variables as unassigned
        for (let i = 0; i < instr.num!; i++) {
          this.heap.heap_set_child(frame_address, i, this.heap.Unassigned);
        }
        break;

      case "EXIT_SCOPE": // Exit current scope
        this.E = this.heap.heap_get_Blockframe_environment(this.RTS.pop()!);
        break;

      case "LDF": // Load function (create closure)
        const closure_address = this.heap.heap_allocate_Closure(
          instr.arity!,
          instr.addr!,
          this.E
        );
        this.push(closure_address);
        break;

      case "CALL": // Call function
        const arity = instr.arity!;
        const fun = this.peek(arity);

        if (!this.heap.is_Closure(fun)) {
          throw new Error("Calling a non-function");
        }

        const new_PC = this.heap.heap_get_Closure_pc(fun);
        const new_frame = this.heap.heap_allocate_Frame(arity);

        // Pop arguments in reverse order (last argument first)
        for (let i = arity - 1; i >= 0; i--) {
          this.heap.heap_set_child(new_frame, i, this.pop());
        }

        this.pop(); // pop function

        // Save current state for return
        this.RTS.push(this.heap.heap_allocate_Callframe(this.E, this.PC));

        // Set new environment and program counter
        this.E = this.heap.heap_Environment_extend(
          new_frame,
          this.heap.heap_get_Closure_environment(fun)
        );
        this.PC = new_PC;
        break;

      case "TAIL_CALL": // Tail call optimization
        const tailArity = instr.arity!;
        const tailFun = this.peek(tailArity);

        if (!this.heap.is_Closure(tailFun)) {
          throw new Error("Tail calling a non-function");
        }

        const tailPC = this.heap.heap_get_Closure_pc(tailFun);
        const tailFrame = this.heap.heap_allocate_Frame(tailArity);

        // Pop arguments in reverse order
        for (let i = tailArity - 1; i >= 0; i--) {
          this.heap.heap_set_child(tailFrame, i, this.pop());
        }

        this.pop(); // pop function

        // Set new environment and program counter without pushing to RTS
        this.E = this.heap.heap_Environment_extend(
          tailFrame,
          this.heap.heap_get_Closure_environment(tailFun)
        );
        this.PC = tailPC;
        break;

      case "RESET": // Return from function
        const top_frame = this.RTS.pop()!;
        if (this.heap.is_Callframe(top_frame)) {
          this.PC = this.heap.heap_get_Callframe_pc(top_frame);
          this.E = this.heap.heap_get_Callframe_environment(top_frame);
        } else {
          this.PC--;
        }
        break;

      case "DONE": // End of program
        break;

      default:
        throw new Error(`Unknown instruction: ${instr.tag}`);
    }
  }
}

// **********************
// Compiler Implementation
// **********************

class RustCompiler {
  private instructions: Instruction[] = [];
  private wc: number = 0; // Write counter
  private env: string[][] = [[]]; // Compile-time environment

  // Helper for adding instructions
  private emit(instruction: Instruction): void {
    this.instructions[this.wc++] = instruction;
  }

  // Compile a node into instructions
  public compile(node: any): Instruction[] {
    this.instructions = [];
    this.wc = 0;
    this.compileNode(node);
    this.emit({ tag: "DONE" });
    return this.instructions;
  }

  // Main dispatch method for compiling different node types
  private compileNode(node: any): void {
    if (node instanceof ProgContext) {
      this.compileBlockStatement(node);
    } else if (node instanceof ExpressionContext) {
      this.compileExpression(node);
    } else if (node instanceof VarDeclarationContext) {
      this.compileVarDeclaration(node);
    } else if (node instanceof FunctionDeclarationContext) {
      this.compileFunctionDeclaration(node);
    } else if (node instanceof ReturnStatementContext) {
      this.compileReturnStatement(node);
    } else if (node instanceof IfStatementContext) {
      this.compileIfStatement(node);
    } else if (node instanceof BlockStatementContext) {
      this.compileBlockStatement(node);
    } else if (node instanceof WhileLoopContext) {
      this.compileWhileLoop(node);
    } else if (node instanceof StatementContext) {
      this.compileStatement(node);
    } else {
      throw new Error(
        `Unsupported node type: ${node?.constructor?.name || typeof node}`
      );
    }
  }

  // Compile a statement
  private compileStatement(node: StatementContext): void {
    if (node.varDeclaration()) {
      this.compileNode(node.varDeclaration()!);
    } else if (node.functionDeclaration()) {
      this.compileNode(node.functionDeclaration()!);
    } else if (node.expression()) {
      this.compileNode(node.expression()!);
    } else if (node.returnStatement()) {
      this.compileNode(node.returnStatement()!);
    } else if (node.ifStatement()) {
      this.compileNode(node.ifStatement()!);
    } else if (node.blockStatement()) {
      this.compileNode(node.blockStatement()!);
    } else if (node.whileLoop()) {
      this.compileNode(node.whileLoop()!);
    } else if (node.breakStatement()) {
      // Break not fully implemented yet
      this.emit({ tag: "BREAK" });
    } else if (node.continueStatement()) {
      // Continue not fully implemented yet
      this.emit({ tag: "CONTINUE" });
    }
  }

  // Compile a variable declaration
  private compileVarDeclaration(node: VarDeclarationContext): void {
    const identifier = node.IDENTIFIER()!.getText();

    // Find or add variable to environment
    let pos = this.lookupVariable(identifier);
    if (!pos) {
      // Add to current scope
      this.env[0].push(identifier);
      pos = [0, this.env[0].length - 1];
    }

    if (node.expression()) {
      // Compile the initializer expression
      this.compileNode(node.expression()!);
      // Assign the value to the variable
      this.emit({ tag: "ASSIGN", pos });
    } else {
      // Load undefined and assign it
      this.emit({ tag: "LDC", val: undefined });
      this.emit({ tag: "ASSIGN", pos });
    }
  }

  // Compile a function declaration
  private compileFunctionDeclaration(node: FunctionDeclarationContext): void {
    const functionName = node.IDENTIFIER()!.getText();

    // Create a jump instruction to skip the function body
    const paramCount = node.parameterList()?.parameter().length || 0;
    this.emit({ tag: "LDF", arity: paramCount, addr: this.wc + 2 });
    const jumpInstruction: Instruction = { tag: "GOTO" };
    this.emit(jumpInstruction);

    // Record function start address
    const functionStartAddress = this.wc;

    // Create new environment for function parameters
    const params: string[] = [];
    if (node.parameterList()) {
      for (let i = 0; i < node.parameterList()!.parameter().length; i++) {
        const param = node.parameterList()!.parameter(i);
        params.push(param!.IDENTIFIER().getText());
      }
    }

    // Push new frame with parameters
    this.extendEnvironment(params);

    // Compile function body
    this.compileNode(node.blockStatement()!);

    // Add return undefined if no explicit return
    this.emit({ tag: "LDC", val: undefined });
    this.emit({ tag: "RESET" });

    // Set the jump address to skip over function body
    jumpInstruction.addr = this.wc;

    // Pop function environment
    this.env.shift();

    // Store function in environment
    let pos = this.lookupVariable(functionName);
    if (!pos) {
      // Add to current scope
      this.env[0].push(functionName);
      pos = [0, this.env[0].length - 1];
    }

    // Assign function to its name
    this.emit({ tag: "ASSIGN", pos });
  }

  // Compile a return statement
  private compileReturnStatement(node: ReturnStatementContext): void {
    if (node.expression()) {
      // Check if it's a tail call
      if (
        node.expression()! instanceof ExpressionContext &&
        node.expression()!.getChildCount() === 4 &&
        node.expression()!.getChild(1)?.getText() === "("
      ) {
        // This is a function call expression
        // Compile as tail call
        this.compileTailCall(node.expression()! as ExpressionContext);
      } else {
        // Regular return
        this.compileNode(node.expression()!);
        this.emit({ tag: "RESET" });
      }
    } else {
      // Return undefined
      this.emit({ tag: "LDC", val: undefined });
      this.emit({ tag: "RESET" });
    }
  }

  // Compile a tail call (function call in return position)
  private compileTailCall(node: ExpressionContext): void {
    const funcExpr = node.expression(0);
    if (!funcExpr) {
      throw new Error("Function expression missing in call");
    }

    // Compile the function expression
    this.compileNode(funcExpr);

    // Compile arguments
    const args: ExpressionContext[] = [];
    if (node.expressionList()) {
      for (const expr of node.expressionList()!.expression()) {
        this.compileNode(expr);
        args.push(expr);
      }
    }

    // Emit tail call instruction
    this.emit({ tag: "TAIL_CALL", arity: args.length });
  }

  // Compile an if statement
  private compileIfStatement(node: IfStatementContext): void {
    // Compile condition
    this.compileNode(node.expression()!);

    // Jump-on-false instruction
    const jumpOnFalseInstruction: Instruction = { tag: "JOF" };
    this.emit(jumpOnFalseInstruction);

    // Compile true branch
    this.compileNode(node.blockStatement(0));

    if (node.blockStatement().length > 1 || node.ifStatement()) {
      // Has else branch
      const jumpInstruction: Instruction = { tag: "GOTO" };
      this.emit(jumpInstruction);

      // Set address for jump-on-false
      jumpOnFalseInstruction.addr = this.wc;

      if (node.blockStatement().length > 1) {
        // Compile else branch
        this.compileNode(node.blockStatement(1));
      } else if (node.ifStatement()) {
        // Compile else-if branch
        this.compileNode(node.ifStatement()!);
      }

      // Set address for unconditional jump
      jumpInstruction.addr = this.wc;
    } else {
      // No else branch
      jumpOnFalseInstruction.addr = this.wc;
    }
  }

  // Compile a block statement
  private compileBlockStatement(node: BlockStatementContext): void {
    // Find local variables in block
    const locals = this.scanForLocals(node);

    // Create scope
    this.emit({ tag: "ENTER_SCOPE", num: locals.length });

    // Add locals to environment
    this.extendEnvironment(locals);

    // Compile statements in block
    let first = true;
    for (const statement of node.statement()) {
      if (!first) {
        this.emit({ tag: "POP" });
      }
      this.compileNode(statement);
      first = false;
    }

    // Exit scope
    this.emit({ tag: "EXIT_SCOPE" });

    // Remove locals from environment
    this.env.shift();
  }

  // Compile a while loop
  private compileWhileLoop(node: WhileLoopContext): void {
    // Loop start address
    const loopStartAddress = this.wc;

    // Compile condition
    this.compileNode(node.expression()!);

    // Jump-on-false to exit loop
    const jumpOnFalseInstruction: Instruction = { tag: "JOF" };
    this.emit(jumpOnFalseInstruction);

    // Compile loop body
    this.compileNode(node.blockStatement()!);

    // Jump back to condition
    this.emit({ tag: "GOTO", addr: loopStartAddress });

    // Set exit jump address
    jumpOnFalseInstruction.addr = this.wc;

    // Push undefined as loop result
    this.emit({ tag: "LDC", val: undefined });
  }

  // Compile an expression
  private compileExpression(node: ExpressionContext): void {
    if (node.primary()) {
      // Primary expression (identifier, literal, parenthesized expression)
      this.compilePrimary(node.primary()!);
    } else if (node.getChildCount() === 3) {
      const child0 = node.getChild(0);
      const child1 = node.getChild(1);
      const child2 = node.getChild(2);

      if (
        child0 &&
        child2 &&
        child0.getText() === "(" &&
        child2.getText() === ")"
      ) {
        // Parenthesized expression
        const expr0 = node.expression(0);
        if (expr0) {
          this.compileNode(expr0);
        }
      } else {
        // Binary operation
        const expr0 = node.expression(0);
        const expr1 = node.expression(1);

        if (expr0 && child1 && expr1) {
          const op = child1.getText();

          if (op === "=") {
            // Assignment
            const identifier = expr0.getText();
            const pos = this.lookupVariable(identifier);
            if (!pos) {
              throw new Error(`Variable ${identifier} not declared`);
            }

            // Compile right-hand side
            this.compileNode(expr1);

            // Emit assignment instruction
            this.emit({ tag: "ASSIGN", pos });
          } else {
            // Binary operation
            this.compileNode(expr0);
            this.compileNode(expr1);
            this.emit({ tag: "BINOP", sym: op });
          }
        }
      }
    } else if (node.getChildCount() === 2) {
      // Unary operation
      const child0 = node.getChild(0);
      const expr0 = node.expression(0);

      if (child0 && expr0) {
        const op = child0.getText();
        this.compileNode(expr0);
        this.emit({ tag: "UNOP", sym: op });
      }
    } else if (node.getChildCount() === 4) {
      const child1 = node.getChild(1);

      if (child1 && child1.getText() === "(") {
        // Function call
        const funcExpr = node.expression(0);
        if (funcExpr) {
          // Compile function expression
          this.compileNode(funcExpr);

          // Compile arguments
          const args: ExpressionContext[] = [];
          if (node.expressionList()) {
            for (const expr of node.expressionList()!.expression()) {
              this.compileNode(expr);
              args.push(expr);
            }
          }

          // Emit call instruction
          this.emit({ tag: "CALL", arity: args.length });
        }
      } else if (child1 && child1.getText() === "[") {
        // Array access (not fully implemented)
        throw new Error("Array operations not implemented yet");
      } else if (child1 && child1.getText() === ".") {
        // Property access (not fully implemented)
        throw new Error("Property access not implemented yet");
      }
    }
  }

  // Compile a primary expression
  private compilePrimary(node: PrimaryContext): void {
    if (node.IDENTIFIER()) {
      // Variable reference
      const identifier = node.IDENTIFIER()!.getText();
      const pos = this.lookupVariable(identifier);
      if (!pos) {
        throw new Error(`Variable ${identifier} not declared`);
      }

      this.emit({ tag: "LD", sym: identifier, pos });
    } else if (node.literal()) {
      // Literal
      this.compileLiteral(node.literal()!);
    } else if (node.expression()) {
      // Parenthesized expression
      this.compileNode(node.expression()!);
    } else if (node.arrayLiteral()) {
      throw new Error("Array literals not implemented yet");
    }
  }

  // Compile a literal value
  private compileLiteral(node: LiteralContext): void {
    if (node.INT()) {
      this.emit({ tag: "LDC", val: parseInt(node.INT()!.getText()) });
    } else if (node.FLOAT()) {
      this.emit({ tag: "LDC", val: parseFloat(node.FLOAT()!.getText()) });
    } else if (node.STRING()) {
      const text = node.STRING()!.getText();
      this.emit({ tag: "LDC", val: text.substring(1, text.length - 1) }); // Remove quotes
    } else if (node.BOOL()) {
      this.emit({ tag: "LDC", val: node.BOOL()!.getText() === "true" });
    }
  }

  // Environment operations for compile-time variable lookup
  private extendEnvironment(vars: string[]): void {
    this.env.unshift([...vars]);
  }

  private lookupVariable(name: string): [number, number] | null {
    for (let i = 0; i < this.env.length; i++) {
      const frame = this.env[i];
      const index = frame.indexOf(name);
      if (index !== -1) {
        return [i, index];
      }
    }
    return null;
  }

  // Scan for variable declarations in a block
  private scanForLocals(node: BlockStatementContext): string[] {
    const locals: string[] = [];

    for (const statement of node.statement()) {
      if (statement.varDeclaration()) {
        const varDecl = statement.varDeclaration()!;
        const identifier = varDecl.IDENTIFIER()!.getText();
        locals.push(identifier);
      }
    }

    return locals;
  }
}

// **********************
// Rust Evaluator Visitor Implementation
// **********************

class RustEvaluatorVisitor
  extends AbstractParseTreeVisitor<any>
  implements RustVisitor<any>
{
  private vm: RustVM;
  private compiler: RustCompiler;

  constructor() {
    super();
    this.vm = new RustVM(10000); // Allocate 10000 words of heap space
    this.compiler = new RustCompiler();
  }

  // Visit a parse tree produced by RustParser#prog
  visitProg(ctx: ProgContext): any {
    // Compile to instructions
    const program = this.compiler.compile(ctx);
    // console.log(program)

    // Load the program into the VM and run it
    this.vm.loadProgram(program);
    return this.vm.run();
  }

  // Override the default result method from AbstractParseTreeVisitor
  protected defaultResult(): any {
    return null;
  }

  // Override the aggregate result method
  protected aggregateResult(aggregate: any, nextResult: any): any {
    return nextResult;
  }
}

export class RustEvaluator extends BasicEvaluator {
  private executionCount: number;
  private visitor: RustEvaluatorVisitor;

  constructor(conductor: IRunnerPlugin) {
    super(conductor);
    this.executionCount = 0;
    this.visitor = new RustEvaluatorVisitor();
  }

  async evaluateChunk(chunk: string): Promise<void> {
    this.executionCount++;
    try {
      // Create the lexer and parser
      const inputStream = CharStream.fromString(chunk);
      const lexer = new RustLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new RustParser(tokenStream);

      // Parse the input
      const tree = parser.prog();

      // Evaluate the parsed tree
      const result = this.visitor.visit(tree);

      // Send the result to the REPL
      this.conductor.sendOutput(`Result: ${JSON.stringify(result)}`);
    } catch (error) {
      // Handle errors and send them to the REPL
      if (error instanceof Error) {
        this.conductor.sendOutput(`Error: ${error.message}`);
      } else {
        this.conductor.sendOutput(`Error: ${String(error)}`);
      }
    }
  }
}

class MockConductor {
  outputs: string[] = [];

  sendOutput(message: string): void {
    this.outputs.push(message);
  }
}

const mockConductor = new MockConductor();
const evaluator = new RustEvaluator(mockConductor as any);

evaluator.evaluateChunk("let x = 10; x;");
console.log(mockConductor.outputs);