type SemaphoreFn<T> = (flag?: T) => void;

function createsAsyncSemaphore<T = string>(fn: Function, ...requiredFlags: T[]): SemaphoreFn<T> {
  const raisedFlags = new Set<T>();
  return function (flag?: T) {
    if (flag && requiredFlags.includes(flag)) {
      raisedFlags.add(flag);
      if (raisedFlags.size === requiredFlags.length) {
        fn();
      }
    }
  };
}

const semaphore = createsAsyncSemaphore(() => {
  console.log('Boom!');
}, 'foo', 'bar');

setTimeout(() => semaphore('foo'), 0);
setTimeout(() => semaphore('bar'), 10); // 'Boom!'

// Эта функция не будет выполняться
setTimeout(() => semaphore(), 50);