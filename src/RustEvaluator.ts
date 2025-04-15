import { BasicEvaluator } from "conductor/dist/conductor/runner";
import { IRunnerPlugin } from "conductor/dist/conductor/runner/types";
import {
  CharStream,
  CommonTokenStream,
  AbstractParseTreeVisitor,
} from "antlr4ng";
import { RustLexer } from "./parser/src/RustLexer";
import {
  ExpressionContext,
  ProgContext,
  RustParser,
  StatementContext,
  VarDeclarationContext,
  FunctionDeclarationContext,
  ReturnStatementContext,
  IfStatementContext,
  BlockStatementContext,
  PrimaryContext,
  LiteralContext,
  ArrayLiteralContext,
  WhileLoopContext,
  ExpressionListContext,
  ParameterListContext,
  ParameterContext,
  MacroInvocationContext,
} from "./parser/src/RustParser";
import { RustVisitor } from "./parser/src/RustVisitor";

let DEBUG = false;

// **********************
// Virtual Machine Types and Constants
// **********************

// Tags for values stored in heap
const FALSE_TAG = 0;
const TRUE_TAG = 1;
const NUMBER_TAG = 2;
const NULL_TAG = 3;
const UNASSIGNED_TAG = 4;
const UNDEFINED_TAG = 5;
const BLOCKFRAME_TAG = 6;
const CALLFRAME_TAG = 7;
const CLOSURE_TAG = 8;
const FRAME_TAG = 9;
const ENVIRONMENT_TAG = 10;
const PAIR_TAG = 11;
const BUILTIN_TAG = 12;
const STRING_TAG = 13; // New tag for strings
const ARRAY_TAG = 14; // New tag for arrays

type BuiltinFunction = (...args: unknown[]) => unknown;

// Instructions for VM
interface Instruction {
  tag: string;
  val?: any;
  sym?: string;
  addr?: number;
  arity?: number;
  pos?: [number, number];
  num?: number;
  size?: number;
}

// **********************
// Macro/Builtin Implementation
// **********************

const BUILTINS = {
  println: (...args: unknown[]) => {
    if (args.length === 0) {
      console.log();
      return undefined;
    }

    let format = String(args[0]);

    // Handle formatting placeholders {} in Rust style
    if (args.length > 1) {
      let argIndex = 1;
      format = format.replace(/{}/g, () => {
        if (argIndex < args.length) {
          return String(args[argIndex++]);
        }
        return "{}";
      });
    }

    console.log(format);
    return undefined;
  },
};

// **********************
// Heap Implementation
// **********************

class Heap {
  private heap: DataView;
  private heap_size: number;
  private free: number;
  private word_size = 8;
  private size_offset = 5;
  private node_size = 10;

  // String storage - maps heap addresses to JS strings
  private string_table: Map<number, string> = new Map();

  // Special canonical values
  public False: number;
  public True: number;
  public Null: number;
  public Unassigned: number;
  public Undefined: number;

  constructor(heapsize_words: number) {
    this.heap_size = heapsize_words;
    const data = new ArrayBuffer(heapsize_words * this.word_size);
    this.heap = new DataView(data);
    this.log("Initializing heap with size:", heapsize_words, "words");
    this.initializeFreeList();
    this.allocateLiteralValues();
  }

  private log(...args: any[]): void {
    if (DEBUG) {
      console.log("[HEAP]", ...args);
    }
  }

  private initializeFreeList(): void {
    // Initialize free list similar to JS VM
    this.log("Initializing free list");
    const debug = DEBUG; // Reduce noise
    DEBUG = false;
    let i = 0;
    for (i = 0; i <= this.heap_size - this.node_size; i = i + this.node_size) {
      this.heap_set(i, i + this.node_size);
      this.log(`  Free list: ${i} -> ${i + this.node_size}`);
    }
    this.heap_set(i - this.node_size, -1); // End of free list
    this.log(`  Free list end: ${i - this.node_size} -> -1`);
    this.free = 0;
    DEBUG = debug;
    this.log("Free list initialized, free pointer at:", this.free);
  }

  private allocateLiteralValues(): void {
    this.log("Allocating canonical literal values");
    this.False = this.heap_allocate(FALSE_TAG, 1);
    this.log(`  Allocated False at address: ${this.False}`);
    this.True = this.heap_allocate(TRUE_TAG, 1);
    this.log(`  Allocated True at address: ${this.True}`);
    this.Null = this.heap_allocate(NULL_TAG, 1);
    this.log(`  Allocated Null at address: ${this.Null}`);
    this.Unassigned = this.heap_allocate(UNASSIGNED_TAG, 1);
    this.log(`  Allocated Unassigned at address: ${this.Unassigned}`);
    this.Undefined = this.heap_allocate(UNDEFINED_TAG, 1);
    this.log(`  Allocated Undefined at address: ${this.Undefined}`);
  }

  // Core heap operations
  public heap_allocate(tag: number, size: number): number {
    this.log(`Allocating node with tag: ${tag}, size: ${size}`);
    if (size > this.node_size) {
      const error = `limitation: nodes cannot be larger than ${this.node_size} words`;
      this.log(`ERROR: ${error}`);
      throw new Error(error);
    }
    if (this.free === -1) {
      // Later we'll implement mark-sweep here
      const error = "heap memory exhausted";
      this.log(`ERROR: ${error}`);
      throw new Error(error);
    }
    const address = this.free;
    this.free = this.heap_get(this.free);
    this.log(`  Allocated at address: ${address}, new free: ${this.free}`);
    this.heap.setInt8(address * this.word_size, tag);
    this.heap.setUint16(address * this.word_size + this.size_offset, size);
    this.log(`  Set tag: ${tag}, size: ${size}`);
    return address;
  }

  // Basic heap operations
  public heap_get(address: number): number {
    const value = this.heap.getFloat64(address * this.word_size);
    this.log(`Getting value at address ${address}: ${value}`);
    return value;
  }

  public heap_set(address: number, x: number): void {
    this.log(`Setting address ${address} to value: ${x}`);
    this.heap.setFloat64(address * this.word_size, x);
  }

  public heap_get_child(address: number, child_index: number): number {
    const child = this.heap_get(address + 1 + child_index);
    this.log(`Getting child ${child_index} of address ${address}: ${child}`);
    return child;
  }

  public heap_set_child(
    address: number,
    child_index: number,
    value: number
  ): void {
    this.log(`Setting child ${child_index} of address ${address} to: ${value}`);
    this.heap_set(address + 1 + child_index, value);
  }

  public heap_get_tag(address: number): number {
    const tag = this.heap.getInt8(address * this.word_size);
    this.log(`Getting tag of address ${address}: ${tag}`);
    return tag;
  }

