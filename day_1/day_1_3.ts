
function format(template: string, args: Record<string, any>) {
    return template.replace(/\$\{([^}]+)\}/g, (_, expression: string) => {
        const func = Function(
            ...Object.keys(args),
            `return ${expression}`,
        );
        return func(...Object.values(args));
    })
}

let res = format('Hello ${name}! My age is ${age * 2}.', {name: 'Bob', age: 12});
console.assert(res === 'Hello Bob! My age is 24.', `${res} !== Hello Bob! My age is 24.`);
