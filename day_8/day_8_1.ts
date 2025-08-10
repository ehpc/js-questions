function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let blocked = false;
  return function (this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    if (!blocked) {
      blocked = true;
      const result = fn.apply(this, args);
      setTimeout(() => {
        blocked = false;
      }, delay);
      return result;
    }
  };
}

function laugh() {
  console.log('Ha-ha!')
}

const throttledLaugh = throttle(laugh, 300);

throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();

export {};