  public heap_get_size(address: number): number {
    const size = this.heap.getUint16(
      address * this.word_size + this.size_offset
    );
    this.log(`Getting size of address ${address}: ${size}`);
    return size;
  }

  public heap_get_number_of_children(address: number): number {
    const tag = this.heap_get_tag(address);
    const children =
      tag === NUMBER_TAG || tag === STRING_TAG || tag === ARRAY_TAG
        ? 0
        : this.heap_get_size(address) - 1;
    this.log(`Getting number of children of address ${address}: ${children}`);
    return children;
  }

  // Low-level byte management
  public heap_set_byte_at_offset(
    address: number,
    offset: number,
    value: number
  ): void {
    this.log(
      `Setting byte at address ${address}, offset ${offset} to: ${value}`
    );
    this.heap.setUint8(address * this.word_size + offset, value);
  }

  public heap_get_byte_at_offset(address: number, offset: number): number {
    const value = this.heap.getUint8(address * this.word_size + offset);
    this.log(`Getting byte at address ${address}, offset ${offset}: ${value}`);
    return value;
  }

  public heap_set_2_bytes_at_offset(
    address: number,
    offset: number,
    value: number
  ): void {
    this.log(
      `Setting 2 bytes at address ${address}, offset ${offset} to: ${value}`
    );
    this.heap.setUint16(address * this.word_size + offset, value);
  }

  public heap_get_2_bytes_at_offset(address: number, offset: number): number {
    const value = this.heap.getUint16(address * this.word_size + offset);
    this.log(
      `Getting 2 bytes at address ${address}, offset ${offset}: ${value}`
    );
    return value;
  }

  // Type checking
  public is_Number(address: number): boolean {
    const result = this.heap_get_tag(address) === NUMBER_TAG;
    this.log(`Checking if address ${address} is Number: ${result}`);
    return result;
  }

  public is_String(address: number): boolean {
    const result = this.heap_get_tag(address) === STRING_TAG;
    this.log(`Checking if address ${address} is String: ${result}`);
    return result;
  }

  public is_Array(address: number): boolean {
    const result = this.heap_get_tag(address) === ARRAY_TAG;
    this.log(`Checking if address ${address} is Array: ${result}`);
    return result;
  }

  public is_Boolean(address: number): boolean {
    const result = this.is_True(address) || this.is_False(address);
    this.log(`Checking if address ${address} is Boolean: ${result}`);
    return result;
  }

  public is_True(address: number): boolean {
    const result = this.heap_get_tag(address) === TRUE_TAG;
    this.log(`Checking if address ${address} is True: ${result}`);
    return result;
  }

  public is_False(address: number): boolean {
    const result = this.heap_get_tag(address) === FALSE_TAG;
    this.log(`Checking if address ${address} is False: ${result}`);
    return result;
  }

  public is_Null(address: number): boolean {
    const result = this.heap_get_tag(address) === NULL_TAG;
    this.log(`Checking if address ${address} is Null: ${result}`);
    return result;
  }

  public is_Undefined(address: number): boolean {
    const result = this.heap_get_tag(address) === UNDEFINED_TAG;
    this.log(`Checking if address ${address} is Undefined: ${result}`);
    return result;
  }

  public is_Unassigned(address: number): boolean {
    const result = this.heap_get_tag(address) === UNASSIGNED_TAG;
    this.log(`Checking if address ${address} is Unassigned: ${result}`);
    return result;
  }

  // Environment frames and closures
  public heap_allocate_Frame(number_of_values: number): number {
    this.log(`Allocating Frame with ${number_of_values} values`);
    const address = this.heap_allocate(FRAME_TAG, number_of_values + 1);
    this.log(`  Frame allocated at address: ${address}`);
    return address;
  }

  public heap_allocate_Environment(number_of_frames: number): number {
    this.log(`Allocating Environment with ${number_of_frames} frames`);
    const address = this.heap_allocate(ENVIRONMENT_TAG, number_of_frames + 1);
    this.log(`  Environment allocated at address: ${address}`);
    return address;
  }

  public heap_Environment_extend(
    frame_address: number,
    env_address: number
  ): number {
    this.log(
      `Extending Environment ${env_address} with frame ${frame_address}`
    );
    const old_size = this.heap_get_size(env_address);
    const new_env_address = this.heap_allocate_Environment(old_size);
    this.log(`  New environment allocated at: ${new_env_address}`);
    let i;
    for (i = 0; i < old_size - 1; i++) {
      const child = this.heap_get_child(env_address, i);
      this.log(`  Copying frame ${i} from old env: ${child}`);
      this.heap_set_child(new_env_address, i, child);
    }
    this.log(`  Adding new frame at position ${i}: ${frame_address}`);
    this.heap_set_child(new_env_address, i, frame_address);
    return new_env_address;
  }

  public heap_get_Environment_value(
    env_address: number,
    position: [number, number]
  ): number {
    const [frame_index, value_index] = position;
    this.log(
      `Getting value from Environment ${env_address} at position [${frame_index}, ${value_index}]`
    );
    const frame_address = this.heap_get_child(env_address, frame_index);
    this.log(`  Frame address: ${frame_address}`);
    const value = this.heap_get_child(frame_address, value_index);
    this.log(`  Value: ${value}`);
    return value;
  }

  public heap_set_Environment_value(
    env_address: number,
    position: [number, number],
    value: number
  ): void {
    const [frame_index, value_index] = position;
    this.log(
      `Setting value in Environment ${env_address} at position [${frame_index}, ${value_index}] to ${value}`
    );
    const frame_address = this.heap_get_child(env_address, frame_index);
    this.log(`  Frame address: ${frame_address}`);
    this.heap_set_child(frame_address, value_index, value);
  }

  public heap_allocate_Closure(arity: number, pc: number, env: number): number {
    this.log(`Allocating Closure with arity: ${arity}, pc: ${pc}, env: ${env}`);
    const address = this.heap_allocate(CLOSURE_TAG, 2);
    this.log(`  Closure allocated at address: ${address}`);
    this.heap_set_byte_at_offset(address, 1, arity);
    this.heap_set_2_bytes_at_offset(address, 2, pc);
    this.heap_set_child(address, 0, env);
    return address;
  }

  public is_Closure(address: number): boolean {
    const result = this.heap_get_tag(address) === CLOSURE_TAG;
    this.log(`Checking if address ${address} is Closure: ${result}`);
    return result;
  }

  public heap_get_Closure_arity(address: number): number {
    const arity = this.heap_get_byte_at_offset(address, 1);
    this.log(`Getting arity of Closure ${address}: ${arity}`);
    return arity;
  }

