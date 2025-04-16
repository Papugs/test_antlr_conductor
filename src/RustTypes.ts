import { GeneratedIdentifierFlags } from "typescript";
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
  TypeContext,
} from "./parser/src/RustParser";

// Rust types
enum RustTypeKind {
  Int,
  Float,
  Bool,
  String,
  Array,
  Function,
  Unit, // () type
  Never, // ! type
  Reference, // &T or &mut T
  Unknown,
}

interface RustType {
  kind: RustTypeKind;
  mutable?: boolean;
  elementType?: RustType; // For arrays and references
  paramTypes?: RustType[]; // For functions
  returnType?: RustType; // For functions
}

// Ownership and borrowing tracking
interface VariableInfo {
  type: RustType;
  mutable: boolean;
  borrowed: boolean;
  mutablyBorrowed: boolean;
  borrowCount: number;
  initialized: boolean;
  moved: boolean; // Track if a variable has been moved
}

class TypeEnvironment {
  private scopes: Map<string, VariableInfo>[] = [];

  constructor() {
    // Initialize with an empty scope
    this.pushScope();
  }

  pushScope(): void {
    this.scopes.unshift(new Map<string, VariableInfo>());
  }

  popScope(): void {
    if (this.scopes.length <= 1) {
      throw new Error("cannot pop the global scope");
    }
    this.scopes.shift();
  }

  declare(name: string, type: RustType, mutable: boolean = false): void {
    // Allow shadowing in the same scope

    this.scopes[0].set(name, {
      type,
      mutable,
      borrowed: false,
      mutablyBorrowed: false,
      borrowCount: 0,
      initialized: false,
      moved: false,
    });
  }

  initialize(name: string): void {
    const info = this.lookup(name);
    if (info) {
      info.initialized = true;
    }
  }

  lookup(name: string): VariableInfo | undefined {
    for (const scope of this.scopes) {
      if (scope.has(name)) {
        return scope.get(name);
      }
    }
    return undefined;
  }

  // Borrow a variable (immutably)
  borrow(name: string): void {
    console.log("borrowing", name);
    const info = this.lookup(name);
    if (!info) {
      throw new Error(`cannot borrow undeclared variable \`${name}\``);
    }

    if (info.moved) {
      throw new Error(`cannot borrow \`${name}\` after it has been moved`);
    }

    if (info.mutablyBorrowed) {
      throw new Error(
        `cannot borrow \`${name}\` as immutable because it is already borrowed as mutable`
      );
    }

    info.borrowed = true;
    info.borrowCount++;
  }

  // Borrow a variable mutably
  borrowMut(name: string): void {
    const info = this.lookup(name);
    if (!info) {
      throw new Error(`cannot mutably borrow undeclared variable \`${name}\``);
    }

    if (info.moved) {
      throw new Error(`cannot borrow \`${name}\` after it has been moved`);
    }

    if (!info.mutable) {
      throw new Error(
        `cannot borrow immutable variable \`${name}\` as mutable`
      );
    }

    if (info.borrowed || info.mutablyBorrowed) {
      throw new Error(
        `cannot borrow \`${name}\` as mutable because it is already borrowed`
      );
    }

    info.mutablyBorrowed = true;
  }

  // Release a borrow
  releaseBorrow(name: string, mutable: boolean = false): void {
    const info = this.lookup(name);
    if (!info) {
      return;
    }

    if (mutable) {
      info.mutablyBorrowed = false;
    } else {
      info.borrowCount--;
      if (info.borrowCount === 0) {
        info.borrowed = false;
      }
    }
  }

  // Check if assignment is allowed
  canAssign(name: string): boolean {
    const info = this.lookup(name);
    if (!info) {
      throw new Error(`cannot assign to undeclared variable \`${name}\``);
    }

    if (!info.mutable) {
      throw new Error(`cannot assign twice to immutable variable \`${name}\``);
    }

    if (info.borrowed || info.mutablyBorrowed) {
      throw new Error(`cannot assign to \`${name}\` while it is borrowed`);
    }

    return true;
  }

