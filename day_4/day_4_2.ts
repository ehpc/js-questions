class MyNumber {
  #value: number;

  constructor(initialValue: number) {
    this.#value = initialValue;
  }

  add(value: number) {
    this.#value += value;
    return this;
  }

  mult(value: number) {
    this.#value *= value;
    return this;
  }

  sub(value: number) {
    this.#value -= value;
    return this;
  }

  valueOf(): number {
    return this.#value;
  }

  [Symbol.toPrimitive](): number {
    return this.#value;
  }
}

const num = new MyNumber(10);

console.log(+num.add(2).mult(2).sub(1) - 5); // 18