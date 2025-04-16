import {
  ExpressionContext,
  ProgContext,
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
  MacroInvocationContext,
} from "./parser/src/RustParser";
import { Instruction } from "./globals";

export class RustCompiler {
  private instructions: Instruction[] = [];
  private wc: number = 0; // Write counter
  private env: string[][] = []; // Compile-time environment
  private builtins: Set<string> = new Set(["println"]);
  private mainFunctionAddress: number | null = null;
  private loopStack: number[][] = []; // Stack to track loop start and end addresses

  // Helper for adding instructions
  private emit(instruction: Instruction): void {
    this.instructions[this.wc++] = instruction;
  }

  // Compile a node into instructions
  public compile(node: any): Instruction[] {
    this.instructions = [];
    this.wc = 0;
    this.mainFunctionAddress = null;
    this.loopStack = [];

    // Add builtins to environment
    this.env = [Array.from(this.builtins), []];

    this.compileNode(node);

    this.emit({ tag: "DONE" });
    return this.instructions;
  }

  // Main dispatch method for compiling different node types
  private compileNode(node: any): void {
    if (node instanceof ProgContext) {
      this.compileProgram(node);
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
      this.compileBreakStatement();
    } else if (node.continueStatement()) {
      this.compileContinueStatement();
    }
  }

  // Compile a break statement
  private compileBreakStatement(): void {
    if (this.loopStack.length === 0) {
      throw new Error("Break statement outside of loop");
    }

    // Create a jump to the end of the current loop
    // The actual address will be filled in when the loop is compiled
    const jumpInstruction: Instruction = { tag: "GOTO" };
    this.emit(jumpInstruction);

    // Add this jump instruction to the list of breaks for the current loop
    const currentLoop = this.loopStack[this.loopStack.length - 1];
    currentLoop.push(this.wc - 1); // Store the index of the jump instruction
  }

