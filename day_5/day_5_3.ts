function flat(arr: any[], depth: number = 1): any[] {
  if (depth <= 0) {
    return arr;
  }
  return arr.reduce<any[]>((acc, el) => {
    if (Array.isArray(el)) {
      return acc.concat(flat(el, depth - 1));
    }
    acc.push(el);
    return acc;
  }, []);
}

console.log(JSON.stringify(flat([[1, 2], [[1]], 2])));    // [1, 2, [1], 2]
console.log(JSON.stringify(flat([[1, 2], [[1]], 2], 2))); // [1, 2, 1, 2]

function flatNonRecursive(arr: any[], depth: number = 1): any[] {
  const stack: [any, number][] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    stack.push([arr[i], 0]);
  }

  const result: any[] = [];

  while (stack.length > 0) {
    const [item, currentDepth] = stack.pop()!;
    if (Array.isArray(item) && currentDepth < depth) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push([item[i], currentDepth + 1]);
      }
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(JSON.stringify(flatNonRecursive([[1, 2], [[1]], 2])));    // [1, 2, [1], 2]
console.log(JSON.stringify(flatNonRecursive([[1, 2], [[1]], 2], 2))); // [1, 2, 1, 2]