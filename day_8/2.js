const semaphore = createsAsyncSemaphore(() => {
  console.log('Boom!');
}, 'foo', 'bar');

semaphore('foo');
semaphore('bar'); // 'Boom!'

// will not invoke anymore
semaphore();

function createsAsyncSemaphore(cb, ...flags) {
  const conditions = new Set(flags);
  let isInvoked = false;

  return function (flag) {
    conditions.delete(flag);

    if (isInvoked || conditions.size) {
      return;
    }

    isInvoked = true;
    cb.apply(this);
  }
}