  // Mark a variable as moved
  markMoved(name: string): void {
    const info = this.lookup(name);
    if (!info) {
      throw new Error(`cannot move undeclared variable \`${name}\``);
    }

    if (info.borrowed || info.mutablyBorrowed) {
      throw new Error(`cannot move \`${name}\` while it is borrowed`);
    }

    info.moved = true;
  }

  // Check if a variable can be used (not moved)
  checkUsable(name: string): void {
    const info = this.lookup(name);
    if (!info) {
      throw new Error(`cannot find value \`${name}\` in this scope`);
    }

    if (info.moved) {
      throw new Error(`borrow of moved value: \`${name}\``);
    }
  }
}

export class RustTypeChecker {
  private env: TypeEnvironment;
  private currentFunctionName: string | null = null;

  constructor() {
    this.env = new TypeEnvironment();
  }

  // Type check a program
  checkProgram(node: ProgContext): void {
    // Check each statement in the program
    for (const statement of node.statement()) {
      this.checkStatement(statement);
    }
  }

  // Type check a statement
  checkStatement(node: StatementContext): void {
    if (node.varDeclaration()) {
      this.checkVarDeclaration(node.varDeclaration()!);
    } else if (node.functionDeclaration()) {
      this.checkFunctionDeclaration(node.functionDeclaration()!);
    } else if (node.expression()) {
      this.checkExpression(node.expression()!);
    } else if (node.returnStatement()) {
      this.checkReturnStatement(node.returnStatement()!);
    } else if (node.ifStatement()) {
      this.checkIfStatement(node.ifStatement()!);
    } else if (node.blockStatement()) {
      this.checkBlockStatement(node.blockStatement()!);
    } else if (node.whileLoop()) {
      this.checkWhileLoop(node.whileLoop()!);
    }
  }

  // Type check a variable declaration
  checkVarDeclaration(node: VarDeclarationContext): void {
    const identifier = node.IDENTIFIER()!.getText();
    const isMutable = node.getText().startsWith("letmut");

    // Infer type from initializer or default to Unknown
    let type: RustType = { kind: RustTypeKind.Unknown };

    // Check if there's a type annotation
    if (node.type()) {
      type = this.parseTypeAnnotation(node.type()!);
    }

    if (node.expression()) {
      const exprType = this.checkExpression(node.expression()!);

      // If we have both a type annotation and an initializer, check compatibility
      if (node.type() && !this.typesCompatible(type, exprType)) {
        throw new Error(
          `mismatched types: expected \`${this.typeToString(
            type
          )}\`, found \`${this.typeToString(exprType)}\``
        );
      }

      // If no type annotation, use the expression type
      if (!node.type()) {
        type = exprType;
      }

      // Check if the right-hand side is a variable that needs to be moved
      const exprText = node.expression()!.getText();
      if (exprText.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && 
          this.isNonCopyableType(exprType)) {
        // It's a simple variable reference to a non-copyable type
        this.env.markMoved(exprText);
      }
    }

    // Declare the variable in the current scope
    this.env.declare(identifier, type, isMutable);

    // Mark as initialized if there's an initializer
    if (node.expression()) {
      this.env.initialize(identifier);
    }
  }

  // Check if a type is non-copyable (needs to be moved)
  isNonCopyableType(type: RustType): boolean {
    // In Rust, primitive types are Copy, but complex types like Vec, String, etc. are not
    switch (type.kind) {
      case RustTypeKind.Int:
      case RustTypeKind.Float:
      case RustTypeKind.Bool:
      case RustTypeKind.Unit:
      case RustTypeKind.Reference: // References are Copy
      case RustTypeKind.String: // &str is Copy, but String is not
        return false;
      case RustTypeKind.Array:  // Arrays of Copy types are Copy, but we'll simplify and treat all arrays as non-Copy
      case RustTypeKind.Function:
        return true;
      default:
        // When in doubt, assume it's non-copyable
        return true;
    }
  }

