function zipStr(str: string): string {
  const result: string[] = [];
  let prev = '';
  for (const char of str) {
    if (prev !== char) {
      result.push(char);
      prev = char;
    }
  }
  return result.join('');
}

console.log(zipStr('abbaabbafffbezza')); // ababafbeza