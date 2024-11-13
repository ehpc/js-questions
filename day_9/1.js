function throttle(cb, delay) {
  let timer;

  return function (...args) {
    if (!timer) {
      cb.apply(this, args);

      timer = setTimeout(() => {
        timer = undefined;
      }, delay);
    }
  }
}

function laugh() {
  console.log('Ha-ha!')
}

const throttledLaugh = throttle(laugh, 300);

throttledLaugh();
throttledLaugh();
throttledLaugh();
throttledLaugh();
setTimeout(() => throttledLaugh(), 500);