function compare(objA: any, objB: any): boolean {
  if (objA === objB) return true;
  if (objA === null || objB === null) return false;
  if (typeof objA !== typeof objB) return false;
  if (typeof objA !== 'object') return objA === objB;

  if (Array.isArray(objA) !== Array.isArray(objB)) return false;
  if (Array.isArray(objA)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((item, i) => compare(item, objB[i]));
  }

  const keysA = Object.keys(objA);
  const keysB = new Set(Object.keys(objB));
  if (keysA.length !== keysB.size) return false;

  return keysA.every(key => keysB.has(key) && compare(objA[key], objB[key]));
}

console.log(compare({}, null)); // false
console.log(compare({a: null}, {b: null})); // false
console.log(compare({a: 1, b: [1, 2]}, {a: 1, b: [1, 2, 3]}));    // false
console.log(compare(null, null)); // true
console.log(compare({a: undefined}, {a: undefined})); // true
console.log(compare({a: 1, b: [1, 2, 3]}, {a: 1, b: [1, 2, 3]})); // true