  // Parse a type annotation
  parseTypeAnnotation(node: TypeContext): RustType {
    const typeText = node.getText();

    // Basic types
    if (typeText === "i32") return { kind: RustTypeKind.Int };
    if (typeText === "f64") return { kind: RustTypeKind.Float };
    if (typeText === "bool") return { kind: RustTypeKind.Bool };
    if (typeText === "&str") return { kind: RustTypeKind.String };
    if (typeText === "()") return { kind: RustTypeKind.Unit };

    // Reference types
    if (typeText.startsWith("&")) {
      const isMutable = typeText.startsWith("&mut ");
      const innerType = this.parseTypeString(
        typeText.substring(isMutable ? 5 : 1)
      );
      return {
        kind: RustTypeKind.Reference,
        mutable: isMutable,
        elementType: innerType,
      };
    }

    // Array types
    if (
      (typeText.startsWith("[") && typeText.endsWith("]")) ||
      (typeText.startsWith("Vec") && typeText.endsWith(">"))
    ) {
      const elementTypeStr = typeText.substring(1, typeText.length - 1);
      const elementType = this.parseTypeString(elementTypeStr);
      return {
        kind: RustTypeKind.Array,
        elementType,
      };
    }

    // Default to unknown type
    return { kind: RustTypeKind.Unknown };
  }

  // Parse a type from a string (helper for parseTypeAnnotation)
  parseTypeString(typeStr: string): RustType {
    if (typeStr === "i32") return { kind: RustTypeKind.Int };
    if (typeStr === "f64") return { kind: RustTypeKind.Float };
    if (typeStr === "bool") return { kind: RustTypeKind.Bool };
    if (typeStr === "&str") return { kind: RustTypeKind.String };
    if (typeStr === "()") return { kind: RustTypeKind.Unit };

    return { kind: RustTypeKind.Unknown };
  }

  // Type check a function declaration
  checkFunctionDeclaration(node: FunctionDeclarationContext): void {
    const functionName = node.IDENTIFIER()!.getText();

    // Create function type
    const paramTypes: RustType[] = [];

    // Default return type is Unit
    let returnType: RustType = { kind: RustTypeKind.Unit };

    // Parse return type if present
    if (node.type()) {
      returnType = this.parseTypeAnnotation(node.type()!);
    }

    // Create function type
    const functionType: RustType = {
      kind: RustTypeKind.Function,
      paramTypes,
      returnType,
    };

    // Declare function in the current scope BEFORE processing parameters and body
    // This allows for recursive function calls
    this.env.declare(functionName, functionType);
    this.env.initialize(functionName);

    // Save the current function name for recursive calls
    const previousFunctionName = this.currentFunctionName;
    this.currentFunctionName = functionName;

    // Push a new scope for function parameters
    this.env.pushScope();

    // Process parameters
    if (node.parameterList()) {
      for (const param of node.parameterList()!.parameter()) {
        const paramName = param.IDENTIFIER().getText();
        let paramType: RustType = { kind: RustTypeKind.Unknown };

        // Parse parameter type annotation if present
        if (param.type()) {
          paramType = this.parseTypeAnnotation(param.type()!);
        }

        const isMutable = param.getText().includes("mut");

        paramTypes.push(paramType);
        this.env.declare(paramName, paramType, isMutable);
        this.env.initialize(paramName);
      }
    }

    // Update function type with parameter types
    functionType.paramTypes = paramTypes;

    // Check function body
    this.checkBlockStatement(node.blockStatement()!);

    // Pop function parameter scope
    this.env.popScope();

    // Restore previous function name
    this.currentFunctionName = previousFunctionName;
  }

  // Type check a block statement
  checkBlockStatement(node: BlockStatementContext): void {
    // Push a new scope
    this.env.pushScope();

    // Check each statement in the block
    for (const statement of node.statement()) {
      this.checkStatement(statement);
    }

    // Pop the scope
    this.env.popScope();
  }

  // Type check an if statement
  checkIfStatement(node: IfStatementContext): void {
    // Check condition - must be boolean
    const conditionType = this.checkExpression(node.expression()!);
    if (conditionType.kind !== RustTypeKind.Bool) {
      throw new Error("If condition must be a boolean expression");
    }

    // Check if branch
    this.checkBlockStatement(node.blockStatement(0)!);

    // Check else branch if it exists
    if (node.blockStatement().length > 1) {
      this.checkBlockStatement(node.blockStatement(1)!);
    } else if (node.ifStatement()) {
      this.checkIfStatement(node.ifStatement()!);
    }
  }

