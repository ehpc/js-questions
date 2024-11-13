setTimeout(() => {
  console.log(3);
}, 0);

const setImmediateTimers= new Map();

function setImmediate(cb) {
  const timer = setImmediateTimers.size;
  setImmediateTimers.set(timer, true);

  queueMicrotask(() => {
    if (setImmediateTimers.get(timer) === false) {
      return;
    }

    cb();
  });

  return timer;
}

function clearImmediate(timer) {
  setImmediateTimers.set(timer, false);
}

setImmediate(() => {
  console.log(1);
});

const timer = setImmediate(() => {
  console.log(2);
});

clearImmediate(timer);