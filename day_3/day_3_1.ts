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

/*
Поведение Event Loop зафиксировано в стандарте HTML 8.1.7.3 Processing model
https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model

В ECMAScript 9.5 Jobs and Host Operations to Enqueue Jobs https://tc39.es/ecma262/#sec-jobs
также зафиксированы некоторые операции.

Из этих спецификаций можно вывести примерный алгоритм работы Event Loop:

1. Если есть хотя бы одна очередь тасок с доступной для выполнения таской:
  1. Выбрать из одной такой очереди (из какой именно, зависит от реализации) самую старую таску;
  2. Выполнить эту таску;
  3. Выполнить все микротаски, сначала самые старые;
2. Повторить всё сначала.

Есть одна очередь микротасков, но много очередей тасков (зависит от реализации).
К микротаскам относятся колбэки промисов, queueMicrotask и MutationObserver.

Что касается process.nextTick в node.js, то он будет выполнен сразу после 
завершения любой операции Event Loop.

*/