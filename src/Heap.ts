import { Globals } from "./globals";

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

export class Heap {
  private heap: DataView;
  private heap_size: number;
  private free: number;
  private word_size = 8;
  private size_offset = 5;
  private node_size = 10;

  // String storage - maps heap addresses to JS strings
  private string_table: Map<number, string> = new Map();

  // Reference counting
  private refCounts: Map<number, number>;

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
    this.refCounts = new Map<number, number>();
    this.log("Initializing heap with size:", heapsize_words, "words");
    this.initializeFreeList();
    this.allocateLiteralValues();
  }

  private log(...args: any[]): void {
    if (Globals.DEBUG) {
      console.log("[HEAP]", ...args);
    }
  }

  private initializeFreeList(): void {
    // Initialize free list similar to JS VM
    this.log("Initializing free list");
    const debug = Globals.DEBUG; // Reduce noise
    Globals.DEBUG = false;
    let i = 0;
    for (i = 0; i <= this.heap_size - this.node_size; i = i + this.node_size) {
      this.heap_set(i, i + this.node_size);
      this.log(`  Free list: ${i} -> ${i + this.node_size}`);
    }
    this.heap_set(i - this.node_size, -1); // End of free list
    this.log(`  Free list end: ${i - this.node_size} -> -1`);
    this.free = 0;
    Globals.DEBUG = debug;
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
    this.incRef(value);
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
    this.refCounts.set(address, 1);
    return address;
  }

  public heap_allocate_Environment(number_of_frames: number): number {
    this.log(`Allocating Environment with ${number_of_frames} frames`);
    const address = this.heap_allocate(ENVIRONMENT_TAG, number_of_frames + 1);
    this.log(`  Environment allocated at address: ${address}`);
    this.refCounts.set(address, 1);
    this.incRef(address);
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
    this.incRef(frame_address);
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
    this.refCounts.set(address, 1);
    this.incRef(env);
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
    this.refCounts.set(address, 1);
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
    this.refCounts.set(address, 1);
    this.incRef(env);
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
    this.refCounts.set(address, 1);
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
    this.refCounts.set(array_address, 1);
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
    this.decRef(this.heap_get_Array_element(address, index));
    if (!this.is_Array(address)) {
      throw new Error(`Address ${address} is not an array`);
    }

    const length = this.heap_get_Array_length(address);
    if (index < 0 || index >= length) {
      throw new Error(`Array index out of bounds: ${index}, length: ${length}`);
    }

    this.log(`Setting Array[${index}] of ${address} to: ${value}`);
    this.heap_set_child(address, index + 1, value);
    this.incRef(value);
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
      const error = `cannot convert JS value to address: ${value}`;
      this.log(`ERROR: ${error}`);
      throw new Error(error);
    }
    this.refCounts.set(address, 1);
    return address;
  }

  incRef(address: number): void {
    if (address <= 0) return; 
    
    const count = this.refCounts.get(address) || 0;
    this.refCounts.set(address, count + 1);
    
    if (Globals.DEBUG) {
      console.log(`Incremented ref count for address ${address} to ${count + 1}`);
    }
  }

  decRef(address: number): void {
    if (address <= 0) return; 
    const count = this.refCounts.get(address) || 0;
    if (count <= 0) return;
    this.refCounts.set(address, count - 1);
    if (Globals.DEBUG) {
      console.log(`Decremented ref count for address ${address} to ${count - 1}`);
    }
    if (count - 1 === 0) {
      this.collectObject(address);
    }
  }

  private collectObject(address: number): void {
    if (Globals.DEBUG) {
      console.log(`[Heap] Collecting object at address ${address}`);
    }
    
    const object = this.heap[address];
    if (!object) return;
    
    if (object.tag === "Array") {
      for (let i = 0; i < object.elements.length; i++) {
        this.decRef(object.elements[i]);
      }
    } else if (object.tag === "Closure") {
      this.decRef(object.environment);
    } else if (object.tag === "Environment") {
      this.decRef(object.frame);
      this.decRef(object.parent);
    } else if (object.tag === "Frame") {
      for (let i = 0; i < object.size; i++) {
        this.decRef(object.slots[i]);
      }
    } else if (object.tag === "Callframe") {
      this.decRef(object.environment);
    } else if (object.tag === "Blockframe") {
      this.decRef(object.environment);
    }
    this.heap[address] = { tag: "Freed" };
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