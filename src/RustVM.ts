import { Heap } from "./Heap";
import { Globals, Instruction } from "./globals";

type BuiltinFunction = (...args: unknown[]) => unknown;

const BUILTINS = {
  println: (...args: unknown[]) => {
    if (args.length === 0) {
      console.log();
      return undefined;
    }

    let format = String(args[0]);

    // Handle formatting placeholders {} in Rust style
    if (args.length > 1) {
      let argIndex = 1;
      format = format.replace(/\{(:?[^{}]*)\}/g, (match, formatSpecifier) => {
        if (argIndex < args.length) {
          const value = args[argIndex++];

          // Handle debug formatting for arrays with {:?}
          if (formatSpecifier === ":?") {
            if (Array.isArray(value)) {
              return "[" + value.join(",") + "]";
            }
          }

          return String(value);
        }
        return match;
      });
    }

    console.log(format);
    Globals.conductor!.sendOutput(format); // For tests
    return undefined;
  },
};

export class RustVM {
  private heap: Heap;
  private OS: number[]; // Operand Stack - values are heap addresses
  private PC: number; // Program Counter
  private E: number; // Environment pointer
  private RTS: number[]; // Return stack - contains frame addresses
  private instructions: Instruction[];
  private builtins: Map<string, { id: number; func: BuiltinFunction }>;

  constructor(heapsize: number) {
    this.heap = new Heap(heapsize);
    this.OS = [];
    this.RTS = [];
    this.PC = 0;
    this.instructions = [];
    this.builtins = new Map();

    this.log("Initializing RustVM");

    // Initialize the environment with an empty frame
    const emptyFrame = this.heap.heap_allocate_Frame(0);
    this.E = this.heap.heap_allocate_Environment(0);
    this.E = this.heap.heap_Environment_extend(emptyFrame, this.E);
    this.log(`Initialized environment: E=${this.E}`);

    // Register builtin functions
    this.registerBuiltins();
  }

  private log(message: string): void {
    if (Globals.DEBUG) {
      console.log(`[RustVM] ${message}`);
    }
  }

  // Register all builtin functions
  private registerBuiltins(): void {
    this.log("Registering builtin functions");
    // Create a frame for builtins
    const builtinFrame = this.heap.heap_allocate_Frame(
      Object.keys(BUILTINS).length
    );
    this.log(`Created builtin frame at address: ${builtinFrame}`);

    // Register each builtin function with an ID
    let id = 0;
    for (const [name, func] of Object.entries(BUILTINS)) {
      // Store the function with its ID
      this.builtins.set(name, { id, func: func as BuiltinFunction });

      // Allocate the builtin on the heap
      const builtinAddress = this.heap.heap_allocate_Builtin(id);

      // Store the builtin in the frame
      this.heap.heap_set_child(builtinFrame, id, builtinAddress);
      this.log(
        `Registered builtin '${name}' with ID ${id} at address ${builtinAddress}`
      );

      id++;
    }

    // Extend the environment with the builtin frame
    this.E = this.heap.heap_Environment_extend(builtinFrame, this.E);
    this.log(`Extended environment with builtins: E=${this.E}`);
  }

  // Execute a specific builtin function by ID
  public executeBuiltin(id: number, args: unknown[]): unknown {
    this.log(`Executing builtin with ID ${id}, args: ${JSON.stringify(args)}`);
    // Find the builtin function by ID
    // Use Array.from to convert the Map entries to an array to avoid the TS2802 error
    for (const [name, builtin] of Array.from(this.builtins.entries())) {
      if (builtin.id === id) {
        const result = builtin.func(...args);
        this.log(`Builtin '${name}' executed, result: ${result}`);
        return result;
      }
    }
    throw new Error(`Unknown builtin function with ID: ${id}`);
  }

  // Initialize the VM with a program
  public loadProgram(instructions: Instruction[]): void {
    this.instructions = instructions;
    this.PC = 0;
    this.log(`Loaded program with ${instructions.length} instructions`);
  }

  // Stack operations
  private push(value: number): void {
    this.OS.push(value);
    this.heap.incRef(value);
    this.log(`Push: ${value}, stack size: ${this.OS.length}`);
  }

  private pop(): number {
    if (this.OS.length === 0) {
      throw new Error("Stack underflow");
    }
    const value = this.OS.pop()!;
    this.log(`Pop: ${value}, stack size: ${this.OS.length}`);
    this.heap.decRef(value);
    return value;
  }

