class MyNumber {
  constructor(num = 0) {
    this.num = num;
  }

  add(int) {
    this.num += int;
    return this;
  }

  sub(int) {
    this.num -= int;
    return this;
  }

  mult(int) {
    this.num *= int;
    return this;
  }

  div(int) {
    this.num /= int;
    return this;
  }

  [Symbol.toPrimitive](hint) {
    return hint === "number" ? this.num : `${this.num}`;
  }
}

const num = new MyNumber(10);
console.log(num)

console.log(num.add(2).mult(2).sub(1) - 5); // 18