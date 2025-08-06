function find(needle: string, haystack: string[]): string[] {
  const matches: string[] = [];
  for (const hay of haystack) {
    let hayIndex = 0;
    let needleIndex = 0;
    while (needleIndex < needle.length && hayIndex < hay.length) {
      if (needle[needleIndex] === hay[hayIndex]) {
        needleIndex += 1;
      }
      hayIndex += 1;
    }
    if (needleIndex === needle.length) {
      matches.push(hay);
    }
  }
  return matches;
}

console.log(find('kbza', [
  'kobezzza',
  'bob',
  'kibiza',
  'kobea'
])); // ['kobezzza', 'kibiza']