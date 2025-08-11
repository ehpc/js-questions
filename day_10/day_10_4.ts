function myParseFloat(str: string): number {
  str = str.trim();
  if (!str) return NaN;

  let negative = false;
  let negativeExponent = false;
  let isLeftPart = true;
  let exponent = false;
  let left = 0;
  let right = 0;
  let rightCount = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '-' && i === 0) {
      if (str[i + 1] === '-') return NaN;
      negative = true;
    } else if (char === 'e') {
      if (i === 0) return NaN;
      if (exponent) break;
      exponent = true;
      isLeftPart = false;
      if (str[i + 1] === '-') {
        negativeExponent = true;
        i += 1;
      }
    } else if (char === '.') {
      if (!isLeftPart) break;
      isLeftPart = false;
    } else if (/\d/.test(char)) {
      if (isLeftPart) {
        left = 10 * left + Number(char);
      } else {
        right = right * 10 + Number(char);
        rightCount += 1;
      }
    } else break;
  }
  if (exponent) {
    if (negativeExponent) return left / Math.pow(10, right) * (negative ? -1 : 1);
    else return left * Math.pow(10, right) * (negative ? -1 : 1);
  }
  return (left + right / Math.pow(10, rightCount)) * (negative ? -1 : 1);
}

console.log(myParseFloat('10'));       // 10
console.log(myParseFloat('-10.2'));    // -10.2
console.log(myParseFloat('-562.234')); // -562.234
console.log(myParseFloat('6e-2'));     // 0.06
console.log(myParseFloat('6e-e-2'));   // 6
console.log(myParseFloat('6e-f--2'));  // 6
console.log(myParseFloat('--20'));     // NaN
console.log(myParseFloat(''));           // NaN
console.log(myParseFloat('   123'));     // 123 (ignores leading whitespace)
console.log(myParseFloat('123abc'));     // 123 (stops at first invalid char)
console.log(myParseFloat('1.2.3'));      // 1.2 (stops at second decimal)
console.log(myParseFloat('e5'));         // NaN
