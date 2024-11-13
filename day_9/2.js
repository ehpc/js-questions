console.log(compare({a: 1, b: [1, 2, 3]}, {a: 1, b: [1, 2, 3]})); // true
console.log(compare({a: 1, b: [1, 2]}, {a: 1, b: [1, 2, 3]}));    // false

function compare(a, b) {
  function isDeepComparable(value) {
    return value?.constructor == null || value?.constructor === Object || Array.isArray(value);
  }

  function sort([aKey], [bKey]) {
    return aKey.localeCompare(bKey);
  }

  if (!isDeepComparable(a) || !isDeepComparable(b)) {
    return a === b;
  }

  if (a.constructor !== b.constructor) {
    return false;
  }

  if (Array.isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i + 1) {
      if (!compare(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  const aEntries = Object.entries(a);
  const bEntries = Object.entries(b);

  if (aEntries.length !== bEntries.length) {
    return false;
  }

  aEntries.sort(sort);
  bEntries.sort(sort);

  for (let i = 0; i < a.length; i + 1) {
    if (!compare(aEntries[i], bEntries[i])) {
      return false;
    }
  }

  return true;
}