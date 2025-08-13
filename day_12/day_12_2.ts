function extractQuotes(str: string): string[] {
  const allowedQuotes = new Set(['"', "'", '`']);
  const results: string[] = [];
  
  let i = 0;
  while (i < str.length) {
    const char = str[i];

    if (allowedQuotes.has(char)) {
      const currentQuote = char;
      let fragment = '';
      i += 1;

      while (i < str.length) {
        const inQuotesChar = str[i];
        if (inQuotesChar === '\\' && i + 1 < str.length) {
          fragment += inQuotesChar + str[i + 1];
          i += 2;
        } else if (inQuotesChar === currentQuote) {
          results.push(fragment);
          i += 1;
          break;
        } else {
          fragment += inQuotesChar;
          i += 1;
        }
      }
    } else {
      i += 1;
    }
  }

  return results;
}

console.log(extractQuotes('Это строка в "кавычках\'" и `"эта"` тоже, а это "хитрая строка\\""')); // ["кавычках'", '"эта"', 'хитрая строка\\"']
console.log(extractQuotes('"test\\\\"')); // ["test\\"]