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
    let x = 10;
    {
        let x = 20;
        {
            let x = x + 1; // Should be 21 (from inner scope)
            println!("{}", x);
        }
    }
}
`);
console.log(mockConductor.outputs);