  // Type check a while loop
  checkWhileLoop(node: WhileLoopContext): void {
    // Check condition - must be boolean
    const conditionType = this.checkExpression(node.expression()!);
    if (conditionType.kind !== RustTypeKind.Bool) {
      throw new Error("While condition must be a boolean expression");
    }

    // Check loop body
    this.checkBlockStatement(node.blockStatement()!);
  }

  // Type check a return statement
  checkReturnStatement(node: ReturnStatementContext): void {
    if (node.expression()) {
      this.checkExpression(node.expression()!);
    }
  }

  // Type check an expression and return its type
  checkExpression(node: ExpressionContext): RustType {
    if (node.primary()) {
      return this.checkPrimary(node.primary()!);
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
          return this.checkExpression(expr0);
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
            // Assignment or compound assignment
            const identifier = expr0.getText();
            const varInfo = this.env.lookup(identifier);

            if (!varInfo) {
              throw new Error(
                `cannot find value \`${identifier}\` in this scope`
              );
            }

            // Check if assignment is allowed (mutable and not borrowed)
            this.env.canAssign(identifier);

            let rhsType: RustType;
            if (op === "=") {
              // Simple assignment
              // Check right-hand side type
              rhsType = this.checkExpression(expr1);
              
              // Check if the right-hand side is a variable that needs to be moved
              const rhsText = expr1.getText();
              if (rhsText.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && 
                  this.isNonCopyableType(rhsType)) {
                // It's a simple variable reference to a non-copyable type
                this.env.markMoved(rhsText);
              }
            } else {
              // Compound assignment
              rhsType = this.checkBinaryOperation(
                varInfo.type,
                op.slice(0, -1),
                this.checkExpression(expr1)
              );
            }

            // Type checking for assignment
            if (
              varInfo.type.kind !== RustTypeKind.Unknown &&
              !this.typesCompatible(varInfo.type, rhsType)
            ) {
              throw new Error(
                `mismatched types: expected \`${this.typeToString(
                  varInfo.type
                )}\`, found \`${this.typeToString(rhsType)}\``
              );
            }

            // If variable type was unknown, update it
            if (varInfo.type.kind === RustTypeKind.Unknown) {
              varInfo.type = rhsType;
            }

            // Mark as initialized
            this.env.initialize(identifier);

            return varInfo.type;
          } else {
            // Binary operation
            const leftType = this.checkExpression(expr0);
            const rightType = this.checkExpression(expr1);

            return this.checkBinaryOperation(leftType, op, rightType);
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
        const funcType = this.checkExpression(expr0);

        if (funcType.kind !== RustTypeKind.Function) {
          throw new Error("cannot call a non-function value");
        }

        if (funcType.paramTypes && funcType.paramTypes.length > 0) {
          throw new Error("Function call with wrong number of arguments");
        }

        return funcType.returnType || { kind: RustTypeKind.Unit };
      } else if (child0 && expr0) {
        // Unary operation
        const op = child0.getText();
        const exprType = this.checkExpression(expr0);

        return this.checkUnaryOperation(op, exprType);
      }
    } else if (node.getChildCount() === 4) {
      const child1 = node.getChild(1);

      if (child1 && child1.getText() === "(") {
        // Function call
        const funcExpr = node.expression(0);
        if (funcExpr) {
          const funcName = funcExpr.getText();

          // Special handling for recursive function calls
          if (funcName === this.currentFunctionName) {
            // This is a recursive call to the current function
            const funcType = this.env.lookup(funcName)?.type;

            if (!funcType || funcType.kind !== RustTypeKind.Function) {
              throw new Error(`cannot call a non-function value: ${funcName}`);
            }

            // Check arguments
            const args: ExpressionContext[] = [];
            if (node.expressionList()) {
              args.push(...node.expressionList()!.expression());
            }

            // Check argument count
            if (
              funcType.paramTypes &&
              args.length !== funcType.paramTypes.length
            ) {
              throw new Error(
                `function call with wrong number of arguments: expected ${funcType.paramTypes.length}, got ${args.length}`
              );
            }

            // Check argument types
            for (let i = 0; i < args.length; i++) {
              const argType = this.checkExpression(args[i]);
              
              // Check if argument is a variable that needs to be moved
              const argText = args[i].getText();
              if (argText.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && 
                  this.isNonCopyableType(argType)) {
                // It's a simple variable reference to a non-copyable type
                this.env.markMoved(argText);
              }
              
              if (
                funcType.paramTypes &&
                !this.typesCompatible(funcType.paramTypes[i], argType)
              ) {
                throw new Error(
                  `mismatched types: expected \`${this.typeToString(
                    funcType.paramTypes[i]
                  )}\`, found \`${this.typeToString(argType)}\``
                );
              }
            }

            return funcType.returnType || { kind: RustTypeKind.Unit };
          } else {
            // Normal function call
            const funcType = this.checkExpression(funcExpr);

            if (funcType.kind !== RustTypeKind.Function) {
              throw new Error("cannot call a non-function value");
            }

            // Check arguments
            const args: ExpressionContext[] = [];
            if (node.expressionList()) {
              args.push(...node.expressionList()!.expression());
            }

            // Check argument count
            if (
              funcType.paramTypes &&
              args.length !== funcType.paramTypes.length
            ) {
              throw new Error(
                `Function call with wrong number of arguments: expected ${funcType.paramTypes.length}, got ${args.length}`
              );
            }

            // Check argument types
            for (let i = 0; i < args.length; i++) {
              const argType = this.checkExpression(args[i]);
              
              // Check if argument is a variable that needs to be moved
              const argText = args[i].getText();
              if (argText.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) && 
                  this.isNonCopyableType(argType)) {
                // It's a simple variable reference to a non-copyable type
                this.env.markMoved(argText);
              }
              
              if (
                funcType.paramTypes &&
                !this.typesCompatible(funcType.paramTypes[i], argType)
              ) {
                throw new Error(
                  `mismatched types: expected \`${this.typeToString(
                    funcType.paramTypes[i]
                  )}\`, found \`${this.typeToString(argType)}\``
                );
              }
            }

            return funcType.returnType || { kind: RustTypeKind.Unit };
          }
        }
      } else if (child1 && child1.getText() === "[") {
        // Array access
        const arrayExpr = node.expression(0);
        const indexExpr = node.expression(1);

        if (arrayExpr && indexExpr) {
          const arrayType = this.checkExpression(arrayExpr);
          const indexType = this.checkExpression(indexExpr);

          if (arrayType.kind !== RustTypeKind.Array) {
            throw new Error("cannot index a non-array value");
          }

          if (indexType.kind !== RustTypeKind.Int) {
            throw new Error("Array index must be an integer");
          }

          return arrayType.elementType || { kind: RustTypeKind.Unknown };
        }
      } else if (child1 && child1.getText() === "&") {
        // Reference creation
        const expr = node.expression(1);
        if (expr) {
          const isMutable = node.getChild(2)?.getText() === "mut";
          const targetType = this.checkExpression(expr);

          // Handle borrowing rules
          if (expr.getText().match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
            // It's a simple variable reference
            const varName = expr.getText();

            if (isMutable) {
              this.env.borrowMut(varName);
            } else {
              this.env.borrow(varName);
            }
          }

          return {
            kind: RustTypeKind.Reference,
            mutable: isMutable,
            elementType: targetType,
          };
        }
      }
    }

    // Default to unknown type
    return { kind: RustTypeKind.Unknown };
  }

  // Type check a primary expression
  checkPrimary(node: PrimaryContext): RustType {
    if (node.macroInvocation()) {
      return this.checkMacroInvocation(node.macroInvocation()!);
    } else if (node.IDENTIFIER()) {
      // Variable reference
      const identifier = node.IDENTIFIER()!.getText();
      const varInfo = this.env.lookup(identifier);

      if (!varInfo) {
        throw new Error(`cannot find value \`${identifier}\` in this scope`);
      }

      if (!varInfo.initialized) {
        throw new Error(`cannot use \`${identifier}\` before initialization`);
      }
      
      // Check if the variable has been moved
      this.env.checkUsable(identifier);

      return varInfo.type;
    } else if (node.literal()) {
      return this.checkLiteral(node.literal()!);
    } else if (node.expression()) {
      return this.checkExpression(node.expression()!);
    } else if (node.arrayLiteral()) {
      return this.checkArrayLiteral(node.arrayLiteral()!);
    }

    return { kind: RustTypeKind.Unknown };
  }

  // Type check a macro invocation
  checkMacroInvocation(node: MacroInvocationContext): RustType {
    const macroName = node.BUILTIN()!.getText();

    // For now, only handle println! macro
    if (macroName === "println") {
      // Check arguments
      const args = node.macroArguments()!.expression();

      // Check each argument
      for (const arg of args) {
        this.checkExpression(arg);
        
        // Check if any argument is a variable that has been moved
        const argText = arg.getText();
        if (argText.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
          // It's a simple variable reference
          this.env.checkUsable(argText);
        }
      }

      return { kind: RustTypeKind.Unit };
    }

    return { kind: RustTypeKind.Unknown };
  }

  // Type check a literal
  checkLiteral(node: LiteralContext): RustType {
    if (node.INT()) {
      return { kind: RustTypeKind.Int };
    } else if (node.FLOAT()) {
      return { kind: RustTypeKind.Float };
    } else if (node.STRING()) {
      return { kind: RustTypeKind.String };
    } else if (node.BOOL()) {
      return { kind: RustTypeKind.Bool };
    }

    return { kind: RustTypeKind.Unknown };
  }

  // Type check an array literal
  checkArrayLiteral(node: ArrayLiteralContext): RustType {
    const expressions = node.expressionList()
      ? node.expressionList()!.expression()
      : [];

    if (expressions.length === 0) {
      return {
        kind: RustTypeKind.Array,
        elementType: { kind: RustTypeKind.Unknown },
      };
    }

    // Check first element to determine array type
    const firstType = this.checkExpression(expressions[0]);

    // Check that all elements have the same type
    for (let i = 1; i < expressions.length; i++) {
      const elemType = this.checkExpression(expressions[i]);
      if (!this.typesCompatible(firstType, elemType)) {
        throw new Error(
          `mismatched types: expected \`${this.typeToString(
            firstType
          )}\`, found \`${this.typeToString(elemType)}\``
        );
      }
    }

    return {
      kind: RustTypeKind.Array,
      elementType: firstType,
    };
  }

  // Check if a binary operation is valid and return the result type
  checkBinaryOperation(left: RustType, op: string, right: RustType): RustType {
    switch (op) {
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        // Numeric operations
        if (
          (left.kind === RustTypeKind.Int ||
            left.kind === RustTypeKind.Float) &&
          (right.kind === RustTypeKind.Int || right.kind === RustTypeKind.Float)
        ) {
          // If either operand is float, result is float
          if (
            left.kind === RustTypeKind.Float ||
            right.kind === RustTypeKind.Float
          ) {
            return { kind: RustTypeKind.Float };
          }
          return { kind: RustTypeKind.Int };
        }

        // String concatenation for +
        if (
          op === "+" &&
          left.kind === RustTypeKind.String &&
          right.kind === RustTypeKind.String
        ) {
          return { kind: RustTypeKind.String };
        }

        throw new Error(
          `Invalid operands for operator \`${op}\`: ${this.typeToString(
            left
          )} and ${this.typeToString(right)}`
        );

      case "<":
      case ">":
      case "<=":
      case ">=":
        // Comparison operations
        if (
          (left.kind === RustTypeKind.Int ||
            left.kind === RustTypeKind.Float) &&
          (right.kind === RustTypeKind.Int || right.kind === RustTypeKind.Float)
        ) {
          return { kind: RustTypeKind.Bool };
        }

        if (
          left.kind === RustTypeKind.String &&
          right.kind === RustTypeKind.String
        ) {
          return { kind: RustTypeKind.Bool };
        }

        throw new Error(
          `Invalid operands for operator \`${op}\`: ${this.typeToString(
            left
          )} and ${this.typeToString(right)}`
        );

      case "==":
      case "!=":
        // Equality operations
        if (this.typesCompatible(left, right)) {
          return { kind: RustTypeKind.Bool };
        }

        throw new Error(
          `Invalid operands for operator \`${op}\`: ${this.typeToString(
            left
          )} and ${this.typeToString(right)}`
        );

      case "&&":
      case "||":
        // Logical operations
        if (
          left.kind === RustTypeKind.Bool &&
          right.kind === RustTypeKind.Bool
        ) {
          return { kind: RustTypeKind.Bool };
        }

        throw new Error(
          `Invalid operands for operator \`${op}\`: ${this.typeToString(
            left
          )} and ${this.typeToString(right)}`
        );

      default:
        throw new Error(`Unknown binary operator: ${op}`);
    }
  }

  // Check if a unary operation is valid and return the result type
  checkUnaryOperation(op: string, expr: RustType): RustType {
    switch (op) {
      case "-":
        if (
          expr.kind === RustTypeKind.Int ||
          expr.kind === RustTypeKind.Float
        ) {
          return expr;
        }
        throw new Error(
          `Invalid operand for unary '-': ${this.typeToString(expr)}`
        );

      case "!":
        if (expr.kind === RustTypeKind.Bool) {
          return expr;
        }
        throw new Error(
          `Invalid operand for unary '!': ${this.typeToString(expr)}`
        );

      case "*":
        // Dereference operator
        if (expr.kind === RustTypeKind.Reference) {
          return expr.elementType || { kind: RustTypeKind.Unknown };
        }
        throw new Error(
          `cannot dereference non-reference type: ${this.typeToString(expr)}`
        );

      default:
        throw new Error(`Unknown unary operator: ${op}`);
    }
  }

  // Check if two types are compatible (for assignment, etc.)
  typesCompatible(expected: RustType, actual: RustType): boolean {
    // Unknown type is compatible with anything
    if (
      expected.kind === RustTypeKind.Unknown ||
      actual.kind === RustTypeKind.Unknown
    ) {
      return true;
    }

    // Same kind is a good start
    if (expected.kind !== actual.kind) {
      return false;
    }

    // For arrays, check element type
    if (expected.kind === RustTypeKind.Array) {
      return this.typesCompatible(
        expected.elementType || { kind: RustTypeKind.Unknown },
        actual.elementType || { kind: RustTypeKind.Unknown }
      );
    }

    // For references, check target type and mutability
    if (expected.kind === RustTypeKind.Reference) {
      // Immutable ref can't be assigned to mutable ref
      if (expected.mutable && !actual.mutable) {
        return false;
      }

      return this.typesCompatible(
        expected.elementType || { kind: RustTypeKind.Unknown },
        actual.elementType || { kind: RustTypeKind.Unknown }
      );
    }

    // For functions, check parameter and return types
    if (expected.kind === RustTypeKind.Function) {
      if (
        !expected.paramTypes ||
        !actual.paramTypes ||
        expected.paramTypes.length !== actual.paramTypes.length
      ) {
        return false;
      }

      // Check parameter types
      for (let i = 0; i < expected.paramTypes.length; i++) {
        if (
          !this.typesCompatible(expected.paramTypes[i], actual.paramTypes[i])
        ) {
          return false;
        }
      }

      // Check return type
      return this.typesCompatible(
        expected.returnType || { kind: RustTypeKind.Unit },
        actual.returnType || { kind: RustTypeKind.Unit }
      );
    }

    // For simple types, same kind is enough
    return true;
  }

  // Convert a type to a string representation
  typeToString(type: RustType): string {
    switch (type.kind) {
      case RustTypeKind.Int:
        return "i32";
      case RustTypeKind.Float:
        return "f64";
      case RustTypeKind.Bool:
        return "bool";
      case RustTypeKind.String:
        return "&str";
      case RustTypeKind.Unit:
        return "()";
      case RustTypeKind.Never:
        return "!";
      case RustTypeKind.Unknown:
        return "<unknown>";
      case RustTypeKind.Array:
        return `[${this.typeToString(
          type.elementType || { kind: RustTypeKind.Unknown }
        )}]`;
      case RustTypeKind.Reference:
        return `&${type.mutable ? "mut " : ""}${this.typeToString(
          type.elementType || { kind: RustTypeKind.Unknown }
        )}`;
      case RustTypeKind.Function:
        const params = type.paramTypes
          ? type.paramTypes.map((t) => this.typeToString(t)).join(", ")
          : "";
        const returnType = type.returnType
          ? this.typeToString(type.returnType)
          : "()";
        return `fn(${params}) -> ${returnType}`;
      default:
        return "<unknown>";
    }
  }
}
