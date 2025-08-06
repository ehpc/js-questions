function debounce(fn: Function, delay: number): Function {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}

function laugh() {
  console.log('Ha-ha!')
}

const debouncedLaugh = debounce(laugh, 300);

debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();

function throttle(fn: Function, delay: number): Function {
  let waiting = false;
  return function (...args) {
    if (!waiting) {
      fn(...args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, delay);
    }
  };
}

const throttledLaugh = throttle(laugh, 300);

throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
