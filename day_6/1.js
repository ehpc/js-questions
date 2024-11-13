function laugh() {
  console.log('Ha-ha!')
}

const debouncedLaugh = debounce(laugh, 300);

debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    if (timerId != null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

function throttle(fn, delay) {
  let isRunning;

  return function(...args) {
    if (!isRunning) {
      isRunning = true;
      fn.apply(this, args);

      setTimeout(() => {
        isRunning = false;
      }, delay);
    }
  }
}