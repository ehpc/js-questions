function reduce(arr: number[]): string {
  if (!arr.length) return '';

  const sorted = arr.toSorted((a, b) => a - b);
  let result: string[] = [];
  let start = sorted[0];
  for (let i = 1; i <= sorted.length; i++) {
    if (i === sorted.length || sorted[i] - sorted[i - 1] !== 1) {
      const end = sorted[i - 1];
      if (start === end) result.push(`${start}`);
      else result.push(`${start}-${end}`);
      start = sorted[i];
    }
    
  }
  return result.join(', ');
}

console.log(reduce([1, 3, 6, 8, 7, 11, 45, 46, 2])); // 1-3, 6-8, 11, 45-46
console.log(reduce([1, 3, 6, 8, 7, 11, 45, 80, 46, 2])); // 1-3, 6-8, 11, 45-46, 80