  public heap_get_Closure_pc(address: number): number {
    const pc = this.heap_get_2_bytes_at_offset(address, 2);
    this.log(`Getting PC of Closure ${address}: ${pc}`);
    return pc;
  }

  public heap_get_Closure_environment(address: number): number {
    const env = this.heap_get_child(address, 0);
    this.log(`Getting environment of Closure ${address}: ${env}`);
    return env;
  }

  public heap_allocate_Blockframe(env: number): number {
    this.log(`Allocating Blockframe with env: ${env}`);
    const address = this.heap_allocate(BLOCKFRAME_TAG, 2);
    this.log(`  Blockframe allocated at address: ${address}`);
    this.heap_set_child(address, 0, env);
    return address;
  }

  public is_Blockframe(address: number): boolean {
    const result = this.heap_get_tag(address) === BLOCKFRAME_TAG;
    this.log(`Checking if address ${address} is Blockframe: ${result}`);
    return result;
  }

  public heap_get_Blockframe_environment(address: number): number {
    const env = this.heap_get_child(address, 0);
    this.log(`Getting environment of Blockframe ${address}: ${env}`);
    return env;
  }

  public heap_allocate_Callframe(env: number, pc: number): number {
    this.log(`Allocating Callframe with env: ${env}, pc: ${pc}`);
    const address = this.heap_allocate(CALLFRAME_TAG, 2);
    this.log(`  Callframe allocated at address: ${address}`);
    this.heap_set_2_bytes_at_offset(address, 2, pc);
    this.heap_set_child(address, 0, env);
    return address;
  }

  public is_Callframe(address: number): boolean {
    const result = this.heap_get_tag(address) === CALLFRAME_TAG;
    this.log(`Checking if address ${address} is Callframe: ${result}`);
    return result;
  }

  public heap_get_Callframe_environment(address: number): number {
    const env = this.heap_get_child(address, 0);
    this.log(`Getting environment of Callframe ${address}: ${env}`);
    return env;
  }

  public heap_get_Callframe_pc(address: number): number {
    const pc = this.heap_get_2_bytes_at_offset(address, 2);
    this.log(`Getting PC of Callframe ${address}: ${pc}`);
    return pc;
  }

  // Value management
  public heap_allocate_Number(n: number): number {
    this.log(`Allocating Number: ${n}`);
    const number_address = this.heap_allocate(NUMBER_TAG, 2);
    this.log(`  Number allocated at address: ${number_address}`);
    this.heap_set(number_address + 1, n);
    return number_address;
  }

  // Builtin management

  public is_Builtin(address: number): boolean {
    const result = this.heap_get_tag(address) === BUILTIN_TAG;
    this.log(`Checking if address ${address} is Builtin: ${result}`);
    return result;
  }

  public heap_allocate_Builtin(id: number): number {
    this.log(`Allocating Builtin: ${id}`);
    const address = this.heap_allocate(BUILTIN_TAG, 1);
    this.log(`  Builtin allocated at address: ${address}`);
    this.heap_set(address + 1, id);
    return address;
  }

  public heap_get_Builtin_id(address: number): number {
    const id = this.heap_get(address + 1);
    this.log(`Getting Builtin ID from address ${address}: ${id}`);
    return id;
  }

  // String management
  public heap_allocate_String(s: string): number {
    this.log(`Allocating String: "${s}"`);
    const string_address = this.heap_allocate(STRING_TAG, 2);
    this.log(`  String allocated at address: ${string_address}`);

    // Store the string in the string table
    this.string_table.set(string_address, s);

    // We'll use the first child slot to store a reference ID
    // This isn't used functionally but helps with debugging
    this.heap_set(string_address + 1, string_address);

    return string_address;
  }

  // Get the string value from an address
  public heap_get_String(address: number): string {
    if (!this.is_String(address)) {
      throw new Error(`Address ${address} is not a string`);
    }

    const str = this.string_table.get(address);
    if (str === undefined) {
      throw new Error(`String not found at address ${address}`);
    }

    return str;
  }

  // Array management
  public heap_allocate_Array(size: number): number {
    this.log(`Allocating Array with size: ${size}`);
    // Size + 1 for length storage
    const array_address = this.heap_allocate(ARRAY_TAG, size + 1);
    this.log(`  Array allocated at address: ${array_address}`);

    // Store array length in first slot
    this.heap_set(array_address + 1, size);

    // Initialize array elements to undefined
    for (let i = 0; i < size; i++) {
      this.heap_set_child(array_address, i + 1, this.Undefined);
    }

    return array_address;
  }

  public heap_get_Array_length(address: number): number {
    if (!this.is_Array(address)) {
      throw new Error(`Address ${address} is not an array`);
    }
    const length = this.heap_get(address + 1);
    this.log(`Getting length of Array ${address}: ${length}`);
    return length;
  }

  public heap_get_Array_element(address: number, index: number): number {
    if (!this.is_Array(address)) {
      throw new Error(`Address ${address} is not an array`);
    }

    const length = this.heap_get_Array_length(address);
    if (index < 0 || index >= length) {
      throw new Error(`Array index out of bounds: ${index}, length: ${length}`);
    }

    const element = this.heap_get_child(address, index + 1);
    this.log(`Getting Array[${index}] of ${address}: ${element}`);
    return element;
  }

  public heap_set_Array_element(
    address: number,
    index: number,
    value: number
  ): void {
    if (!this.is_Array(address)) {
      throw new Error(`Address ${address} is not an array`);
    }

    const length = this.heap_get_Array_length(address);
    if (index < 0 || index >= length) {
      throw new Error(`Array index out of bounds: ${index}, length: ${length}`);
    }

    this.log(`Setting Array[${index}] of ${address} to: ${value}`);
    this.heap_set_child(address, index + 1, value);
  }

  // Conversions between JS values and heap addresses
  public address_to_JS_value(address: number): any {
    this.log(`Converting address ${address} to JS value`);
    let result: any;

    if (this.is_Boolean(address)) {
      result = this.is_True(address) ? true : false;
    } else if (this.is_Number(address)) {
      result = this.heap_get(address + 1);
    } else if (this.is_String(address)) {
      result = this.heap_get_String(address);
    } else if (this.is_Array(address)) {
      const length = this.heap_get_Array_length(address);
      result = [];
      for (let i = 0; i < length; i++) {
        result.push(
          this.address_to_JS_value(this.heap_get_Array_element(address, i))
        );
      }
    } else if (this.is_Undefined(address)) {
      result = undefined;
    } else if (this.is_Unassigned(address)) {
      result = "<unassigned>";
    } else if (this.is_Null(address)) {
      result = null;
    } else if (this.is_Closure(address)) {
      result = "<closure>";
    } else {
      result = `unknown tag: ${this.heap_get_tag(address)}`;
    }

    this.log(`  Converted to: ${result}`);
    return result;
  }

