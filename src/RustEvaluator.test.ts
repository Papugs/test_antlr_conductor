import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { RustEvaluator } from "./RustEvaluator";
import { Heap } from "./Heap";
import { RustVM } from "./RustVM";

class MockConductor {
  outputs: string[] = [];

  sendOutput(message: string): void {
    this.outputs.push(message);
  }
}

describe("RustEvaluator", () => {
  let evaluator: RustEvaluator;
  let mockConductor: MockConductor;
  let heap: Heap;
  let vm: RustVM;

  

  beforeEach(() => {
    mockConductor = new MockConductor();
    evaluator = new RustEvaluator(mockConductor as any);
    vm = new RustVM(10000);
    heap = vm['heap'];
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
        let mut x = 5;
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
        let mut x = 10;
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
        let mut x = 10;
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
        let mut x = 3;
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
        let mut i = 0;
        while i < 5 {
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
        let mut i = 0;
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
        let mut i = 0;
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
        let mut i = 0;
        let mut j = 0;
        let mut sum = 0;
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
        a + b;
      }
      
      fn multiply(x: i32, y: i32) -> i32 {
        x * y;
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
        z;
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
        n * factorial(n - 1);
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
        42;
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

  it("should handle shadowing", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 5;
        let x = 10;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "10");
  });
  
  it("should handle deep shadowing", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let y = 5;
        let x = 10;
        let z = 20;
        {
          let y = 10;
          let x = 20;
          let z = 30;
          {
              let y = 15;
              let x = x + 1; // Should be 21 (from inner scope)
              let z = z + 1; // Should be 31 (from inner scope)
              println!("{}", x);
              println!("{}", y);
              println!("{}", z);
          }
        }
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "21");
    assert.strictEqual(mockConductor.outputs[1], "15");
    assert.strictEqual(mockConductor.outputs[2], "31");
  });

  it("should handle mutable variables", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let mut x = 10;
        x = 5;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "5");
  });

  it("should error on mutation of immutable variables", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 10;
        x = 5;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: cannot assign twice to immutable variable `x`");
  });

  it("should handle compound assignment", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let mut x = 10;
        x += 5;
        println!("{}", x);
        x -= 3;
        println!("{}", x);
        x *= 2;
        println!("{}", x);
        x /= 2;
        println!("{}", x);
        x %= 3;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "15");
    assert.strictEqual(mockConductor.outputs[1], "12");
    assert.strictEqual(mockConductor.outputs[2], "24");
    assert.strictEqual(mockConductor.outputs[3], "12");
    assert.strictEqual(mockConductor.outputs[4], "0");
  });

  // OWNERSHIP AND BORROWING
  it("should handle basic ownership transfer", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let s1 = vec![1, 2, 3];
        let s2 = s1;
        // s1 is no longer valid after ownership transfer
        println!("{:?}", s2);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
  });

  it("should error when using a moved value", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let s1 = vec![1, 2, 3];
        let s2 = s1;
        // Using s1 after it's moved should error
        println!("{:?}", s1);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: borrow of moved value: `s1`");
  });

  it("should handle immutable borrowing", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let s = vec![1, 2, 3];
        let r = &s;
        // Both s and r can be used
        println!("{:?}", r);
        println!("{:?}", s);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
    assert.strictEqual(mockConductor.outputs[1], "[1,2,3]");
  });

  it("should handle mutable borrowing", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let mut s = vec![1, 2, 3];
        let r = &mut s;
        // Modify through reference
        *r = vec![4, 5, 6];
        println!("{:?}", s);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "[4,5,6]");
  });

  it("should error when borrowing mutably and immutably at the same time", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let mut s = vec![1, 2, 3];
        let r1 = &s;
        let r2 = &mut s; // Error: cannot borrow mutably and immutably
        println!("{:?}", *r1);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: cannot borrow `s` as mutable because it is also borrowed as immutable");
  });

  it("should error when borrowing mutably more than once", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let mut s = vec![1, 2, 3];
        let r1 = &mut s;
        let r2 = &mut s; // Error: cannot borrow mutably more than once
        println!("{:?}", *r1);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: cannot borrow `s` as mutable more than once at a time");
  });

  it("should handle borrowing in function calls", async () => {
    await evaluator.evaluateChunk(`
      fn double(n: &i32) -> i32 {
          return *n * 2;
      }

      fn main() {
          let x = 5;
          let y = double(&x);
          println!("{}", y);
          println!("{}", x); // x should not be changed
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "10");
    assert.strictEqual(mockConductor.outputs[1], "5");
  });

  it("should handle ownership transfer in function calls", async () => {
    await evaluator.evaluateChunk(`
      fn take_ownership(s: Vec<i32>) {
        println!("{:?}", s);
      }

      fn main() {
        let s = vec![1, 2, 3];
        take_ownership(s);
        // s is no longer valid here
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
  });

  it("should error when using a value after ownership transfer in function", async () => {
    await evaluator.evaluateChunk(`
      fn take_ownership(s: Vec<i32>) {
        println!("{:?}", s);
      }

      fn main() {
        let s = vec![1, 2, 3];
        take_ownership(s);
        // Error: s is no longer valid
        println!("{:?}", s);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: borrow of moved value: `s`"); // should happen at compile time
  });

  // TYPING
  it("should handle basic integer types", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x: i32 = 42;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "42");
  });

  it("should handle basic float types", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x: f64 = 3.14;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "3.14");
  });

  it("should handle basic boolean types", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x: bool = true;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "true");
  });

  it("should handle basic string types", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x: &str = "hello";
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "hello");
  });

  it("should handle type inference", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x = 42;
        let y = 3.14;
        let z = "hello";
        let w = true;
        println!("{} {} {} {}", x, y, z, w);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "42 3.14 hello true");
  });

  it("should error on type mismatch in assignment", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let x: i32 = "hello";
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: mismatched types: expected `i32`, found `&str`");
  });

  it("should error on type mismatch in mutability", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let mut x = 4;
        x = 3.14;
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: mismatched types: expected `i32`, found `f64`");
  });

  it("should handle function return types", async () => {
    await evaluator.evaluateChunk(`
      fn get_number() -> i32 {
        return 42;
      }

      fn main() {
        let x = get_number();
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "42");
  });

  it("should error on incorrect function return type", async () => {
    await evaluator.evaluateChunk(`
      fn get_number() -> i32 {
        return "hello";
      }

      fn main() {
        let x = get_number();
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: mismatched types: expected `i32`, found `&str`");
  });

  it("should error on any incorrect return type", async () => {
    await evaluator.evaluateChunk(`
      fn get_number() -> i32 {
        if true {
          return 42;
        } else {
          return "hello";
        }
        42;
      }

      fn main() {
        let x = get_number();
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: mismatched types: expected `i32`, found `&str`");
  });

  it("should error on incorrect function argument type", async () => {
    await evaluator.evaluateChunk(`
      fn add(a: i32, b: i32) -> i32 {
        a + b;
      }

      fn main() {
        let x = add(1, "hello");
        println!("{}", x);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: mismatched types: expected `i32`, found `&str`");
  });

  it("should handle basic vector types", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let arr: Vec<i32> = vec![1, 2, 3, 4, 5];
        println!("{:?}", arr);
        println!("{}", arr[2]);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3,4,5]");
    assert.strictEqual(mockConductor.outputs[1], "3");
  });

  it("should error on incorrect vector type", async () => {
    await evaluator.evaluateChunk(`
      fn main() {
        let arr: Vec<i32> = vec![1, 2, "hello", 4, 5];
        println!("{}", arr[2]);
      }
    `);
    assert.strictEqual(mockConductor.outputs[0], "Error: mismatched types: expected `i32`, found `&str`");
  });


  // REFERENCE COUNTING TESTS
  it("should increment ref count when pushing to stack", () => {
    const value = 42;
    const address = heap.JS_value_to_address(value);
    const initialRefCount = heap['refCounts'].get(address) || 0;
    
    vm['push'](address);
    
    const newRefCount = heap['refCounts'].get(address);
    assert.strictEqual(newRefCount, initialRefCount + 1);
  });

  it("should decrement ref count when popping from stack", () => {
    const value = 42;
    const address = heap.JS_value_to_address(value);
    vm['push'](address);
    
    const initialRefCount = heap['refCounts'].get(address) || 0;
    vm['pop']();
    
    const newRefCount = heap['refCounts'].get(address);
    assert.strictEqual(newRefCount, initialRefCount - 1);
  });
  

  it("should handle reference counting for arrays", () => {
    const arrayAddress = heap.heap_allocate_Array(3);
    
    // Create elements - these will have refcount = 1
    const element1 = heap.JS_value_to_address(10);
    const element2 = heap.JS_value_to_address(20);
    const element3 = heap.JS_value_to_address(30);
    
    // Verify initial refcounts
    assert.strictEqual(heap['refCounts'].get(element1), 1);
    assert.strictEqual(heap['refCounts'].get(element2), 1);
    assert.strictEqual(heap['refCounts'].get(element3), 1);
    
    // Store in array - refcount should become 2
    heap.heap_set_Array_element(arrayAddress, 0, element1);
    heap.heap_set_Array_element(arrayAddress, 1, element2);
    heap.heap_set_Array_element(arrayAddress, 2, element3);
    
    // Verify refcounts after storing
    assert.strictEqual(heap['refCounts'].get(element1), 2);
    assert.strictEqual(heap['refCounts'].get(element2), 2);
    assert.strictEqual(heap['refCounts'].get(element3), 2);
    
    // Decrement array ref - should decrement elements to 1
    heap.decRef(arrayAddress);
    
    // Verify refcounts after array decrement
    assert.strictEqual(heap['refCounts'].get(element1), 1);
    assert.strictEqual(heap['refCounts'].get(element2), 1);
    assert.strictEqual(heap['refCounts'].get(element3), 1);
    
    // Clean up test elements
    heap.decRef(element1);
    heap.decRef(element2);
    heap.decRef(element3);
    
    // Verify elements were collected
    assert.strictEqual(heap['refCounts'].get(element1), undefined);
    assert.strictEqual(heap['refCounts'].get(element2), undefined);
    assert.strictEqual(heap['refCounts'].get(element3), undefined);
});

  it("should handle reference counting for closures", () => {
    const envAddress = heap.heap_allocate_Environment(1);
    const closureAddress = heap.heap_allocate_Closure(1, 0, envAddress);
    
    assert.strictEqual(heap['refCounts'].get(envAddress), 2);
    assert.strictEqual(heap['refCounts'].get(closureAddress), 1);
    heap.decRef(closureAddress);
    assert.strictEqual(heap['refCounts'].get(envAddress), 1);
  });

  it("should handle reference counting for environments", () => {
    const frame1 = heap.heap_allocate_Frame(2);
    const frame2 = heap.heap_allocate_Frame(2);
    const env1 = heap.heap_allocate_Environment(1);
    const env2 = heap.heap_Environment_extend(frame1, env1);
    const env3 = heap.heap_Environment_extend(frame2, env2);
    
    assert.strictEqual(heap['refCounts'].get(frame1), 1);
    assert.strictEqual(heap['refCounts'].get(frame2), 1);
    assert.strictEqual(heap['refCounts'].get(env1), 1);
    assert.strictEqual(heap['refCounts'].get(env2), 1);
    assert.strictEqual(heap['refCounts'].get(env3), 1);
    
    heap.decRef(env3);
    assert.strictEqual(heap['refCounts'].get(frame2), 0);
    assert.strictEqual(heap['refCounts'].get(env2), 0);
  });

  it("should handle reference counting in VM operations", async () => {
    const evaluator = new RustEvaluator(mockConductor as any);
    await evaluator.evaluateChunk(`
      fn main() {
        let x = vec![1, 2, 3];
        let y = x; // Ownership transfer
        println!("{:?}", y);
      }
    `);
    
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
  });

  it("should handle reference counting with function calls", async () => {
    const evaluator = new RustEvaluator(mockConductor as any);
    await evaluator.evaluateChunk(`
      fn take_ownership(v: Vec<i32>) {
        println!("{:?}", v);
      }
      
      fn main() {
        let v = vec![1, 2, 3];
        take_ownership(v);
      }
    `);
    
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
  });

  it("should handle reference counting with borrowing", async () => {
    const evaluator = new RustEvaluator(mockConductor as any);
    await evaluator.evaluateChunk(`
      fn print_vec(v: &Vec<i32>) {
        println!("{:?}", v);
      }
      
      fn main() {
        let v = vec![1, 2, 3];
        print_vec(&v);
        println!("{:?}", v); // v is still valid
      }
    `);
    
    assert.strictEqual(mockConductor.outputs[0], "[1,2,3]");
    assert.strictEqual(mockConductor.outputs[1], "[1,2,3]");
  });

  it("should clean up references when VM completes", async () => {
    const evaluator = new RustEvaluator(mockConductor as any);
    await evaluator.evaluateChunk(`
      fn create_data() -> Vec<Vec<i32>> {
        vec![vec![1, 2], vec![3, 4], vec![5, 6]]
      }
      
      fn main() {
        let data = create_data();
        println!("{:?}", data);
      }
    `);
    
    assert.strictEqual(mockConductor.outputs[0], "[[1,2],[3,4],[5,6]]");
  });
});


