function getUniqueStrs(strs: string[]): string[] {
  const anagrams = new Map<string, number>();
  const keys: string[] = [];
  for (const str of strs) {
    const key = str.split('').toSorted().join('');
    keys.push(key);
    anagrams.set(key, (anagrams.get(key) || 0) + 1);
  }
  return strs.filter((_, i) => anagrams.get(keys[i]) === 1);
}

console.log(getUniqueStrs(['atoe', 'otea', 'ben', 'enb', 'baz', 'foo'])); // ['baz', 'foo']