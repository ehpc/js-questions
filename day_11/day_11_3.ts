function twoSum(arr: number[], target: number): [number, number] | undefined {
  const complements = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (complements.has(complement)) {
      return [complements.get(complement)!, i];
    }
    complements.set(arr[i], i);
  }

  return undefined;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]