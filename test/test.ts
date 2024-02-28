
import { helperFunction } from './more';

function testFunction(input: any): string {
    const helperResult = helperFunction(input);
    return `Test function was called with input: ${input}, helper result: ${helperResult}`;
}