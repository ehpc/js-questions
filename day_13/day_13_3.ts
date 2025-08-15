function maxUniqueSubstr(str: string): string {
  if (str.length <= 1) return str;

  let left = 0;
  let right = 0;
  const lastIndexByChar: Map<string, number> = new Map();
  let bestLeft = 0;
  let bestLength = 0;
  while (right < str.length) {
    const currentChar = str[right];
    if (lastIndexByChar.has(currentChar) && lastIndexByChar.get(currentChar)! >= left) {
      left = lastIndexByChar.get(currentChar)! + 1;
    }

    lastIndexByChar.set(currentChar, right);

    if (right - left + 1 > bestLength) {
      bestLeft = left;
      bestLength = right - left + 1;
    }

    right += 1;
  }

  return str.slice(bestLeft, bestLeft + bestLength);
}

console.log(maxUniqueSubstr('acbabcbb')); // acb
console.log(maxUniqueSubstr('aab'));      // ab
console.log(maxUniqueSubstr('abcabcbb')); // abc
console.log(maxUniqueSubstr('bbbbb'));    // b
console.log(maxUniqueSubstr('pwwkew'));   // wke
console.log(maxUniqueSubstr('abba'));     // ab