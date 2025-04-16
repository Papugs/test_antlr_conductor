import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import {
  CharStream,
  CommonTokenStream,
  AbstractParseTreeVisitor,
} from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import { ProgContext, RustParser } from "./parser/src/RustParser";
import { RustVisitor } from "./parser/src/RustVisitor";
import { RustCompiler } from "./RustCompiler";
import { RustTypeChecker } from "./RustTypes";
import { RustVM } from "./RustVM";
import { Globals } from "./globals";

class RustEvaluatorVisitor
  extends AbstractParseTreeVisitor<any>
  implements RustVisitor<any>
{
  private vm: RustVM;
  private compiler: RustCompiler;
  private typeChecker: RustTypeChecker;

  constructor() {
    super();
    this.vm = new RustVM(10000); // Allocate 10000 words of heap space
    this.compiler = new RustCompiler();
    this.typeChecker = new RustTypeChecker();
  }

  // Visit a parse tree produced by RustParser#prog
  visitProg(ctx: ProgContext): any {
    // First, type check the program
    try {
      this.typeChecker.checkProgram(ctx);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error(`${String(error)}`);
      }
    }

    // If type checking passes, compile to instructions
    const program = this.compiler.compile(ctx);

    if (Globals.DEBUG) {
      console.log("[Visitor] Compiled program:", program);
    }

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
    Globals.conductor = conductor;
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
      this.visitor.visit(tree);
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

// For quick tests
class MockConductor {
  outputs: string[] = [];

  sendOutput(message: string): void {
    this.outputs.push(message);
  }
}

const mockConductor = new MockConductor();
const evaluator = new RustEvaluator(mockConductor as any);

evaluator.evaluateChunk(`
      fn main() {
        let arr: Vec<i32> = vec![1, 2, 3, 4, 5];
        println!("{:?}", arr);
        println!("{}", arr[2]);
      }
`);
console.log(mockConductor.outputs);
