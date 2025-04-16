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
      fn get_number() -> i32 {
        if true {
          return 42;
        } else {
          return 43;
        }
        42;
      }

      fn main() {
        let x = get_number();
        println!("{}", x);
      }
`);
console.log(mockConductor.outputs);
