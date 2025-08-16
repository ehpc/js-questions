function isValid(str: string): boolean {
  const stack: string[] = [];
  const matchingParentheses = {
    '}': '{',
    ')': '(',
    ']': '[',
  };

  for (const char of str) {
    if (char === '{' || char === '(' || char === '[') {
      stack.push(char);
    } else if (matchingParentheses[char]) {
      const lastParenthesis = stack.pop();
      if (lastParenthesis !== matchingParentheses[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValid('(hello{world} and [me])'));  // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')'));                        // false
console.log(isValid('(hello'));                   // false

export {};