function curry(fn: Function): Function {
  return function recur(...suppliedArgs) {
    if (suppliedArgs.length >= fn.length) {
      return fn(...suppliedArgs);
    }
    return function (...moreArgs) {
      return recur(...suppliedArgs, ...moreArgs);
    };
  };
}

const sum = curry((a, b, c, z) => a + b + c + z);

console.log(sum(1, 2, 3, 4)); // 10;
console.log(sum(1)(2)(3)(4)); // 10;
console.log(sum(1)(2)(3, 4)); // 10;
console.log(sum(1)(2, 3, 4)); // 10;
