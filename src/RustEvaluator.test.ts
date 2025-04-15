import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { RustEvaluator } from "./RustEvaluator";

class MockConductor {
  outputs: string[] = [];

  sendOutput(message: string): void {
    this.outputs.push(message);
  }
}

describe("RustEvaluator", () => {
  let evaluator: RustEvaluator;
  let mockConductor: MockConductor;

  beforeEach(() => {
    mockConductor = new MockConductor();
    evaluator = new RustEvaluator(mockConductor as any);
  });

  // EXPRESSIONS
  it("should evaluate unary expressions", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        println!("{}", !true);
        println!("{}", -5);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "false");
    assert.strictEqual(mockConductor.outputs[1], "-5");
  });

  it("should evaluate binary expressions", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        println!("{}", 5 + 3);
        println!("{}", 10 - 4);
        println!("{}", 3 * 6);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "8");
    assert.strictEqual(mockConductor.outputs[1], "6");
    assert.strictEqual(mockConductor.outputs[2], "18");
  });

  // VARIABLES
  it("should handle variable declarations", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 10;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "10");
  });

  it("should handle variable assignments", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 5;
        x = 20;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "20");
  });

  // CONDITIONALS
  it("should handle if statements", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 10;
        if (x > 5) {
          x = 20;
        }
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "20");
  });

  it("should handle if else statements", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 10;
        if (x == 5) {
          x = 20;
        } else {
          x = 0;
        }
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "0");
  });

  it("should handle else if statements", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 3;
        if (x > 5) {
          x = 20;
        } else if (x > 2) {
          x = 10;
        } else {
          x = 0;
        }
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "10");
  });

  // LITERALS
  it("should handle array literals", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let arr = [1, 2, 3];
        println!("{:?}", arr);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
  });

  it("should handle array access", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let arr = [1, 2, 3];
        println!("{}", arr[1]);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "2");
  });

  it("should handle string literals", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let s = "hello";
        println!("{}", s);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "hello");
  });

  it("should handle boolean literals", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let b = true;
        println!("{}", b);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "true");
  });

  // COMPARISON/BOOLEAN OPERATORS
  it("should handle comparison operators", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        println!("{}", 5 > 3);
        println!("{}", 5 == 5);
        println!("{}", 5 != 3);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "true");
    assert.strictEqual(mockConductor.outputs[1], "true");
    assert.strictEqual(mockConductor.outputs[2], "true");
  });

  it("should handle logical operators", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        println!("{}", true && false);
        println!("{}", true || false);
        println!("{}", !true);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "false");
    assert.strictEqual(mockConductor.outputs[1], "true");
    assert.strictEqual(mockConductor.outputs[2], "false");
  });

  // LOOPS
  it("should handle while loops", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let i = 0;
        while (i < 5) {
          i = i + 1;
        }
        println!("{}", i);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "5");
  });

  it("should handle break statements", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let i = 0;
        while (i < 5) {
          if (i === 3) {
            break;
          }
          i = i + 1;
        }
        println!("{}", i);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "3");
  });

  it("should handle continue statements", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let i = 0;
        while (i < 5) {
          if (i === 3) {
            i = i + 4;
            continue;
          }
          i = i + 1;
        }
        println!("{}", i);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "7");
  });

  it("should handle nested loops", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let i = 0;
        let j = 0;
        let sum = 0;
        while (i < 3) {
          j = 0;
          while (j < 3) {
            sum = sum + 1;
            j = j + 1;
          }
          i = i + 1;
        }
        println!("{}", sum);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "9");
  });

  it("should handle function declarations and calls", async () => {
    await evaluator.evaluateChunk(`
      fn add(a: i32, b: i32) -> i32 {
        return a + b;
      }
      
      fn multiply(x: i32, y: i32) -> i32 {
        return x * y;
      }
      
      fn main() {
        let result = add(3, 4);
        let final_value = multiply(result, 2);
        println!("{}", final_value);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "14");
  });

  it("should handle functions with locals", async () => {
    await evaluator.evaluateChunk(`
      fn add(a: i32, b: i32) -> i32 {
        let x = 5;
        let y = 10;
        let z = x + y;
        return z;
      }
      
      fn main() {
        println!("{}", add(5, 10));
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "15");
  });

  it("should handle recursive function calls", async () => {
    await evaluator.evaluateChunk(`
      fn factorial(n: i32) -> i32 {
        if n <= 1 {
          return 1;
        }
        return n * factorial(n - 1);
      }
      
      fn main() {
        println!("{}", factorial(5));
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "120");
  });

  it("should handle functions with no parameters", async () => {
    await evaluator.evaluateChunk(`
      fn get_value() -> i32 {
        return 42;
      }
      
      fn main() {
        println!("{}", get_value());
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "42");
  });

  it("should handle functions with no explicit return", async () => {
    await evaluator.evaluateChunk(`
      fn add(a: i32, b: i32) -> i32 {
        a + b
      }
      
      fn main() {
        println!("{}", add(5, 10));
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "15");
  });

  it("should handle builtin functions", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        println!("Hello, world!");
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Hello, world!");
  });
});
