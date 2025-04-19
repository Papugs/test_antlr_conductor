import { RustEvaluator } from "./RustEvaluator";

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
        let x: &str = "hello";
        println!("{}", x);
      }
`);
console.log(mockConductor.outputs);
