console.log(flat([[1, 2], [[1]], 2]));    // [1, 2, [1], 2]
console.log(flat([[1, 2], [[1]], 2], 2)); // [1, 2, 1, 2]

// function flat(arr, depth = 1) {
//   const result = [];
//   const wrapper = (arr, depth) => {
//     arr.forEach((el) => {
//       if (Array.isArray(el) && depth > 0) {
//         return wrapper(el, depth - 1);
//       }
//
//       result.push(el);
//     });
//   }
//
//   wrapper(arr, depth);
//
//   return result;
// }

function flat(arr, depth = 1) {
  const result = [];

  const stack = [
    [depth, arr[Symbol.iterator]()]
  ];

  while (stack.length) {
    const [depth, iter] = stack.pop();

    for (const el of iter) {
      if (!Array.isArray(el) || depth <= 0) {
        result.push(el);
      } else {
        stack.push([depth, iter]);
        stack.push([depth - 1, el[Symbol.iterator]()]);
        break;
      }
    }
  }

  return result;
}