  private peek(offset: number = 0): number {
    if (this.OS.length <= offset) {
      throw new Error("Stack underflow in peek");
    }
    const value = this.OS[this.OS.length - 1 - offset];
    this.log(`Peek at offset ${offset}: ${value}`);
    return value;
  }

  // Reference counting
  public cleanup(): void {
    this.log("Cleaning up VM resources");
    
    // Clean up operand stack
    while (this.OS.length > 0) {
      const value = this.OS.pop()!;
      this.heap.decRef(value);
    }
    
    // Clean up return stack
    while (this.RTS.length > 0) {
      const frame = this.RTS.pop()!;
      this.heap.decRef(frame);
    }
    
    // Clean up environment
    this.heap.decRef(this.E);
  }

  // VM execution
  public run(): any {
    this.log("Starting VM execution");
    try {
      while (
        this.PC < this.instructions.length &&
        this.instructions[this.PC].tag !== "DONE"
      ) {
        const instr = this.instructions[this.PC++];
        this.log(`Executing instruction at PC=${this.PC - 1}: ${instr.tag}`);
        this.executeInstruction(instr);
      }

      // Return the final value on the stack
      const finalValueAddress = this.peek();
      const finalValue = this.heap.address_to_JS_value(finalValueAddress);
      this.log(`Execution completed. Final value: ${finalValue}`);
      return finalValue;
    } finally {
      this.cleanup();
    }
  }

