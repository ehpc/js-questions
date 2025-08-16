function getAnagram(str: string): string[] {
  const chars = str.split('').sort();
  const used = new Array(chars.length).fill(false);
  const results: string[] = [];

  function recur(permutation: string[]) {
    if (permutation.length === chars.length) {
      results.push(permutation.join(''));
      return;
    }
    for (let i = 0; i < used.length; i++) {
      if (used[i]) continue;
      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      permutation.push(chars[i]);
      recur(permutation);
      used[i] = false;
      permutation.pop();
    }
  }

  recur([]);
  return results;
}

console.log(getAnagram('cat')); // ['act', 'atc', 'cat', 'cta', 'tac', 'tca']
console.log(getAnagram('aab')); // ['aab', 'aba', 'baa']
console.log(getAnagram('aba')); // ['aab', 'aba', 'baa']

function getAnagramFreq(str: string): string[] {
  const chars = str.split('').sort();
  const freqByChar: Map<string, number> = new Map();
  chars.forEach(char => freqByChar.set(char, freqByChar.has(char) ? freqByChar.get(char)! + 1 : 1));
  const results: string[] = [];

  function recur(permutation: string[]) {
    if (permutation.length === chars.length) {
      results.push(permutation.join(''));
      return;
    }

    for (const [char, freq] of freqByChar) {
      if (freq <= 0) continue;
      freqByChar.set(char, freq - 1);
      permutation.push(char);
      recur(permutation);
      freqByChar.set(char, freq);
      permutation.pop();
    }
  }

  recur([]);
  return results;
}

console.log(getAnagramFreq('cat')); // ['act', 'atc', 'cat', 'cta', 'tac', 'tca']
console.log(getAnagramFreq('aab')); // ['aab', 'aba', 'baa']
console.log(getAnagramFreq('aba')); // ['aab', 'aba', 'baa']
