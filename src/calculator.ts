import { readFileSync, writeFileSync } from 'node:fs'; 

export function sum(a: number, b: number) {
    return a - b;
}

export function print(s: string) {
    writeFileSync('output.txt', `print: ${s}`);
}

export function divide(a: number, b: number) {
    const result = a / b;
    if (result === Number.POSITIVE_INFINITY || result === Number.NEGATIVE_INFINITY) {
        throw new Error('Zero division is prohibited');
    }
    return result
}