  public JS_value_to_address(value: any): number {
    this.log(`Converting JS value to address: ${value}`);
    let address: number;

    if (typeof value === "boolean") {
      address = value ? this.True : this.False;
      this.log(`  Boolean ${value} -> address: ${address}`);
    } else if (typeof value === "number") {
      address = this.heap_allocate_Number(value);
      this.log(`  Number ${value} -> address: ${address}`);
    } else if (typeof value === "string") {
      address = this.heap_allocate_String(value);
      this.log(`  String "${value}" -> address: ${address}`);
    } else if (value === undefined) {
      address = this.Undefined;
      this.log(`  undefined -> address: ${address}`);
    } else if (value === null) {
      address = this.Null;
      this.log(`  null -> address: ${address}`);
    } else {
      const error = `Cannot convert JS value to address: ${value}`;
      this.log(`ERROR: ${error}`);
      throw new Error(error);
    }

    return address;
  }

  // Dump heap state for debugging
  public dumpHeapState(): void {
    this.log("=== HEAP STATE DUMP ===");
    this.log(`Heap size: ${this.heap_size} words`);
    this.log(`Free pointer: ${this.free}`);
    this.log(`Canonical values:`);
    this.log(`  True: ${this.True}`);
    this.log(`  False: ${this.False}`);
    this.log(`  Null: ${this.Null}`);
    this.log(`  Undefined: ${this.Undefined}`);
    this.log(`  Unassigned: ${this.Unassigned}`);
    this.log(`String table size: ${this.string_table.size}`);
    this.log("======================");
  }
}

// **********************
// Virtual Machine
// **********************

class RustVM {
  private heap: Heap;
  private OS: number[]; // Operand Stack - values are heap addresses
  private PC: number; // Program Counter
  private E: number; // Environment pointer
  private RTS: number[]; // Return stack - contains frame addresses
  private instructions: Instruction[];
  private builtins: Map<string, { id: number, func: BuiltinFunction }>;

  constructor(heapsize: number, debug: boolean = false) {
    this.heap = new Heap(heapsize);
    this.OS = [];
    this.RTS = [];
    this.PC = 0;
    this.instructions = [];
    this.builtins = new Map();

    this.log("Initializing RustVM");
    
    // Initialize the environment with an empty frame
    const emptyFrame = this.heap.heap_allocate_Frame(0);
    this.E = this.heap.heap_allocate_Environment(0);
    this.E = this.heap.heap_Environment_extend(emptyFrame, this.E);
    this.log(`Initialized environment: E=${this.E}`);

    // Register builtin functions
    this.registerBuiltins();
  }

  private log(message: string): void {
    if (DEBUG) {
      console.log(`[RustVM] ${message}`);
    }
  }

  // Register all builtin functions
  private registerBuiltins(): void {
    this.log("Registering builtin functions");
    // Create a frame for builtins
    const builtinFrame = this.heap.heap_allocate_Frame(Object.keys(BUILTINS).length);
    this.log(`Created builtin frame at address: ${builtinFrame}`);
    
    // Register each builtin function with an ID
    let id = 0;
    for (const [name, func] of Object.entries(BUILTINS)) {
      // Store the function with its ID
      this.builtins.set(name, { id, func: func as BuiltinFunction });
      
      // Allocate the builtin on the heap
      const builtinAddress = this.heap.heap_allocate_Builtin(id);
      
      // Store the builtin in the frame
      this.heap.heap_set_child(builtinFrame, id, builtinAddress);
      this.log(`Registered builtin '${name}' with ID ${id} at address ${builtinAddress}`);
      
      id++;
    }
    
    // Extend the environment with the builtin frame
    this.E = this.heap.heap_Environment_extend(builtinFrame, this.E);
    this.log(`Extended environment with builtins: E=${this.E}`);
  }

  // Execute a specific builtin function by ID
  public executeBuiltin(id: number, args: unknown[]): unknown {
    this.log(`Executing builtin with ID ${id}, args: ${JSON.stringify(args)}`);
    // Find the builtin function by ID
    for (const [name, builtin] of this.builtins.entries()) {
      if (builtin.id === id) {
        const result = builtin.func(...args);
        this.log(`Builtin '${name}' executed, result: ${result}`);
        return result;
      }
    }
    throw new Error(`Unknown builtin function with ID: ${id}`);
  }

  // Initialize the VM with a program
  public loadProgram(instructions: Instruction[]): void {
    this.instructions = instructions;
    this.PC = 0;
    this.log(`Loaded program with ${instructions.length} instructions`);
  }

  // Stack operations
  private push(value: number): void {
    this.OS.push(value);
    this.log(`Push: ${value}, stack size: ${this.OS.length}`);
  }

  private pop(): number {
    if (this.OS.length === 0) {
      throw new Error("Stack underflow");
    }
    const value = this.OS.pop()!;
    this.log(`Pop: ${value}, stack size: ${this.OS.length}`);
    return value;
  }

  private peek(offset: number = 0): number {
    if (this.OS.length <= offset) {
      throw new Error("Stack underflow in peek");
    }
    const value = this.OS[this.OS.length - 1 - offset];
    this.log(`Peek at offset ${offset}: ${value}`);
    return value;
  }

  // VM execution
  public run(): any {
    this.log("Starting VM execution");
    while (
      this.PC < this.instructions.length &&
      this.instructions[this.PC].tag !== "DONE"
    ) {
      const instr = this.instructions[this.PC++];
      this.log(`Executing instruction at PC=${this.PC-1}: ${instr.tag}`);
      this.executeInstruction(instr);
    }

    // Return the final value on the stack
    const finalValue = this.heap.address_to_JS_value(this.peek());
    this.log(`Execution completed. Final value: ${finalValue}`);
    return finalValue;
  }

