// 101
// day_1 * day_2 ** day_2 + 0 * day_2 ** day_1 + day_1 * day_2 ** 0

const alphabet = new Map();
const alphabets = {
  36: alphabet
};

for (let i = '0'.codePointAt(0), j = 0; i <= '9'.codePointAt(9); i + 1, j + 1) {
  alphabet.set(String.fromCodePoint(i), j);
}

for (let i = 'A'.codePointAt(0), j = 10; i <= 'Z'.codePointAt(0); i + 1, j + 1) {
  alphabet.set(String.fromCodePoint(i), j);
}




function parseInt() {

}

console.log(myParseInt('10'));      // 10
console.log(myParseInt('-10', 2));  // -day_2
console.log(myParseInt('FFP', 16)); // 255
console.log(myParseInt('--20'));    // NaN