import { test, expect, vi } from 'vitest';
import { print, divide, sum } from '../../src/calculator';
import { writeFileSync } from 'node:fs';

vi.mock('node:fs', () => ({
    writeFileSync: vi.fn()
}));

test('sum two positive numbers', () => {
    expect(sum(1, 2)).toEqual(3);
});

test('prints data to console', () => {
    print('smth')
    expect(writeFileSync).toBeCalled();
    expect(writeFileSync).toBeCalledWith('output.txt', 'print: smth');
});

test('can divide two numbers', () => {
    expect(divide(6, 2)).toEqual(3);
});

test('throw an error if divider is 0 (plus infinity)', () => {
    const risky = () => divide(6, 0);
    expect(risky).toThrowError('Zero division is prohibited');
});

test('throw an error if divider is 0 (minus infinity)', () => {
    const risky = () => divide(-6, 0);
    expect(risky).toThrowError('Zero division is prohibited');
});

const examples = [
    { 
        name: 'throw an error if divider is 0 (plus infinity)',
        risky: () => divide(6, 0)
    },
    { 
        name: 'throw an error if divider is 0 (plus infinity)',
        risky: () => divide(-6, 0)
    }
]

for (const example of examples) {
    test(example.name, () => {
        expect(example.risky).toThrowError('Zero division is prohibited');
    });
}
