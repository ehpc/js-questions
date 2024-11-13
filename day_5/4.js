console.log(find('kbza', [
  'kobezzza',
  'bob',
  'kibiza',
  'kobea',
])); // ['kobezzza', 'kibiza']

function find(input, arr) {
  const inputChars = input.split('');

  return arr.reduce((acc,str) => {
    const charSet = new Set(str.split(''));

    if (inputChars.every((char) => charSet.has(char))) {
      acc.push(str);
    }

    return acc;
  },[]);
}