function bisect(arr: number[], comparator: (val: number) => number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let middle = left + ((right - left) >> 1)
    let middleResult = comparator(arr[middle]);
    if (middleResult === 0) return middle;
    if (middleResult < 0) right = middle - 1;
    else left = middle + 1;
  }
  return - 1;
}

console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 4 - val));   // 3
console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 234 - val)); // -1
console.log(bisect([], (val) => 234 - val)); // -1