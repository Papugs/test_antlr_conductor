import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { RustEvaluator } from './RustEvaluator';

class MockConductor {
    outputs: string[] = [];
    
    sendOutput(message: string): void {
        this.outputs.push(message);
    }
}

describe('RustEvaluator', () => {
    let evaluator: RustEvaluator;
    let mockConductor: MockConductor;
    
    beforeEach(() => {
        mockConductor = new MockConductor();
        evaluator = new RustEvaluator(mockConductor as any);
    });

    // EXPRESSIONS
    it('should evaluate unary expressions', async () => {
        await evaluator.evaluateChunk('!true;');
        assert.strictEqual(mockConductor.outputs[0], 'Result: false');

        await evaluator.evaluateChunk('-5;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: -5');
    })
    
    it('should evaluate binary expressions', async () => {
        await evaluator.evaluateChunk('5 + 3;');
        assert.strictEqual(mockConductor.outputs[0], 'Result: 8');

        await evaluator.evaluateChunk('10 - 4;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: 6');

        await evaluator.evaluateChunk('3 * 6;');
        assert.strictEqual(mockConductor.outputs[2], 'Result: 18');
    });
    
    // VARIABLES
    it('should handle variable declarations', async () => {
        await evaluator.evaluateChunk('let x = 10;');
        await evaluator.evaluateChunk('x;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: 10');
    });
    
    it('should handle variable assignments', async () => {
        await evaluator.evaluateChunk('let x = 5;');
        await evaluator.evaluateChunk('x = 20;');
        await evaluator.evaluateChunk('x;');
        assert.strictEqual(mockConductor.outputs[2], 'Result: 20');
    });

    // CONDITIONALS
    it('should handle if statements', async () => {
        await evaluator.evaluateChunk(`
            let x = 10;
            if (x > 5) {
                x = 20;
            }
            x;
        `);
        assert.strictEqual(mockConductor.outputs[0], 'Result: 20');
    });
    
    it('should handle if else statements', async () => {
        await evaluator.evaluateChunk(`
            let x = 10;
            if (x > 5) {
                x = 20;
            } else {
                x = 0;
            }
            x;
        `);
        assert.strictEqual(mockConductor.outputs[0], 'Result: 20');
    });
    
    it('should handle else if statements', async () => {
        await evaluator.evaluateChunk(`
            let x = 3;
            if (x > 5) {
                x = 20;
            } else if (x > 2) {
                x = 10;
            } else {
                x = 0;
            }
            x;
        `);
        assert.strictEqual(mockConductor.outputs[0], 'Result: 10');
    });
    
    // LITERALS
    it('should handle array literals', async () => {
        await evaluator.evaluateChunk('let arr = [1, 2, 3];');
        await evaluator.evaluateChunk('arr;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: [1,2,3]');
    });

    it('should handle array access', async () => {
        await evaluator.evaluateChunk('let arr = [1, 2, 3];');
        await evaluator.evaluateChunk('arr[1];');
        assert.strictEqual(mockConductor.outputs[1], 'Result: 2');
    });
    
    it('should handle string literals', async () => {
        await evaluator.evaluateChunk('let s = "hello";');
        await evaluator.evaluateChunk('s;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: "hello"');
    });
    
    it('should handle boolean literals', async () => {
        await evaluator.evaluateChunk('let b = true;');
        await evaluator.evaluateChunk('b;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: true');
    });
    
    // COMPARISON/BOOLEAN OPERATORS
    it('should handle comparison operators', async () => {
        await evaluator.evaluateChunk('5 > 3;');
        assert.strictEqual(mockConductor.outputs[0], 'Result: true');
        
        await evaluator.evaluateChunk('5 == 5;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: true');
        
        await evaluator.evaluateChunk('5 != 3;');
        assert.strictEqual(mockConductor.outputs[2], 'Result: true');
    });
    
    it('should handle logical operators', async () => {
        await evaluator.evaluateChunk('true && false;');
        assert.strictEqual(mockConductor.outputs[0], 'Result: false');
        
        await evaluator.evaluateChunk('true || false;');
        assert.strictEqual(mockConductor.outputs[1], 'Result: true');
        
        await evaluator.evaluateChunk('!true;');
        assert.strictEqual(mockConductor.outputs[2], 'Result: false');
    });
    
    // ERRORS
    it('should handle errors gracefully', async () => {
        await evaluator.evaluateChunk('let x = 10 / 0;');
        assert.ok(mockConductor.outputs[0].includes('Error: Division by zero'));
        
        await evaluator.evaluateChunk('undefinedVariable;');
        assert.ok(mockConductor.outputs[1].includes('Error: Variable undefinedVariable not defined'));
    });
});

