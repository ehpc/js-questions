type Token = number | string;

function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expression.length) {
    const char = expression[i];
    if (/\s/.test(char)) {
      i += 1;
      continue;
    } else if (/\d/.test(char)) {
      let token = '';
      while (i < expression.length && /\d/.test(expression[i])) {
        token += expression[i];
        i += 1;
      }
      tokens.push(Number(token));
    } else if ('+-*/()'.includes(char)) {
      tokens.push(char);
      i += 1;
    } else {
      throw new Error(`Unexpected character '${char}' at position ${i}.`);
    }
  }
  return tokens;
}

function calcRecursive(expression: string): number {
  const tokens = tokenize(expression);

  let pos = 0;

  function parseExpression(): number {
    let lhs = parseTerm();
    while (tokens[pos] === '+' || tokens[pos] === '-') {
      const op = tokens[pos];
      pos += 1;
      const rhs = parseTerm();
      if (op === '+') lhs += rhs;
      else lhs -= rhs;
    }
    return lhs;
  }

  function parseTerm(): number {
    let lhs = parseFactor();
    while (tokens[pos] === '*' || tokens[pos] === '/') {
      const op = tokens[pos];
      pos += 1;
      const rhs = parseFactor();
      if (op === '*') lhs *= rhs;
      else lhs /= rhs;
    }
    return lhs;
  }

  function parseFactor(): number {
    const token = tokens[pos];
    if (typeof token === 'number') {
      pos += 1;
      return token;
    } else if (token === '(') {
      pos += 1;
      const value = parseExpression();
      if (tokens[pos] !== ')') throw new Error(`Expected ")", got: ${tokens[pos]}.`);
      pos += 1;
      return value;
    }
    throw new Error(`Unexpected token: ${token}.`);
  }

  const result = parseExpression();
  if (pos !== tokens.length) {
    throw new Error(`Unexpected token at the end: ${tokens[pos]}.`);
  }
  return result;
}

console.log(calcRecursive('2+4*3')); // 14
console.log(calcRPN('(2+3)')); // 5
console.log(calcRecursive('4-2')); // 2
console.log(calcRecursive('5 * (2 + 3)')); // 25
console.log(calcRecursive('2*3*4')); // 24
console.log(calcRecursive('12+5*2/(60-58)-5')); // 12

function infixToRPN(tokens: Token[]): Token[] {
  const precedenceByToken = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const result: Token[] = [];
  const stack: Token[] = [];
  for (const token of tokens) {
    if (typeof token === 'number') {
      result.push(token);
    } else if (token === '+' || token === '-' || token === '*' || token === '/') {
        while (stack.length) {
          const peeked = stack[stack.length - 1];
          if (peeked !== '(' && precedenceByToken[peeked] >= precedenceByToken[token]) {
            result.push(peeked);
            stack.pop();
          } else break;
        }
        stack.push(token);
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack.length) {
        const top = stack.pop()!;
        if (top === '(') break;
        else result.push(top);
      }
    } else throw new Error(`Unexpected token: ${token}.`);
  }
  result.push(...stack.reverse());
  return result;
}

function calcRPN(expression: string): number {
  const tokens = tokenize(expression);
  const rpn = infixToRPN(tokens);
  const stack: Token[] = [];
  for (const token of rpn) {
    if (token === '*' || token === '/' || token === '+' || token === '-') {
      if (stack.length < 2) throw new Error('Wrong RPN!');
      const rhs = stack.pop()!;
      const lhs = stack.pop()!;
      if (typeof rhs !== 'number' || typeof lhs !== 'number') throw new Error('Wrong token type, expected number!');
      if (token === '*') stack.push(lhs * rhs);
      else if (token === '/') stack.push(lhs / rhs);
      else if (token === '+') stack.push(lhs + rhs);
      else if (token === '-') stack.push(lhs - rhs);
      else throw new Error(`Unexpected token: ${token}.`);
    } else {
      stack.push(token);
    }
  }
  if (stack.length !== 1) throw new Error(`Unexpected remaining stack: ${stack}.`);
  const result = stack.pop();
  if (typeof result !== 'number') throw new Error('Wrong result type, expected number!');
  return result;
}

console.log(calcRPN('2+4*3')); // 14
console.log(calcRPN('(2+3)')); // 5
console.log(calcRPN('4-2')); // 2
console.log(calcRPN('5 * (2 + 3)')); // 25
console.log(calcRPN('2*3*4')); // 24
console.log(calcRPN('12+5*2/(60-58)-5')); // 12