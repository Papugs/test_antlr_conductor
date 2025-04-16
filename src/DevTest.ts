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
      let s1 = vec![1, 2, 3];
      let s2 = s1;
      // Using s1 after it's moved should error
      println!("{:?}", s1);
    }
`);
console.log(mockConductor.outputs);
