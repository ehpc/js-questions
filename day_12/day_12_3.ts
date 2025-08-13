function zip<T = any>(...iters: AsyncIterable<T>[]): AsyncIterableIterator<T[]> {
  const iterators: AsyncIterator<T>[] = iters.map(iter => iter[Symbol.asyncIterator]());
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      const nextPromises = iterators.map(iterator => iterator.next());
      const results = await Promise.all(nextPromises);
      const done = results.some(({ done }) => done);
      if (done) return { value: undefined, done: true };
      const combined = results.map(result => result.value);
      return { value: combined, done: false };
    }
  };
}



async function* makeAsync(iter) {
  yield* iter;
}

// [1, 'a', '.'] [2, 'b', '.']
(async () => {
  for await (const el of zip(makeAsync(new Set([1, 2])), makeAsync(['a', 'b', 'z']), makeAsync('...'))) {
    console.log(el);
  }
})();

export {};
