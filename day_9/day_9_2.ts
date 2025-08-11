interface RetryOptions {
  retry: number;
  delay: (retryNumber: number) => number;
}

type RetryFn<R> = (...args: any[]) => Promise<R>;

function retry<T extends RetryFn<R>, R>(fn: T, options: RetryOptions): Promise<R> {
  return new Promise<R>((resolve, reject) => {
    let retries = 0;
    function tryExecute() {
      fn().then(resolve).catch((err) => {
        console.log(retries);
        if (retries >= options.retry) return reject(err);
        retries += 1;
        const delay = options.delay(retries);
        setTimeout(tryExecute, delay);
      });
    }
    tryExecute();
  });
}

retry(() => fetch('//some-data'), {retry: 3, delay: (n) => n * 100}).then(console.log, console.error);