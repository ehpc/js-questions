function mySort(arr: number[]): number[] {
  if (!arr.length) {
    return arr;
  }

  const evenNumbers: number[] = [];
  const evenIndices: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenNumbers.push(arr[i]);
      evenIndices.push(i);
    }
  }

  evenNumbers.sort();

  const result = arr.slice();
  for (let i = 0; i < evenIndices.length; i++) {
    const index = evenIndices[i];
    result[index] = evenNumbers[i];
  }

  return result;
}

let res = mySort([7, 1, 4, 2, 9, 8]);
let expected = '7,1,2,4,9,8';
console.assert(res.toString() === expected, `Wrong order (1): ${res}, expected: ${expected}`);

res = mySort([1, 8, 3, 6, 5, 4]);
expected = '1,4,3,6,5,8';
console.assert(res.toString() === expected, `Wrong order (2): ${res}, expected: ${expected}`);

export {};