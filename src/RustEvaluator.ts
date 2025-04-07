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
} from "./parser/src/RustParser";
import { RustVisitor } from "./parser/src/RustVisitor";

class RustEvaluatorVisitor
  extends AbstractParseTreeVisitor<any>
  implements RustVisitor<any>
{
  private variables: Map<string, any> = new Map();
  private functions: Map<string, any> = new Map();

  // Visit a parse tree produced by RustParser#prog
  visitProg(ctx: ProgContext): any {
    let result: any;
    for (const statement of ctx.statement()) {
      result = this.visit(statement);
    }
    return result;
  }

  // Visit a parse tree produced by RustParser#statement
  visitStatement(ctx: StatementContext): any {
    if (ctx.varDeclaration()) {
      return this.visit(ctx.varDeclaration()!);
    } else if (ctx.functionDeclaration()) {
      return this.visit(ctx.functionDeclaration()!);
    } else if (ctx.expression()) {
      return this.visit(ctx.expression()!);
    } else if (ctx.returnStatement()) {
      return this.visit(ctx.returnStatement()!);
    } else if (ctx.ifStatement()) {
      return this.visit(ctx.ifStatement()!);
    } else if (ctx.blockStatement()) {
      return this.visit(ctx.blockStatement()!);
    } else if (ctx.whileLoop()) {
      return this.visit(ctx.whileLoop()!);
    } else if (ctx.breakStatement()) {
      return { type: "break" };
    } else if (ctx.continueStatement()) {
      return { type: "continue" };
    }
    return null;
  }

  // Visit a parse tree produced by RustParser#varDeclaration
  visitVarDeclaration(ctx: VarDeclarationContext): any {
    const identifier = ctx.IDENTIFIER()!.getText();
    let value = null;

    if (ctx.expression()) {
      value = this.visit(ctx.expression()!);
    }

    this.variables.set(identifier, value);
    return value;
  }

  // Visit a parse tree produced by RustParser#functionDeclaration
  visitFunctionDeclaration(ctx: FunctionDeclarationContext): any {
    const functionName = ctx.IDENTIFIER()!.getText();
    this.functions.set(functionName, ctx);
    return null;
  }

  // Visit a parse tree produced by RustParser#returnStatement
  visitReturnStatement(ctx: ReturnStatementContext): any {
    if (ctx.expression()) {
      return { type: "return", value: this.visit(ctx.expression()!) };
    }
    return { type: "return", value: null };
  }

  // Visit a parse tree produced by RustParser#ifStatement
  visitIfStatement(ctx: IfStatementContext): any {
    const condition = this.visit(ctx.expression()!);

    if (condition) {
      const blockStatement = ctx.blockStatement(0);
      if (blockStatement) {
        return this.visit(blockStatement);
      }
    } else if (ctx.blockStatement().length > 1) {
      const elseBlock = ctx.blockStatement(1);
      if (elseBlock) {
        return this.visit(elseBlock);
      }
    } else if (ctx.ifStatement()) {
      return this.visit(ctx.ifStatement()!);
    }

    return null;
  }

  // Visit a parse tree produced by RustParser#whileLoop
  visitWhileLoop(ctx: WhileLoopContext): any {
    while (true) {
      const condition = this.visit(ctx.expression()!);
      if (!condition) {
        break;
      }

      const result = this.visit(ctx.blockStatement()!);

      if (result && typeof result === "object") {
        if (result.type === "return") {
          return result;
        } else if (result.type === "break") {
          break;
        } else if (result.type === "continue") {
          continue;
        }
      }
    }

    return null;
  }

  // Visit a parse tree produced by RustParser#blockStatement
  visitBlockStatement(ctx: BlockStatementContext): any {
    let result: any = null;

    for (const statement of ctx.statement()) {
      result = this.visit(statement);

      // Handle early returns, breaks, and continues
      if (
        result &&
        typeof result === "object" &&
        (result.type === "return" ||
          result.type === "break" ||
          result.type === "continue")
      ) {
        return result;
      }
    }

    return result;
  }

  // Visit a parse tree produced by RustParser#expression
  visitExpression(ctx: ExpressionContext): any {
    if (ctx.primary()) {
      return this.visit(ctx.primary()!);
    } else if (ctx.getChildCount() === 3) {
      const child0 = ctx.getChild(0);
      const child2 = ctx.getChild(2);

      if (
        child0 &&
        child2 &&
        child0.getText() === "(" &&
        child2.getText() === ")"
      ) {
        // Parenthesized expression
        const expr0 = ctx.expression(0);
        if (expr0) {
          return this.visit(expr0);
        }
      } else {
        // Binary operation
        const expr0 = ctx.expression(0);
        const child1 = ctx.getChild(1);
        const expr1 = ctx.expression(1);

        if (expr0 && child1 && expr1) {
          const left = this.visit(expr0);
          const op = child1.getText();
          const right = this.visit(expr1);

          switch (op) {
            case "+":
              return left + right;
            case "-":
              return left - right;
            case "*":
              return left * right;
            case "/":
              if (right === 0) {
                throw new Error("Division by zero");
              }
              return left / right;
            case "%":
              return left % right;
            case "<":
              return left < right;
            case ">":
              return left > right;
            case "<=":
              return left <= right;
            case ">=":
              return left >= right;
            case "==":
              return left === right;
            case "!=":
              return left !== right;
            case "&&":
              return left && right;
            case "||":
              return left || right;
            case "=":
              const exprText = expr0.getText();
              if (exprText && this.variables.has(exprText)) {
                this.variables.set(exprText, right);
                return right;
              }
              throw new Error(`Cannot assign to ${exprText}`);
            default:
              throw new Error(`Unknown operator: ${op}`);
          }
        }
      }
    } else if (ctx.getChildCount() === 2) {
      // Unary operation
      const child0 = ctx.getChild(0);
      const expr0 = ctx.expression(0);

      if (child0 && expr0) {
        const op = child0.getText();
        const value = this.visit(expr0);

        switch (op) {
          case "-":
            return -value;
          case "!":
            return !value;
          default:
            throw new Error(`Unknown unary operator: ${op}`);
        }
      }
    } else if (ctx.getChildCount() === 4) {
      // Array access: expression '[' expression ']'
      // Function call: expression '(' expressionList? ')'
      // Method call: expression '.' IDENTIFIER
      const child1 = ctx.getChild(1);
      const child2 = ctx.getChild(2);

      if (child1 && child1.getText() === "[") {
        // Array access
        const expr0 = ctx.expression(0);
        const expr1 = ctx.expression(1);

        if (expr0 && expr1) {
          const array = this.visit(expr0);
          const index = this.visit(expr1);

          if (Array.isArray(array) && index >= 0 && index < array.length) {
            return array[index];
          }

          throw new Error(`Invalid array access at index ${index}`);
        }
      } else if (child1 && child1.getText() === "(") {
        // Function call
        const expr0 = ctx.expression(0);
        if (expr0) {
          const func = this.visit(expr0);
          const args = ctx.expressionList()
            ? this.visitExpressionList(ctx.expressionList())
            : [];

          if (typeof func === "function") {
            // TODO: Proper function calls
            return func(...args);
          }

          throw new Error(`${expr0.getText()} is not a function`);
        }
      } else if (child1 && child1.getText() === ".") {
        // Method call or property access
        const expr0 = ctx.expression(0);
        if (expr0 && child2) {
          const obj = this.visit(expr0);
          const prop = child2.getText();

          if (obj && typeof obj === "object" && prop in obj) {
            return obj[prop];
          }

          throw new Error(`Property ${prop} not found on object`);
        }
      }
    }

    throw new Error(`Invalid expression: ${ctx.getText()}`);
  }

  // Visit a parse tree produced by RustParser#primary
  visitPrimary(ctx: PrimaryContext): any {
    if (ctx.IDENTIFIER()) {
      const identifier = ctx.IDENTIFIER()!.getText();
      if (this.variables.has(identifier)) {
        return this.variables.get(identifier);
      }
      throw new Error(`Variable ${identifier} not defined`);
    } else if (ctx.literal()) {
      return this.visit(ctx.literal()!);
    } else if (ctx.expression()) {
      return this.visit(ctx.expression()!);
    } else if (ctx.arrayLiteral()) {
      return this.visit(ctx.arrayLiteral()!);
    }

    throw new Error(`Invalid primary expression: ${ctx.getText()}`);
  }

  // Visit a parse tree produced by RustParser#literal
  visitLiteral(ctx: LiteralContext): any {
    if (ctx.INT()) {
      return parseInt(ctx.INT()!.getText());
    } else if (ctx.FLOAT()) {
      return parseFloat(ctx.FLOAT()!.getText());
    } else if (ctx.STRING()) {
      const text = ctx.STRING()!.getText();
      return text.substring(1, text.length - 1); // Remove quotes
    } else if (ctx.BOOL()) {
      return ctx.BOOL()!.getText() === "true";
    }

    throw new Error(`Invalid literal: ${ctx.getText()}`);
  }

  // Visit a parse tree produced by RustParser#arrayLiteral
  visitArrayLiteral(ctx: ArrayLiteralContext): any {
    if (!ctx.expressionList()) {
      return [];
    }

    return this.visitExpressionList(ctx.expressionList()!);
  }

  // Visit a parse tree produced by RustParser#expressionList
  visitExpressionList(ctx: any): any[] {
    const result: any[] = [];

    for (const expr of ctx.expression()) {
      result.push(this.visit(expr));
    }

    return result;
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
