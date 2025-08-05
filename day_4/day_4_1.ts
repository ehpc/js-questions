function promisify(fn: Function) {
  return function (...args) {
    const usableArgs = args.slice(0, fn.length - 1);
    return new Promise((resolve, reject) => {
      fn(...usableArgs, function (error, result) {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

function cbDiv(a, b, cb) {
  if (b === 0) {
    cb(new TypeError('Нельзя делить на 0'));
  
  } else {
    cb(null, a / b);
  }
}

const promiseDiv = promisify(cbDiv);

promiseDiv(1, 2).then(console.log);  // 0.5
promiseDiv(1, 0).catch(console.log); // TypeError('Нельзя делить на 0')
