function stringRangesToArray(ranges: string): number[][] {
  return ranges.split('; ').map(range => {
    const parts = range.split('-').map(Number);
    if (parts.length === 1) parts.push(parts[0]);
    return parts;
  });
}

function intersectRanges(rangesAStr: string, rangesBStr: string): string {
  const rangesA = stringRangesToArray(rangesAStr);
  const rangesB = stringRangesToArray(rangesBStr);
  const results: string[] = [];
  for (const [aStart, aEnd] of rangesA) {
    for (const [bStart, bEnd] of rangesB) {
      const start = Math.max(aStart, bStart);
      const end = Math.min(aEnd, bEnd);
      if (start === end) results.push(`${start}`);
      else if (start < end) results.push(`${start}-${end}`);
    }
  }
  return results.join('; ');
}

console.log('>', intersectRanges('1-2; 4-6; 9-11', '1-5; 10-14; 15')); // 1-2; 4-5; 10-11 
console.log('>', intersectRanges('1-2', '5-6')); // "" (no intersection)
