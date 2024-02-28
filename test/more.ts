// more.ts

export function helperFunction(input: any): string {
    const result = thisFunctionIsNotExported(input);
    return `Helper function was called with input: ${result} `
}

function thisFunctionIsNotExported(input: any): string {
    return `This function is not exported and cannot be called from outside the module`;
}
