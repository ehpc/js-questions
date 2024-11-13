function cbDiv(a, b, cb) {
  if (b === 0) {
    cb(new TypeError('Cannot devide by 0'));

  } else {
    cb(null, a / b);
  }
}

function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      if (args.length !== fn.length - 1) {
        throw new Error('The fn arguments number is wrong!');
      }

      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      })
    });
  }
}

const promiseDiv = promisify(cbDiv);

promiseDiv(1, 2).then(console.log);  // 0.day_5
promiseDiv(1, 0).catch(console.log); // TypeError('ÐÐµÐ»ÑÐ·Ñ Ð´ÐµÐ»Ð¸ÑÑ Ð½Ð° 0')