  private executeInstruction(instr: Instruction): void {
    switch (instr.tag) {
      case "LDC": // Load constant
        this.log(`LDC: Loading constant ${instr.val}`);
        this.push(this.heap.JS_value_to_address(instr.val));
        break;

      case "LD": // Load variable
        this.log(
          `LD: Loading variable at position ${instr.pos}, symbol: ${instr.sym}`
        );
        const val = this.heap.heap_get_Environment_value(this.E, instr.pos!);
        if (this.heap.is_Unassigned(val)) {
          throw new Error(`Variable ${instr.sym} is unassigned`);
        }
        this.push(val);
        this.heap.incRef(val); // Increment reference count
        break;

      case "ASSIGN": // Assign to variable
        this.log(`ASSIGN: Assigning to variable at position ${instr.pos}`);
        this.heap.heap_set_Environment_value(this.E, instr.pos!, this.peek());
        this.heap.decRef(this.peek()); // Decrement reference count
        break;

      case "POP": // Pop top value from stack
        this.log("POP: Removing top value from stack");
        this.log(`POP: Stack before pop: ${JSON.stringify(this.OS)}`);
        this.pop();
        break;

      case "UNOP": // Unary operation
        this.log(`UNOP: Applying unary operator ${instr.sym}`);
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

        this.log(`UNOP: ${instr.sym}${jsVal} = ${result}`);
        this.push(this.heap.JS_value_to_address(result));
        break;

      case "BINOP": // Binary operation
        this.log(`BINOP: Applying binary operator ${instr.sym}`);
        const right = this.pop();
        const left = this.pop();
        const leftVal = this.heap.address_to_JS_value(left);
        const rightVal = this.heap.address_to_JS_value(right);
        let binopResult;

        switch (instr.sym) {
          case "+":
            // Special handling for string concatenation
            if (typeof leftVal === "string" || typeof rightVal === "string") {
              binopResult = String(leftVal) + String(rightVal);
            } else {
              binopResult = leftVal + rightVal;
            }
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

        this.log(`BINOP: ${leftVal} ${instr.sym} ${rightVal} = ${binopResult}`);
        this.push(this.heap.JS_value_to_address(binopResult));
        break;

      case "JOF": // Jump on false
        this.log(`JOF: Jump to ${instr.addr} if condition is false`);
        const condition = this.pop();
        if (this.heap.is_False(condition)) {
          this.log(`JOF: Condition is false, jumping to ${instr.addr}`);
          this.PC = instr.addr!;
        } else {
          this.log(`JOF: Condition is true, continuing`);
        }
        break;

      case "GOTO": // Unconditional jump
        this.log(`GOTO: Jumping to ${instr.addr}`);
        this.PC = instr.addr!;
        break;

      case "ENTER_SCOPE": // Create a new scope
        this.log(`ENTER_SCOPE: Creating new scope with ${instr.num} variables`);
        this.RTS.push(this.heap.heap_allocate_Blockframe(this.E));
        const frame_address = this.heap.heap_allocate_Frame(instr.num!);
        this.E = this.heap.heap_Environment_extend(frame_address, this.E);
        this.log(
          `ENTER_SCOPE: New environment E=${this.E}, frame=${frame_address}`
        );

        // Initialize variables as unassigned
        for (let i = 0; i < instr.num!; i++) {
          this.heap.heap_set_child(frame_address, i, this.heap.Unassigned);
        }
        this.heap.decRef(frame_address); // Decrement reference count for the frame
        break;

      case "EXIT_SCOPE": // Exit current scope
        this.log("EXIT_SCOPE: Exiting current scope");
        const oldE = this.E;
        this.E = this.heap.heap_get_Blockframe_environment(this.RTS.pop()!);
        this.log(
          `EXIT_SCOPE: Restored environment from E=${oldE} to E=${this.E}`
        );
        this.heap.decRef(oldE); // Decrement reference count for the old environment
        this.heap.decRef(this.E); // Decrement reference count for the new environment
        break;

      case "LDF": // Load function (create closure)
        this.log(
          `LDF: Creating closure with arity ${instr.arity}, address ${instr.addr}`
        );
        const closure_address = this.heap.heap_allocate_Closure(
          instr.arity!,
          instr.addr!,
          this.E
        );
        this.log(`LDF: Created closure at address ${closure_address}`);
        this.push(closure_address);
        break;

      case "CALL": // Call function
        const arity = instr.arity!;
        const fun = this.peek(arity);
        this.log(
          `CALL: Calling function at address ${fun} with arity ${arity}`
        );

        if (this.heap.is_Builtin(fun)) {
          this.log(`CALL: Function is a builtin`);
          // Collect arguments from stack
          const args = [];
          for (let i = arity - 1; i >= 0; i--) {
            const arg = this.pop();
            args.unshift(this.heap.address_to_JS_value(arg) as never);
            this.heap.decRef(arg); // Decrement reference count for each argument
          }
          const funcRef = this.pop(); // Remove function reference
          this.heap.decRef(funcRef); // Decrement reference count for the function
          const builtin_id = this.heap.heap_get_Builtin_id(fun);
          this.log(
            `CALL: Executing builtin with ID ${builtin_id}, args: ${JSON.stringify(
              args
            )}`
          );

          // Call the builtin and push result
          const result = this.executeBuiltin(builtin_id, args);
          this.push(this.heap.JS_value_to_address(result));
          break;
          return;
        }

        const new_PC = this.heap.heap_get_Closure_pc(fun);
        const new_frame = this.heap.heap_allocate_Frame(arity);
        this.log(`CALL: Created new frame at ${new_frame} for function call`);

        // Pop arguments in reverse order (last argument first)
        for (let i = arity - 1; i >= 0; i--) {
          const arg = this.pop();
          this.log(`CALL: Setting argument ${i} to ${arg}`);
          this.heap.heap_set_child(new_frame, i, arg);
          this.heap.decRef(arg); // Decrement reference count for each argument
        }

        const funcRef = this.pop(); // pop function
        this.log(`CALL: Popped function reference`);

        // Save current state for return
        const callframe = this.heap.heap_allocate_Callframe(this.E, this.PC);
        this.RTS.push(callframe);
        this.log(
          `CALL: Saved return state at ${callframe}, PC=${this.PC}, E=${this.E}`
        );

        // Set new environment and program counter
        const oldEnv = this.E;
        this.E = this.heap.heap_Environment_extend(
          new_frame,
          this.heap.heap_get_Closure_environment(fun)
        );
        this.PC = new_PC;

        this.heap.decRef(funcRef); // Decrement reference count for the function
        this.heap.decRef(callframe); // Decrement reference count for the call frame
        this.heap.decRef(new_frame); // Decrement reference count for the new frame

        this.log(
          `CALL: Set new environment E=${this.E} (was ${oldEnv}) and PC=${this.PC}`
        );
        break;

      case "TAIL_CALL": // Tail call optimization
        const tailArity = instr.arity!;
        const tailFun = this.peek(tailArity);
        this.log(
          `TAIL_CALL: Tail calling function at ${tailFun} with arity ${tailArity}`
        );

        if (!this.heap.is_Closure(tailFun)) {
          throw new Error("Tail calling a non-function");
        }

        const tailPC = this.heap.heap_get_Closure_pc(tailFun);
        const tailFrame = this.heap.heap_allocate_Frame(tailArity);
        this.log(`TAIL_CALL: Created new frame at ${tailFrame}`);

        // Pop arguments in reverse order
        for (let i = tailArity - 1; i >= 0; i--) {
          const arg = this.pop();
          this.log(`TAIL_CALL: Setting argument ${i} to ${arg}`);
          this.heap.heap_set_child(tailFrame, i, arg);
        }

        this.pop(); // pop function
        this.log(`TAIL_CALL: Popped function reference`);

        // Set new environment and program counter without pushing to RTS
        const oldTailEnv = this.E;
        this.E = this.heap.heap_Environment_extend(
          tailFrame,
          this.heap.heap_get_Closure_environment(tailFun)
        );
        this.PC = tailPC;
        this.log(
          `TAIL_CALL: Set new environment E=${this.E} (was ${oldTailEnv}) and PC=${this.PC}`
        );
        break;

      case "RESET": // Return from function
        this.log("RESET: Returning from function");
        const returnValue = this.peek(); // reference to the return value
        const top_frame = this.RTS.pop()!;
        if (this.heap.is_Callframe(top_frame)) {
          const oldPC = this.PC;
          const oldE = this.E;
          this.PC = this.heap.heap_get_Callframe_pc(top_frame);
          this.heap.decRef(this.E); // Decrement reference count for old environment
          this.E = this.heap.heap_get_Callframe_environment(top_frame);
          this.log(
            `RESET: Restored PC=${this.PC} (was ${oldPC}) and E=${this.E} (was ${oldE})`
          );
        } else {
          this.PC--;
          this.log(`RESET: Not a callframe, decremented PC to ${this.PC}`);
        }
        this.heap.decRef(top_frame); // Decrement reference count for the frame
        break;

      case "DONE": // End of program
        this.log("DONE: End of program");
        break;

      case "ARRAY": // Create an array
        this.log(`ARRAY: Creating array of size ${instr.size}`);
        const arraySize = instr.size!;
        const arrayAddress = this.heap.heap_allocate_Array(arraySize);
        this.log(`ARRAY: Allocated array at address ${arrayAddress}`);

        // Pop values from stack in reverse order and add to array
        for (let i = arraySize - 1; i >= 0; i--) {
          const element = this.pop();
          this.log(`ARRAY: Setting element ${i} to ${element}`);
          this.heap.heap_set_Array_element(arrayAddress, i, element);
          this.heap.decRef(element)
        }

        // Push array address to stack
        this.push(arrayAddress);
        this.heap.decRef(arrayAddress);
        break;

      case "ARRAY_ACCESS": // Access array element
        this.log("ARRAY_ACCESS: Accessing array element");
        const index = this.pop();
        const array = this.pop();
        this.log(`ARRAY_ACCESS: Array at ${array}, index at ${index}`);

        // Check if array is actually an array
        if (!this.heap.is_Array(array)) {
          this.heap.decRef(index);
          this.heap.decRef(array);
          throw new Error("cannot use array access on non-array value");
        }

        // Get the index value
        const indexValue = this.heap.address_to_JS_value(index);
        if (typeof indexValue !== "number" || !Number.isInteger(indexValue)) {
          this.heap.decRef(index);
          this.heap.decRef(array);
          throw new Error(
            `Array index must be an integer, got ${typeof indexValue}`
          );
        }

        // Access the array element
        try {
          const element = this.heap.heap_get_Array_element(array, indexValue);
          this.log(`ARRAY_ACCESS: Retrieved element ${indexValue}: ${element}`);
          this.push(element);
          this.heap.incRef(element); // Increment reference count for the element

          this.heap.decRef(array); // Decrement reference count for the array
          this.heap.decRef(index); // Decrement reference count for the index
        } catch (error) {
          this.heap.decRef(index);
          this.heap.decRef(array);
          throw new Error(`Array index out of bounds: ${indexValue}`);
        }
        break;

      default:
        throw new Error(`Unknown instruction: ${instr.tag}`);
    }
  }
}
