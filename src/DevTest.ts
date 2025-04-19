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
fn double(n: &i32) -> i32 {
    return *n * 2;
}

fn main() {
    let x = 5;
    let y = double(&x);
    println!("{}", y);
    println!("{}", x);
}
`);
console.log(mockConductor.outputs);
