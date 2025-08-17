function findPalindromicSubstring(str: string): string | null {
  if (str.length < 2) return null;

  function expand(left: number, right: number): [number, number] {
    while (left >= 0 && right < str.length) {
      if (str[left] === str[right]) {
        left -= 1;
        right += 1;
      } else break;
    }
    return [left + 1, right - 1];
  }

  let bestLen = 0;
  let bestStart = 0;
  let left = 0;
  while (left < str.length) {
    let [pLeft, pRight] = expand(left, left);
    let len = pRight - pLeft + 1;
    if (len > bestLen) {
      bestLen = len;
      bestStart = pLeft;
    }

    if (left + 1 < str.length) {
      [pLeft, pRight] = expand(left, left + 1);
      len = pRight - pLeft + 1;
      if (len > bestLen) {
        bestLen = len;
        bestStart = pLeft;
      }
    }

    left += 1;
  }
  return bestLen >= 2 ? str.slice(bestStart, bestStart + bestLen) : null;
}

/**
 * str   = i a i a d a i a d a k
 * diams = 1 3 3 1 7 1 7 1 3 1 1
 */
function findPalindromicSubstringManachers(str: string): string | null {
  const str_prime = `#${str.split('').join('#')}#`; // Make str always odd len
  const diams = new Array(str_prime.length).fill(0); // Palindrome lengths at center i
  let center = -1; // Center index of a palindrome with the most extended right border
  let right_border = -1; // Inclusive right border
  let longestPalindromeCenter = -1;
  let longestPalindromeLen = 0;
  for (let i = 0; i < str_prime.length; i++) {
    let left = i - 1;
    let right = i + 1;
    if (i <= right_border) {
      // Current center is inside another palindrome
      const mirrorI = center - (i - center);
      const mirrorRadius = diams[mirrorI];
      const distanceToRightBorder = right_border - i;
      const containedILen = distanceToRightBorder*2 + 1;
      if (mirrorRadius < containedILen) {
        // If a mirror palindrome is not touching the border of the containing palindrome
        diams[i] = mirrorRadius;
        continue;
      } else {
        // If a mirror palindrome is touching the border of the containing palindrome
        left = i - distanceToRightBorder - 1;
        right = i + distanceToRightBorder + 1;
      }
    }
    {
      // Expand
      while (left >= 0 && right < str_prime.length && str_prime[left] === str_prime[right]) {
        left -= 1;
        right += 1;
      }
      left += 1;
      right -= 1;
      const len = right - left + 1;
      diams[i] = len;

      // Update center
      if (right_border < right) {
        center = i;
        right_border = right;
      }

      if (len > longestPalindromeLen) {
        longestPalindromeCenter = i;
        longestPalindromeLen = len;
      }
    }
  }

  const realCenter = Math.floor(longestPalindromeCenter / 2);
  const realLen = Math.floor(longestPalindromeLen / 2);
  const left = realCenter - Math.floor(realLen / 2);
  return realLen > 1
    ? str.slice(left, left + realLen)
    : null;
}


for (const fn of [findPalindromicSubstring, findPalindromicSubstringManachers]) {
  console.log('Testing', fn.name);
  [
    ["iaiadaiadak", "aiadaia"],
    ["", null],
    ["a", null],
    ["aa", "aa"],
    ["ab", null],
    ["aba", "aba"],
    ["abba", "abba"],
    ["cbbd", "bb"],
    ["babad", "bab"],            // или "aba" — обе ок
    ["forgeeksskeegfor", "geeksskeeg"],
    ["abcda", null],             // длины 1 не считаем
    ["aaaabaaa", "aaabaaa"],
  ].forEach(([s, expect]) => {
    const got = fn(s as string);
    console.log(s, "=>", got, "✓", expect === null ? got === null : got === expect || (s==="babad" && (got==="bab"||got==="aba")));
  });
  console.log('\n\n');
}

export {};