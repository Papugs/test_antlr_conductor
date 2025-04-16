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
        let mut s = vec![1, 2, 3];
        let r = &mut s;
        // Modify through reference
        *r = vec![4, 5, 6];
        println!("{:?}", s);
      }
`);
console.log(mockConductor.outputs);