  private executeInstruction(instr: Instruction): void {
    switch (instr.tag) {
      case "LDC": // Load constant
        this.log(`LDC: Loading constant ${instr.val}`);
        this.push(this.heap.JS_value_to_address(instr.val));
        break;

      case "LD": // Load variable
        this.log(`LD: Loading variable at position ${instr.pos}, symbol: ${instr.sym}`);
        const val = this.heap.heap_get_Environment_value(this.E, instr.pos!);
        if (this.heap.is_Unassigned(val)) {
          throw new Error(`Variable ${instr.sym} is unassigned`);
        }
        this.push(val);
        break;

      case "ASSIGN": // Assign to variable
        this.log(`ASSIGN: Assigning to variable at position ${instr.pos}`);
        this.heap.heap_set_Environment_value(this.E, instr.pos!, this.peek());
        break;

      case "POP": // Pop top value from stack
        this.log("POP: Removing top value from stack");
        this.log(`POP: Stack before pop: ${JSON.stringify(this.OS)}`);
        this.pop();
        break;

      case "UNOP": // Unary operation
        this.log(`UNOP: Applying unary operator ${instr.sym}`);
        const operand = this.pop();
        const jsVal = this.heap.address_to_JS_value(operand);
        let result;

        switch (instr.sym) {
          case "-":
            result = -jsVal;
            break;
          case "!":
            result = !jsVal;
            break;
          default:
            throw new Error(`Unknown unary operator: ${instr.sym}`);
        }

        this.log(`UNOP: ${instr.sym}${jsVal} = ${result}`);
        this.push(this.heap.JS_value_to_address(result));
        break;

      case "BINOP": // Binary operation
        this.log(`BINOP: Applying binary operator ${instr.sym}`);
        const right = this.pop();
        const left = this.pop();
        const leftVal = this.heap.address_to_JS_value(left);
        const rightVal = this.heap.address_to_JS_value(right);
        let binopResult;

        switch (instr.sym) {
          case "+":
            // Special handling for string concatenation
            if (typeof leftVal === "string" || typeof rightVal === "string") {
              binopResult = String(leftVal) + String(rightVal);
            } else {
              binopResult = leftVal + rightVal;
            }
            break;
          case "-":
            binopResult = leftVal - rightVal;
            break;
          case "*":
            binopResult = leftVal * rightVal;
            break;
          case "/":
            if (rightVal === 0) {
              throw new Error("Division by zero");
            }
            binopResult = leftVal / rightVal;
            break;
          case "%":
            binopResult = leftVal % rightVal;
            break;
          case "<":
            binopResult = leftVal < rightVal;
            break;
          case ">":
            binopResult = leftVal > rightVal;
            break;
          case "<=":
            binopResult = leftVal <= rightVal;
            break;
          case ">=":
            binopResult = leftVal >= rightVal;
            break;
          case "==":
            binopResult = leftVal === rightVal;
            break;
          case "!=":
            binopResult = leftVal !== rightVal;
            break;
          case "&&":
            binopResult = leftVal && rightVal;
            break;
          case "||":
            binopResult = leftVal || rightVal;
            break;
          default:
            throw new Error(`Unknown binary operator: ${instr.sym}`);
        }

        this.log(`BINOP: ${leftVal} ${instr.sym} ${rightVal} = ${binopResult}`);
        this.push(this.heap.JS_value_to_address(binopResult));
        break;

      case "JOF": // Jump on false
        this.log(`JOF: Jump to ${instr.addr} if condition is false`);
        const condition = this.pop();
        if (this.heap.is_False(condition)) {
          this.log(`JOF: Condition is false, jumping to ${instr.addr}`);
          this.PC = instr.addr!;
        } else {
          this.log(`JOF: Condition is true, continuing`);
        }
        break;

      case "GOTO": // Unconditional jump
        this.log(`GOTO: Jumping to ${instr.addr}`);
        this.PC = instr.addr!;
        break;

      case "ENTER_SCOPE": // Create a new scope
        this.log(`ENTER_SCOPE: Creating new scope with ${instr.num} variables`);
        this.RTS.push(this.heap.heap_allocate_Blockframe(this.E));
        const frame_address = this.heap.heap_allocate_Frame(instr.num!);
        this.E = this.heap.heap_Environment_extend(frame_address, this.E);
        this.log(`ENTER_SCOPE: New environment E=${this.E}, frame=${frame_address}`);

        // Initialize variables as unassigned
        for (let i = 0; i < instr.num!; i++) {
          this.heap.heap_set_child(frame_address, i, this.heap.Unassigned);
        }
        break;

      case "EXIT_SCOPE": // Exit current scope
        this.log("EXIT_SCOPE: Exiting current scope");
        const oldE = this.E;
        this.E = this.heap.heap_get_Blockframe_environment(this.RTS.pop()!);
        this.log(`EXIT_SCOPE: Restored environment from E=${oldE} to E=${this.E}`);
        break;

      case "LDF": // Load function (create closure)
        this.log(`LDF: Creating closure with arity ${instr.arity}, address ${instr.addr}`);
        const closure_address = this.heap.heap_allocate_Closure(
          instr.arity!,
          instr.addr!,
          this.E
        );
        this.log(`LDF: Created closure at address ${closure_address}`);
        this.push(closure_address);
        break;

      case "CALL": // Call function
        const arity = instr.arity!;
        const fun = this.peek(arity);
        this.log(`CALL: Calling function at address ${fun} with arity ${arity}`);

        if (this.heap.is_Builtin(fun)) {
          this.log(`CALL: Function is a builtin`);
          // Collect arguments from stack
          const args = [];
          for (let i = arity - 1; i >= 0; i--) {
            args.unshift(this.heap.address_to_JS_value(this.pop()) as never);
          }
          this.pop(); // Remove function reference
          const builtin_id = this.heap.heap_get_Builtin_id(fun);
          this.log(`CALL: Executing builtin with ID ${builtin_id}, args: ${JSON.stringify(args)}`);

          // Call the builtin and push result
          const result = this.executeBuiltin(builtin_id, args);
          this.push(this.heap.JS_value_to_address(result));
          break;
          return
        }

        const new_PC = this.heap.heap_get_Closure_pc(fun);
        const new_frame = this.heap.heap_allocate_Frame(arity);
        this.log(`CALL: Created new frame at ${new_frame} for function call`);

        // Pop arguments in reverse order (last argument first)
        for (let i = arity - 1; i >= 0; i--) {
          const arg = this.pop();
          this.log(`CALL: Setting argument ${i} to ${arg}`);
          this.heap.heap_set_child(new_frame, i, arg);
        }

        this.pop(); // pop function
        this.log(`CALL: Popped function reference`);

        // Save current state for return
        const callframe = this.heap.heap_allocate_Callframe(this.E, this.PC);
        this.RTS.push(callframe);
        this.log(`CALL: Saved return state at ${callframe}, PC=${this.PC}, E=${this.E}`);

        // Set new environment and program counter
        const oldEnv = this.E;
        this.E = this.heap.heap_Environment_extend(
          new_frame,
          this.heap.heap_get_Closure_environment(fun)
        );
        this.PC = new_PC;
        this.log(`CALL: Set new environment E=${this.E} (was ${oldEnv}) and PC=${this.PC}`);
        break;

      case "TAIL_CALL": // Tail call optimization
        const tailArity = instr.arity!;
        const tailFun = this.peek(tailArity);
        this.log(`TAIL_CALL: Tail calling function at ${tailFun} with arity ${tailArity}`);

        if (!this.heap.is_Closure(tailFun)) {
          throw new Error("Tail calling a non-function");
        }

        const tailPC = this.heap.heap_get_Closure_pc(tailFun);
        const tailFrame = this.heap.heap_allocate_Frame(tailArity);
        this.log(`TAIL_CALL: Created new frame at ${tailFrame}`);

        // Pop arguments in reverse order
        for (let i = tailArity - 1; i >= 0; i--) {
          const arg = this.pop();
          this.log(`TAIL_CALL: Setting argument ${i} to ${arg}`);
          this.heap.heap_set_child(tailFrame, i, arg);
        }

        this.pop(); // pop function
        this.log(`TAIL_CALL: Popped function reference`);

        // Set new environment and program counter without pushing to RTS
        const oldTailEnv = this.E;
        this.E = this.heap.heap_Environment_extend(
          tailFrame,
          this.heap.heap_get_Closure_environment(tailFun)
        );
        this.PC = tailPC;
        this.log(`TAIL_CALL: Set new environment E=${this.E} (was ${oldTailEnv}) and PC=${this.PC}`);
        break;

      case "RESET": // Return from function
        this.log("RESET: Returning from function");
        const top_frame = this.RTS.pop()!;
        if (this.heap.is_Callframe(top_frame)) {
          const oldPC = this.PC;
          const oldE = this.E;
          this.PC = this.heap.heap_get_Callframe_pc(top_frame);
          this.E = this.heap.heap_get_Callframe_environment(top_frame);
          this.log(`RESET: Restored PC=${this.PC} (was ${oldPC}) and E=${this.E} (was ${oldE})`);
        } else {
          this.PC--;
          this.log(`RESET: Not a callframe, decremented PC to ${this.PC}`);
        }
        break;

      case "DONE": // End of program
        this.log("DONE: End of program");
        break;

      case "ARRAY": // Create an array
        this.log(`ARRAY: Creating array of size ${instr.size}`);
        const arraySize = instr.size!;
        const arrayAddress = this.heap.heap_allocate_Array(arraySize);
        this.log(`ARRAY: Allocated array at address ${arrayAddress}`);

        // Pop values from stack in reverse order and add to array
        for (let i = arraySize - 1; i >= 0; i--) {
          const element = this.pop();
          this.log(`ARRAY: Setting element ${i} to ${element}`);
          this.heap.heap_set_Array_element(arrayAddress, i, element);
        }

        // Push array address to stack
        this.push(arrayAddress);
        break;

      case "ARRAY_ACCESS": // Access array element
        this.log("ARRAY_ACCESS: Accessing array element");
        const index = this.pop();
        const array = this.pop();
        this.log(`ARRAY_ACCESS: Array at ${array}, index at ${index}`);

        // Check if array is actually an array
        if (!this.heap.is_Array(array)) {
          throw new Error("Cannot use array access on non-array value");
        }

        // Get the index value
        const indexValue = this.heap.address_to_JS_value(index);
        if (typeof indexValue !== "number" || !Number.isInteger(indexValue)) {
          throw new Error(
            `Array index must be an integer, got ${typeof indexValue}`
          );
        }

        // Access the array element
        try {
          const element = this.heap.heap_get_Array_element(array, indexValue);
          this.log(`ARRAY_ACCESS: Retrieved element ${indexValue}: ${element}`);
          this.push(element);
        } catch (error) {
          throw new Error(`Array index out of bounds: ${indexValue}`);
        }
        break;

      default:
        throw new Error(`Unknown instruction: ${instr.tag}`);
    }
  }
}