  // Compile a continue statement
  private compileContinueStatement(): void {
    if (this.loopStack.length === 0) {
      throw new Error("Continue statement outside of loop");
    }

    // Create a jump to the start of the current loop
    const currentLoop = this.loopStack[this.loopStack.length - 1];
    const loopStartAddress = currentLoop[0]; // First element is the loop start address

    this.emit({ tag: "GOTO", addr: loopStartAddress });
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

    // Check if this is the main function
    if (functionName === "main" && paramCount === 0) {
      this.mainFunctionAddress = functionStartAddress;
    }

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
    this.emit({ tag: "RESET" }); // Will return last value like in Rust

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
      jumpOnFalseInstruction.addr = this.wc; // Account for POP instruction

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
      jumpOnFalseInstruction.addr = this.wc + 1; // Account for POP instruction
    }
  }

  // Compile a block statement
  private compileBlockStatement(
    node: BlockStatementContext | ProgContext
  ): void {
    // Find local variables in block
    const locals = this.scanForLocals(node);

    // Create scope
    if (locals.length > 0) {
      this.emit({ tag: "ENTER_SCOPE", num: locals.length });

      // Add locals to environment
      this.extendEnvironment(locals);
    }

    // Compile statements in block
    let first = true;
    for (const statement of node.statement()) {
      if (!first) {
        this.emit({ tag: "POP" });
      }
      this.compileNode(statement);
      first = false;
    }

    if (locals.length > 0) {
      // Exit scope
      this.emit({ tag: "EXIT_SCOPE" });

      // Remove locals from environment
      this.env.shift();
    }
  }

  // Compile a program
  private compileProgram(node: ProgContext): void {
    // Find local variables in block
    const locals = this.scanForLocals(node);

    // Create scope
    this.emit({ tag: "ENTER_SCOPE", num: locals.length });
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

    // Check if main function was found and call it
    if (this.mainFunctionAddress !== null) {
      // Load the main function
      this.emit({ tag: "LD", sym: "main", pos: this.lookupVariable("main")! });
      // Call main with 0 arguments
      this.emit({ tag: "CALL", arity: 0 });
    } else {
      // No main function found, emit error instruction
      this.emit({ tag: "LDC", val: "Error: No main function found" });
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

    // Create a new loop context and push it to the stack
    // [startAddress, breakJumpAddresses...]
    this.loopStack.push([loopStartAddress]);

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

    // Update all break statements to jump to this point
    const currentLoop = this.loopStack.pop()!;
    for (let i = 1; i < currentLoop.length; i++) {
      const breakJumpIndex = currentLoop[i];
      this.instructions[breakJumpIndex].addr = this.wc;
    }

    // Push undefined as loop result
    this.emit({ tag: "LDC", val: undefined });
  }

  // Compile an array literal
  private compileArrayLiteral(node: ArrayLiteralContext): void {
    // Get all expressions in the array
    const expressions = node.expressionList()
      ? node.expressionList()!.expression()
      : [];

    // Compile each expression in the array (in order)
    for (const expr of expressions) {
      this.compileNode(expr);
    }

    // Create array with compiled expressions
    this.emit({ tag: "ARRAY", size: expressions.length });
  }

  // Compile an expression
  private compileExpression(node: ExpressionContext): void {
    if (node.primary()) {
      // Primary expression (identifier, literal, parenthesized expression, macro invocation)
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

          if (
            op === "=" ||
            op === "+=" ||
            op === "-=" ||
            op === "*=" ||
            op === "/=" ||
            op === "%="
          ) {
            // Assignment
            const identifier = expr0.getText();
            const pos = this.lookupVariable(identifier);
            if (!pos) {
              throw new Error(
                `cannot find value \`${identifier}\` in this scope`
              );
            }
            
            if (op !== "=") {
              // Compound assignment
              this.compileNode(expr0);
              this.compileNode(expr1);
              this.emit({ tag: "BINOP", sym: op.slice(0, -1) });
            } else {
              // Simple assignment
              this.compileNode(expr1);
            }

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
      // Unary operation or function call with no parameters
      const child0 = node.getChild(0);
      const child1 = node.getChild(1);
      const expr0 = node.expression(0);

      if (child0 && expr0 && child1 && child1.getText() === "()") {
        // Function call with no parameters
        this.compileNode(expr0);
        this.emit({ tag: "CALL", arity: 0 });
      } else if (child0 && expr0) {
        // Unary operation
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
        // Array access
        const arrayExpr = node.expression(0); // The array expression
        const indexExpr = node.expression(1); // The index expression

        if (arrayExpr && indexExpr) {
          // Compile array expression
          this.compileNode(arrayExpr);

          // Compile index expression
          this.compileNode(indexExpr);

          // Emit array access instruction
          this.emit({ tag: "ARRAY_ACCESS" });
        }
      } else if (child1 && child1.getText() === ".") {
        // Property access (not fully implemented)
        throw new Error("Property access not implemented yet");
      }
    }
  }

  // Compile a primary expression
  private compilePrimary(node: PrimaryContext): void {
    if (node.macroInvocation()) {
      // Macro invocation
      this.compileMacroInvocation(node.macroInvocation()!);
    } else if (node.IDENTIFIER()) {
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
      // Array literal
      this.compileArrayLiteral(node.arrayLiteral()!);
    }
  }

  // Compile a macro invocation
  private compileMacroInvocation(node: MacroInvocationContext): void {
    const macroName = node.BUILTIN()!.getText();
    const args = node.macroArguments()!.expression();

    const pos = this.lookupVariable(macroName);
    if (!pos) {
      throw new Error(`Variable ${macroName} not declared`);
    }

    this.emit({ tag: "LD", sym: macroName, pos });

    // Push all arguments to the operand stack
    for (const arg of args) {
      this.compileNode(arg);
    }

    // Emit the call instruction with the macro name and arity
    this.emit({ tag: "CALL", arity: args.length });
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
      let index = frame.indexOf(name);
      if (index !== -1) {
        const frame_num = this.env.length - i - 1;
        index = frame_num === 0 ? index + 8 : index;
        return [frame_num, index];
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
      } else if (statement.functionDeclaration()) {
        const funcDecl = statement.functionDeclaration()!;
        const identifier = funcDecl.IDENTIFIER()!.getText();
        locals.push(identifier);
      }
    }

    return locals;
  }
}
