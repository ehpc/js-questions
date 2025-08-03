function myParseInt(num: string, base: 2 | 10 | 16 = 10): number {
  num = num.trim();
  const negative = num[0] === '-';
  const startingIndex = negative ? 1 : 0;

  const allowedSymbols = {
    2: {0: 0, 1: 1},
    10: {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
      7: 7, 8: 8, 9: 9,
    },
    16: {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
      7: 7, 8: 8, 9: 9, 'A': 10, 'B': 11, 'C': 12,
      'D': 13, 'E': 14, 'F': 15,
    },
  };

  let usableLength = 0;
  let startsWithBadSymbol = true;
  for (let i = startingIndex; i < num.length; i++) {
    const symbol = num[i].toUpperCase();
    if (!allowedSymbols[base].hasOwnProperty(symbol)) {
      if (startsWithBadSymbol) {
        return NaN;
      } else {
        break;
      }
    }
    startsWithBadSymbol = false;
    usableLength += 1;
  }
  if (usableLength < 1) {
    return NaN;
  }

  let currentNumber: number = 0;
  let currentPlaceValuePower = usableLength - 1;
  for (let i = startingIndex; i < startingIndex + usableLength; i++) {
    const symbol = num[i].toUpperCase();
    const placeValue = Math.pow(base, currentPlaceValuePower);
    currentNumber += allowedSymbols[base][symbol] * placeValue;
    currentPlaceValuePower -= 1;
  }
  return negative ? -currentNumber : currentNumber;
}

console.log(myParseInt('10'));      // 10
console.log(myParseInt('-10', 2));  // -2
console.log(myParseInt('FFP', 16)); // 255
console.log(myParseInt('--20'));    // NaN
console.log(myParseInt(''));    // NaN