// **********************
// Compiler Implementation
// **********************

class RustCompiler {
  private instructions: Instruction[] = [];
  private wc: number = 0; // Write counter
  private env: string[][] = []; // Compile-time environment
  private builtins: Set<string> = new Set(["println"]);

  // Helper for adding instructions
  private emit(instruction: Instruction): void {
    this.instructions[this.wc++] = instruction;
  }

  // Compile a node into instructions
  public compile(node: any): Instruction[] {
    this.instructions = [];
    this.wc = 0;

    // Add builtins to environment
    this.env = [Array.from(this.builtins), []];

    this.compileNode(node);
    this.emit({ tag: "DONE" });
    return this.instructions;
  }

  // Main dispatch method for compiling different node types
  private compileNode(node: any): void {
    if (node instanceof ProgContext) {
      this.compileBlockStatement(node);
    } else if (node instanceof ExpressionContext) {
      this.compileExpression(node);
    } else if (node instanceof VarDeclarationContext) {
      this.compileVarDeclaration(node);
    } else if (node instanceof FunctionDeclarationContext) {
      this.compileFunctionDeclaration(node);
    } else if (node instanceof ReturnStatementContext) {
      this.compileReturnStatement(node);
    } else if (node instanceof IfStatementContext) {
      this.compileIfStatement(node);
    } else if (node instanceof BlockStatementContext) {
      this.compileBlockStatement(node);
    } else if (node instanceof WhileLoopContext) {
      this.compileWhileLoop(node);
    } else if (node instanceof StatementContext) {
      this.compileStatement(node);
    } else {
      throw new Error(
        `Unsupported node type: ${node?.constructor?.name || typeof node}`
      );
    }
  }

  // Compile a statement
  private compileStatement(node: StatementContext): void {
    if (node.varDeclaration()) {
      this.compileNode(node.varDeclaration()!);
    } else if (node.functionDeclaration()) {
      this.compileNode(node.functionDeclaration()!);
    } else if (node.expression()) {
      this.compileNode(node.expression()!);
    } else if (node.returnStatement()) {
      this.compileNode(node.returnStatement()!);
    } else if (node.ifStatement()) {
      this.compileNode(node.ifStatement()!);
    } else if (node.blockStatement()) {
      this.compileNode(node.blockStatement()!);
    } else if (node.whileLoop()) {
      this.compileNode(node.whileLoop()!);
    } else if (node.breakStatement()) {
      // Break not fully implemented yet
      this.emit({ tag: "BREAK" });
    } else if (node.continueStatement()) {
      // Continue not fully implemented yet
      this.emit({ tag: "CONTINUE" });
    }
  }

  // Compile a variable declaration
  private compileVarDeclaration(node: VarDeclarationContext): void {
    const identifier = node.IDENTIFIER()!.getText();

    // Find or add variable to environment
    let pos = this.lookupVariable(identifier);
    if (!pos) {
      // Add to current scope
      this.env[0].push(identifier);
      pos = [0, this.env[0].length - 1];
    }

    if (node.expression()) {
      // Compile the initializer expression
      this.compileNode(node.expression()!);
      // Assign the value to the variable
      this.emit({ tag: "ASSIGN", pos });
    } else {
      // Load undefined and assign it
      this.emit({ tag: "LDC", val: undefined });
      this.emit({ tag: "ASSIGN", pos });
    }
  }

