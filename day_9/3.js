console.log(getUniqueStrs(['atoe', 'otea', 'ben', 'enb', 'baz', 'foo'])); // ['baz', 'foo']

function getUniqueStrs(arr) {
  const map = new Map();

  arr.forEach((word) => {
    const normalizedStr = word.split('').sort((a, b) => a.localeCompare(b)).join('');

    if (map.has(normalizedStr)) {
      map.get(normalizedStr).count++;
    } else {
      map.set(normalizedStr, {count: 1, word})
    }
  });

  return [...map.values()].reduce((acc, {count, word}) => {
    if (count === 1) {
      acc.push(word);
    }

    return acc;
  }, [])
}