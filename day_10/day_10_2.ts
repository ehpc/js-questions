type PromiseFn = () => Promise<any>;

function allSettledLimit(fns: PromiseFn[], limit: number): Promise<PromiseSettledResult<any>[]> {
  const results: PromiseSettledResult<any>[] = new Array(fns.length);

  let currentIndex = 0;
  let completedCount = 0;

  return new Promise((resolve) => {
    function runNext() {
      if (currentIndex >= fns.length) return;
      
      const index = currentIndex;
      currentIndex += 1;
      fns[index]()
        .then((value) => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completedCount += 1;
          if (completedCount === fns.length) {
            resolve(results);
          } else {
            runNext();
          }
        });
    }

    const batchCount = Math.min(fns.length, limit);
    for (let i = 0; i < batchCount; i++) {
      runNext();
    }
  });
}

allSettledLimit([
  () => fetch('//some-data-1'),
  () => fetch('http://example.com'),
  () => fetch('//some-data-3'),
  () => fetch('//some-data-4')
], 2).then((results) => {
  console.log(results);
});