  // Compile a function declaration
  private compileFunctionDeclaration(node: FunctionDeclarationContext): void {
    const functionName = node.IDENTIFIER()!.getText();

    // Create a jump instruction to skip the function body
    const paramCount = node.parameterList()?.parameter().length || 0;
    this.emit({ tag: "LDF", arity: paramCount, addr: this.wc + 2 });
    const jumpInstruction: Instruction = { tag: "GOTO" };
    this.emit(jumpInstruction);

    // Record function start address
    const functionStartAddress = this.wc;

    // Create new environment for function parameters
    const params: string[] = [];
    if (node.parameterList()) {
      for (let i = 0; i < node.parameterList()!.parameter().length; i++) {
        const param = node.parameterList()!.parameter(i);
        params.push(param!.IDENTIFIER().getText());
      }
    }

    // Push new frame with parameters
    this.extendEnvironment(params);

    // Compile function body
    this.compileNode(node.blockStatement()!);
    this.emit({ tag: "RESET" }); // Will return last value like in Rust

    // Set the jump address to skip over function body
    jumpInstruction.addr = this.wc;

    // Pop function environment
    this.env.shift();

    // Store function in environment
    let pos = this.lookupVariable(functionName);
    if (!pos) {
      // Add to current scope
      this.env[0].push(functionName);
      pos = [0, this.env[0].length - 1];
    }

    // Assign function to its name
    this.emit({ tag: "ASSIGN", pos });
  }

  // Compile a return statement
  private compileReturnStatement(node: ReturnStatementContext): void {
    if (node.expression()) {
      // Check if it's a tail call
      if (
        node.expression()! instanceof ExpressionContext &&
        node.expression()!.getChildCount() === 4 &&
        node.expression()!.getChild(1)?.getText() === "("
      ) {
        // This is a function call expression
        // Compile as tail call
        this.compileTailCall(node.expression()! as ExpressionContext);
      } else {
        // Regular return
        this.compileNode(node.expression()!);
        this.emit({ tag: "RESET" });
      }
    } else {
      // Return undefined
      this.emit({ tag: "LDC", val: undefined });
      this.emit({ tag: "RESET" });
    }
  }

  // Compile a tail call (function call in return position)
  private compileTailCall(node: ExpressionContext): void {
    const funcExpr = node.expression(0);
    if (!funcExpr) {
      throw new Error("Function expression missing in call");
    }

    // Compile the function expression
    this.compileNode(funcExpr);

    // Compile arguments
    const args: ExpressionContext[] = [];
    if (node.expressionList()) {
      for (const expr of node.expressionList()!.expression()) {
        this.compileNode(expr);
        args.push(expr);
      }
    }

    // Emit tail call instruction
    this.emit({ tag: "TAIL_CALL", arity: args.length });
  }

  // Compile an if statement
  private compileIfStatement(node: IfStatementContext): void {
    // Compile condition
    this.compileNode(node.expression()!);

    // Jump-on-false instruction
    const jumpOnFalseInstruction: Instruction = { tag: "JOF" };
    this.emit(jumpOnFalseInstruction);

    // Compile true branch
    this.compileNode(node.blockStatement(0));

    if (node.blockStatement().length > 1 || node.ifStatement()) {
      // Has else branch
      const jumpInstruction: Instruction = { tag: "GOTO" };
      this.emit(jumpInstruction);

      // Set address for jump-on-false
      jumpOnFalseInstruction.addr = this.wc; // Account for POP instruction

      if (node.blockStatement().length > 1) {
        // Compile else branch
        this.compileNode(node.blockStatement(1));
      } else if (node.ifStatement()) {
        // Compile else-if branch
        this.compileNode(node.ifStatement()!);
      }

      // Set address for unconditional jump
      jumpInstruction.addr = this.wc;
    } else {
      // No else branch
      jumpOnFalseInstruction.addr = this.wc + 1; // Account for POP instruction
    }
  }

  // Compile a block statement
  private compileBlockStatement(
    node: BlockStatementContext | ProgContext
  ): void {
    // Find local variables in block
    const locals = this.scanForLocals(node);

    // Create scope
    if (locals.length > 0) {
      this.emit({ tag: "ENTER_SCOPE", num: locals.length });

      // Add locals to environment
      this.extendEnvironment(locals);
    }

    // Compile statements in block
    let first = true;
    for (const statement of node.statement()) {
      if (!first) {
        this.emit({ tag: "POP" });
      }
      this.compileNode(statement);
      first = false;
    }

    if (locals.length > 0) {
      // Exit scope
      this.emit({ tag: "EXIT_SCOPE" });

      // Remove locals from environment
      this.env.shift();
    }
  }

  // Compile a while loop
  private compileWhileLoop(node: WhileLoopContext): void {
    // Loop start address
    const loopStartAddress = this.wc;

    // Compile condition
    this.compileNode(node.expression()!);

    // Jump-on-false to exit loop
    const jumpOnFalseInstruction: Instruction = { tag: "JOF" };
    this.emit(jumpOnFalseInstruction);

    // Compile loop body
    this.compileNode(node.blockStatement()!);

    // Jump back to condition
    this.emit({ tag: "GOTO", addr: loopStartAddress });

    // Set exit jump address
    jumpOnFalseInstruction.addr = this.wc;

    // Push undefined as loop result
    this.emit({ tag: "LDC", val: undefined });
  }

  // Compile an array literal
  private compileArrayLiteral(node: ArrayLiteralContext): void {
    // Get all expressions in the array
    const expressions = node.expressionList()
      ? node.expressionList()!.expression()
      : [];

    // Compile each expression in the array (in order)
    for (const expr of expressions) {
      this.compileNode(expr);
    }

    // Create array with compiled expressions
    this.emit({ tag: "ARRAY", size: expressions.length });
  }

