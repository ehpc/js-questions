// allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
//   console.log(v1); // {status: 'fulfilled', value: day_1}
//   console.log(v2); // {status: 'fulfilled', value: day_2}
//   console.log(v3); // {status: 'rejected', reason: 3}
// });

// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });
//
// promiseAll([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });
// Expected output: Array [3, 42, "foo"]

// const promise1 = Promise.reject(0);
// const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
// const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));
//
// const promises = [promise1, promise2, promise3];
//
// promiseAny(promises).then((value) => console.log(value));

// Expected output: "quick"

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 500, 'one');
// });
//
// const promise2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'two');
// });
//
// promiseRace([promise1, promise2]).then((value) => {
//   console.log(value);
//   // Both resolve, but promise2 is faster
// });
// // Expected output: "two"


function promiseAll(promises) {
  const result = new Array(promises.length);
  let resolvedPromisesCount = 0;

  return new Promise((resolve, reject) => {
    if (!promises || !Array.isArray(promises) || !promises?.length) {
      resolve(result);
    }

    promises.forEach(async (promise, index) => {
      try {
        const res = await Promise.resolve(promise);
        result[index] = res;
        resolvedPromisesCount += 1;

        if (resolvedPromisesCount === promises.length) {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

function allSettled(promises) {
  const result = new Array(promises.length);
  let total = 0;


  return new Promise((resolve) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = {status: 'fulfilled', value}
          total += 1;

          if (total === promises.length) {
            resolve(result);
          }
        })
        .catch((reason) => {
          result[index] = {status: 'rejected', reason}
          total += 1;

          if (total === promises.length) {
            resolve(result);
          }
        })
    });
  });
}

function promiseAny(iters) {
  const promises = [...iters].map((iter) => Promise.resolve(iter));
  const rejectsArray = new Array(promises.length);
  let totalRejectedCount = 0;

  return new Promise((resolve, reject) => {
    if (!promises.length) {
      reject(rejectsArray);
    }

    promises.forEach((promise, index) => {
      promise
        .then((value) => resolve(value))
        .catch((reason) => {
          rejectsArray[index] = reason;
          totalRejectedCount += 1;

          if (totalRejectedCount === promises.length) {
            reject(rejectsArray)
          }
        })
    });
  });
}

function promiseRace(iters) {
  const promises = [...iters].map((iter) => Promise.resolve(iter));

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then((value) => resolve(value));
    })
  });
}

console.log(checkBrackets('[')) // false
console.log(checkBrackets('((()))[]{}')) // true
console.log(checkBrackets('([()])[]()')) // true
console.log(checkBrackets('([()][]()')) // false

function checkBrackets(str) {
  const map = {
    '}': '{',
    ')': '(',
    ']': '['
  };

  const stack = [];

  str.split('').forEach((char) => {
    if (stack.length === 0) {
      stack.push(char);
    } else if (stack.at(-1) === map[char]) {
      stack.pop();
    } else {
      stack.push(char);
    }
  });

  return stack.length === 0;
}