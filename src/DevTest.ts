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
        let r1 = &s;
        let r2 = &mut s; // Error: cannot borrow mutably and immutably
        println!("{:?}", r1);
      }
`);
console.log(mockConductor.outputs);
