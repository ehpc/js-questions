// const sum = curry((a, b, c, z) => a + b + c + z);
//
// console.log(sum(1)(2)(3)(4)); // 10;
// console.log(sum(1)(2)(3, 4)); // 10;
// console.log(sum(1)(2, 3, 4)); // 10;

function curry(fn) {
  return function curriedWrapper(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...args2) {
      return curriedWrapper.apply(this, args.concat(args2));
    }
  }
}

function myCurry(fn) {
  return function wrapper(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...args2) {
      return wrapper.apply(this, [...args, ...args2]);
    }
  }
}

function twoSum(array, sum) {
  const set = new Set(array);

  array.forEach((number) => {
    const candidate = sum - number;

    if (set.has(candidate)) {
      return [number, candidate];
    }
  });

  return [];
}

console.log(twoSum([3,5,-4,8,11,1,-1,6], 10));