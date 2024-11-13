console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 4 - val));   // 3
console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 234 - val)); // -1

function bisect(arr, compator) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = end - start + 1;
    const result = compator(arr[mid]);

    if (result === 0) {
      return mid;
    }
    if (result > 0) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return undefined;
}