  // Compile an expression
  private compileExpression(node: ExpressionContext): void {
    if (node.primary()) {
      // Primary expression (identifier, literal, parenthesized expression, macro invocation)
      this.compilePrimary(node.primary()!);
    } else if (node.getChildCount() === 3) {
      const child0 = node.getChild(0);
      const child1 = node.getChild(1);
      const child2 = node.getChild(2);

      if (
        child0 &&
        child2 &&
        child0.getText() === "(" &&
        child2.getText() === ")"
      ) {
        // Parenthesized expression
        const expr0 = node.expression(0);
        if (expr0) {
          this.compileNode(expr0);
        }
      } else {
        // Binary operation
        const expr0 = node.expression(0);
        const expr1 = node.expression(1);

        if (expr0 && child1 && expr1) {
          const op = child1.getText();

          if (op === "=") {
            // Assignment
            const identifier = expr0.getText();
            const pos = this.lookupVariable(identifier);
            if (!pos) {
              throw new Error(`Variable ${identifier} not declared`);
            }

            // Compile right-hand side
            this.compileNode(expr1);

            // Emit assignment instruction
            this.emit({ tag: "ASSIGN", pos });
          } else {
            // Binary operation
            this.compileNode(expr0);
            this.compileNode(expr1);
            this.emit({ tag: "BINOP", sym: op });
          }
        }
      }
    } else if (node.getChildCount() === 2) {
      // Unary operation or function call with no parameters
      const child0 = node.getChild(0);
      const child1 = node.getChild(1);
      const expr0 = node.expression(0);

      if (child0 && expr0 && child1 && child1.getText() === "()") {
        // Function call with no parameters
        this.compileNode(expr0);
        this.emit({ tag: "CALL", arity: 0 });
      } else if (child0 && expr0) {
        // Unary operation
        const op = child0.getText();
        this.compileNode(expr0);
        this.emit({ tag: "UNOP", sym: op });
      }
    } else if (node.getChildCount() === 4) {
      const child1 = node.getChild(1);

      if (child1 && child1.getText() === "(") {
        // Function call
        const funcExpr = node.expression(0);
        if (funcExpr) {
          // Compile function expression
          this.compileNode(funcExpr);

          // Compile arguments
          const args: ExpressionContext[] = [];
          if (node.expressionList()) {
            for (const expr of node.expressionList()!.expression()) {
              this.compileNode(expr);
              args.push(expr);
            }
          }

          // Emit call instruction
          this.emit({ tag: "CALL", arity: args.length });
        }
      } else if (child1 && child1.getText() === "[") {
        // Array access
        const arrayExpr = node.expression(0); // The array expression
        const indexExpr = node.expression(1); // The index expression

        if (arrayExpr && indexExpr) {
          // Compile array expression
          this.compileNode(arrayExpr);

          // Compile index expression
          this.compileNode(indexExpr);

          // Emit array access instruction
          this.emit({ tag: "ARRAY_ACCESS" });
        }
      } else if (child1 && child1.getText() === ".") {
        // Property access (not fully implemented)
        throw new Error("Property access not implemented yet");
      }
    }
  }

  // Compile a primary expression
  private compilePrimary(node: PrimaryContext): void {
    if (node.macroInvocation()) {
      // Macro invocation
      this.compileMacroInvocation(node.macroInvocation()!);
    } else if (node.IDENTIFIER()) {
      // Variable reference
      const identifier = node.IDENTIFIER()!.getText();
      const pos = this.lookupVariable(identifier);
      if (!pos) {
        throw new Error(`Variable ${identifier} not declared`);
      }

      this.emit({ tag: "LD", sym: identifier, pos });
    } else if (node.literal()) {
      // Literal
      this.compileLiteral(node.literal()!);
    } else if (node.expression()) {
      // Parenthesized expression
      this.compileNode(node.expression()!);
    } else if (node.arrayLiteral()) {
      // Array literal
      this.compileArrayLiteral(node.arrayLiteral()!);
    }
  }

  // Compile a macro invocation
  private compileMacroInvocation(node: MacroInvocationContext): void {
    const macroName = node.BUILTIN()!.getText();
    const args = node.macroArguments()!.expression();

    const pos = this.lookupVariable(macroName);
    if (!pos) {
      throw new Error(`Variable ${macroName} not declared`);
    }

    this.emit({ tag: "LD", sym: macroName, pos });

    // Push all arguments to the operand stack
    for (const arg of args) {
      this.compileNode(arg);
    }

    // Emit the call instruction with the macro name and arity
    this.emit({ tag: "CALL", arity: args.length });
  }

  // Compile a literal value
  private compileLiteral(node: LiteralContext): void {
    if (node.INT()) {
      this.emit({ tag: "LDC", val: parseInt(node.INT()!.getText()) });
    } else if (node.FLOAT()) {
      this.emit({ tag: "LDC", val: parseFloat(node.FLOAT()!.getText()) });
    } else if (node.STRING()) {
      const text = node.STRING()!.getText();
      this.emit({ tag: "LDC", val: text.substring(1, text.length - 1) }); // Remove quotes
    } else if (node.BOOL()) {
      this.emit({ tag: "LDC", val: node.BOOL()!.getText() === "true" });
    }
  }

  // Environment operations for compile-time variable lookup
  private extendEnvironment(vars: string[]): void {
    this.env.unshift([...vars]);
  }

  private lookupVariable(name: string): [number, number] | null {
    for (let i = 0; i < this.env.length; i++) {
      const frame = this.env[i];
      let index = frame.indexOf(name);
      if (index !== -1) {
        const frame_num = this.env.length - i - 1;
        index = frame_num === 0 ? index + 8 : index;
        return [frame_num, index];
      }
    }
    return null;
  }

  // Scan for variable declarations in a block
  private scanForLocals(node: BlockStatementContext): string[] {
    const locals: string[] = [];

    for (const statement of node.statement()) {
      if (statement.varDeclaration()) {
        const varDecl = statement.varDeclaration()!;
        const identifier = varDecl.IDENTIFIER()!.getText();
        locals.push(identifier);
      } else if (statement.functionDeclaration()) {
        const funcDecl = statement.functionDeclaration()!;
        const identifier = funcDecl.IDENTIFIER()!.getText();
        locals.push(identifier);
      }
    }

    return locals;
  }
}

// **********************
// Rust Evaluator Visitor Implementation
// **********************

class RustEvaluatorVisitor
  extends AbstractParseTreeVisitor<any>
  implements RustVisitor<any>
{
  private vm: RustVM;
  private compiler: RustCompiler;

  constructor() {
    super();
    this.vm = new RustVM(10000); // Allocate 10000 words of heap space
    this.compiler = new RustCompiler();
  }

  // Visit a parse tree produced by RustParser#prog
  visitProg(ctx: ProgContext): any {
    // Compile to instructions
    const program = this.compiler.compile(ctx);

    if (DEBUG) {
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
      const result = this.visitor.visit(tree);

      // Send the result to the REPL
      this.conductor.sendOutput(`Result: ${JSON.stringify(result)}`);
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
            fn factorial(n: i32) -> i32 {
                if n <= 1 {
                    return 1;
                }
                n * factorial(n - 1);
            }
            
            factorial(5);
        `);
console.log(mockConductor.outputs);
