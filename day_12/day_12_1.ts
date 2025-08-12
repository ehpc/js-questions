function isPalindrome(str: string): boolean {
  if (str.length <= 1) return false;
  let left = 0;
  let right = str.length - 1;
  while (left <= right) {
    if (str[left] !== str[right]) return false;
    left += 1;
    right -= 1;
  }
  return true;
}

console.log(isPalindrome('bob'));  // true
console.log(isPalindrome('abba')); // true
console.log(isPalindrome('a'));    // false
console.log(isPalindrome('azt'));  // false