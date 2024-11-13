console.log('foo');

setTimeout(() => {
  console.log('bar');
}, 0);

queueMicrotask(() => {
  console.log('baz');
  Promise.resolve().then().then(() => console.log('ban'));
});

new Promise((resolve) => {
  console.log('bla');
  resolve('baf');
}).then(console.log);

console.log('bak');

// foo bla bak baz baf ban bar