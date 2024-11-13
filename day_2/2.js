const obj = {};

function setByPath(obj, keyString, value) {
  if (!obj) return;

  const keys = keyString.split('.');

  if (!keys) return;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      obj[key] = value;
    } else {
      obj[key] ??= {};
      obj = obj[key];
    }
  })
}

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);
setByPath(obj, 'foo.baz.bla', 3);

console.log(obj); // {foo: {bar: day_1, bla: day_2}}