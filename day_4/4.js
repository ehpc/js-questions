console.log(...zip(new Set([1, 2]), ['a', 'b', 'z'], '...')); // [day_1, 'a', '.'] [day_2, 'b', '.']

function zip(...iterables) {
  const iters = [...iterables].map((iter) => iter[Symbol.iterator]());

  let
    done = false;

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      if (done) {
        return {done, value: undefined};
      }

      const value = new Array(iters.length);

      for (const [i, iter] of iters.entries()) {
        const current = iter.next();

        if (current.done) {
          done = true;
          return {done, value: undefined};
        }

        value[i] = current.value;
      }

      return {done: false, value};
    }
  }
}