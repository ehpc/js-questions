function includesBruteforce(haystack: string, needle: string): boolean {
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let isSubstring = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        isSubstring = false;
        break;
      }
    }
    if (isSubstring) return true;
  }
  return false;
}

console.log('# Brute force');
console.log(includesBruteforce('adsgwadsxdsgwadsgz', 'dsgwadsgz'));     // true
console.log(includesBruteforce('aaaxaaax', 'aaxa'));     // true
console.log(includesBruteforce('aaaxaaax', 'aaaa'));     // false
console.log(includesBruteforce('hello bob!', 'bob'));    // true
console.log(includesBruteforce('abba', 'aba'));          // false
console.log(includesBruteforce('abc', 'c'));             // true
console.log(includesBruteforce('aaaaaaaaab', 'aaaab'));  // true

// Knuth-Morris-Pratt algorithm
function includesKMP(haystack: string, needle: string): boolean {
  /*
    Calculate longest prefix that is also a suffix for needle
    aaaxaaaa => [a=0, aa=1, aaa=2, aaax=0, aaaxa=1, aaaxaa=2, aaaxaaa=3, aaaxaaaa=3] = [0,1,2,0,1,2,3,3]
  */
  const lps: number[] = [0];
  let lpsIndex = 0;
  let needleIndex = 1;
  while (needleIndex < needle.length) {
    if (needle[lpsIndex] === needle[needleIndex]) {
      lps[needleIndex] = lpsIndex + 1;
      needleIndex += 1;
      lpsIndex += 1;
    } else {
      if (lpsIndex === 0) {
        lps[needleIndex] = 0;
        needleIndex += 1;
      } else {
        lpsIndex = lps[lpsIndex - 1];
      }
    }
  }

  // Now find substring
  let haystackIndex = 0;
  needleIndex = 0;
  while (haystackIndex < haystack.length) {
    if (haystack[haystackIndex] === needle[needleIndex]) {
      haystackIndex += 1;
      needleIndex += 1;
      if (needleIndex === needle.length) {
        return true;
      }
    } else {
      if (needleIndex === 0) {
        haystackIndex += 1;
      } else {
        needleIndex = lps[needleIndex - 1];
      }
    }
  }

  return false;
}

console.log('# KMP');
console.log(includesKMP('adsgwadsxdsgwadsgz', 'dsgwadsgz'));     // true
console.log(includesKMP('aaaxaaax', 'aaxa'));     // true
console.log(includesKMP('aaaxaaax', 'aaaa'));     // false
console.log(includesKMP('hello bob!', 'bob'));    // true
console.log(includesKMP('abba', 'aba'));          // false
console.log(includesKMP('abc', 'c'));             // true
console.log(includesKMP('aaaaaaaaab', 'aaaab'));  // true
