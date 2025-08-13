function zip(...iterables: Iterable<any>[]): IterableIterator<any> {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      const zippedValue: any[] = [];
      for (const iterator of iterators) {
        const result = iterator.next();
        if (result.done) {
          return {
            done: true,
            value: undefined,
          };
        }
        zippedValue.push(result.value);
      }
      return {
        done: false,
        value: zippedValue,
      };
    }
  }
}

function generatorZip(...iterables: Iterable<any>[]): IterableIterator<any> {
  const generator = function* () {
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]());
    while (true) {
      const results = iterators.map(iterator => iterator.next());
      if (results.some(result => result.done)) break;
      yield results.map(result => result.value);
    }
  };
  return generator();
}

const zipped = zip(new Set([1, 2]), ['a', 'b', 'z'], '...');
console.log('1st run: ', ...zipped); // [1, 'a', '.'] [2, 'b', '.']
console.log('2nd run: ', ...zipped); // nothing

const generatorZipped = generatorZip(new Set([1, 2]), ['a', 'b', 'z'], '...');
console.log('1st run: ', ...generatorZipped); // [1, 'a', '.'] [2, 'b', '.']
console.log('2nd run: ', ...generatorZipped); // nothing

export {};