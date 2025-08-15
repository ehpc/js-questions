function levenshteinRecursive(strA: string, strB: string): number {
  // Need to insert every symbol from B to A
  if (!strA) return strB.length;
  // Need to delete every symbol in A
  if (!strB) return strA.length;

  // Do not need to do anything
  if (strA.slice(-1) === strB.slice(-1)) {
    return levenshteinRecursive(strA.slice(0, -1), strB.slice(0, -1));
  }

  return 1 + Math.min(
    // Insert from B to A
    levenshteinRecursive(strA, strB.slice(0, -1)),
    // Remove from A
    levenshteinRecursive(strA.slice(0, -1), strB),
    // Replace in A
    levenshteinRecursive(strA.slice(0, -1), strB.slice(0, -1)),
  );
}

function levenshteinRecursiveMemoized(strA: string, strB: string): number {
  const cache: Map<string, number> = new Map();
  
  function strsToKey(a: string, b: string): string {
    return `${a}::${b}`;
  }

  function recur(a: string, b: string): number {
    const key = strsToKey(a, b);
    if (cache.has(key)) return cache.get(key)!;

    let result: number;

    if (!a) result = b.length;
    else if (!b) result = a.length;
    else if (a.slice(-1) === b.slice(-1)) {
      result = recur(a.slice(0, -1), b.slice(0, -1));
    } else {
      result = 1 + Math.min(
        recur(a, b.slice(0, -1)),
        recur(a.slice(0, -1), b),
        recur(a.slice(0, -1), b.slice(0, -1)),
      );
    }

    cache.set(key, result);
    return result;
  }

  return recur(strA, strB);
}

function levenshteinTabled(strA: string, strB: string): number {
  /*
    DP table format
        s t r B
        - b a b
    s - 0 1 2 3
    t b 1 ? ? ?
    r o 2 ? ? ?
    A b 3 ? ? ? <- answer
  */
  const table = new Array(strA.length + 1).fill(undefined).map(_ => new Array(strB.length + 1).fill(undefined));
  for (let i = 0; i <= strA.length; i++) table[i][0] = i;
  for (let j = 0; j <= strB.length; j++) table[0][j] = j;

  for (let i = 1; i <= strA.length; i++) {
    for (let j = 1; j <= strB.length; j++) {
      const a = strA[i - 1];
      const b = strB[j - 1];
      if (a === b) table[i][j] = table[i - 1][j - 1];
      else table[i][j] = 1 + Math.min(table[i][j - 1], table[i - 1][j], table[i - 1][j - 1]);
    }
  }

  return table[strA.length][strB.length];
}


// Test cases
const testCases = [
  // Basic examples
  ['bob', 'rob', 1, 'одна замена'],
  ['австрия', 'австралия', 2, 'два удаления'],
  
  // Edge cases
  ['', '', 0, 'both empty'],
  ['', 'abc', 3, 'insert all'],
  ['abc', '', 3, 'delete all'],
  ['a', 'a', 0, 'identical'],
  
  // Single character operations
  ['a', 'b', 1, 'replace'],
  ['a', 'ab', 1, 'insert'],
  ['ab', 'a', 1, 'delete'],
  
  // Classic examples
  ['kitten', 'sitting', 3, 'k→s, e→i, insert g'],
  ['saturday', 'sunday', 3, 'sat→sun, ur→, ay→ay'],
  
  // Insertions only
  ['cat', 'cats', 1, 'insert s'],
  ['', 'hello', 5, 'insert all'],
  
  // Deletions only
  ['hello', 'hell', 1, 'delete o'],
  ['hello', '', 5, 'delete all'],
  
  // Replacements only
  ['abc', 'xyz', 3, 'replace all'],
  ['test', 'best', 1, 't→b'],
  
  // Mixed operations
  ['intention', 'execution', 5, 'complex mixed'],
  ['distance', 'editing', 5, 'complex mixed'],
  
  // Same length, different content
  ['abcd', 'efgh', 4, 'replace all'],
  ['abcd', 'abef', 2, 'replace c,d'],
  
  // Reversed strings
  ['abc', 'cba', 2, 'a↔c'],
  ['hello', 'olleh', 4, 'reverse'],
  
  // Repeated characters
  ['aaa', 'aa', 1, 'delete one a'],
  ['aa', 'aaa', 1, 'insert one a'],
  ['aaa', 'bbb', 3, 'replace all'],
  
  // Unicode/Cyrillic
  ['кот', 'код', 1, 'т→д'],
  ['мама', 'папа', 2, 'м→п, м→п'],
] as const;

// Functions to test
const functions = [
  { name: 'levenshteinRecursive', fn: levenshteinRecursive },
  { name: 'levenshteinRecursiveMemoized', fn: levenshteinRecursiveMemoized },
  { name: 'levenshteinTabled', fn: levenshteinTabled }
];

// Run tests
console.log('Running Levenshtein distance tests...\n');

for (const { name, fn } of functions) {
  console.log(`Testing ${name}:`);
  let passed = 0;
  let failed = 0;
  
  for (const [strA, strB, expected, description] of testCases) {
    const actual = fn(strA, strB);
    const isCorrect = actual === expected;
    
    console.assert(
      isCorrect,
      `FAIL: ${name} "${strA}" → "${strB}" expected ${expected}, got ${actual} (${description})`
    );
    
    if (isCorrect) {
      console.log(`  ✓ "${strA}" → "${strB}" = ${actual} (${description})`);
      passed++;
    } else {
      console.log(`  ✗ "${strA}" → "${strB}" = ${actual}, expected ${expected} (${description})`);
      failed++;
    }
  }
  
  console.log(`  Results: ${passed} passed, ${failed} failed\n`);
}

console.log('All tests completed!');
