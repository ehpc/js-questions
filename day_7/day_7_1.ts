function diff(arrA: number[], arrB: number[]): number[] {
  const setB = new Set(arrB);
  const result: number[] = [];
  for (const x of arrA) {
    if (!setB.has(x)) {
      result.push(x);
    }
  }
  return result;
}

console.log(diff([1, 2, 3, 4, 5], [3, 4, 1])); // [2, 5] 