function setByPath(obj: Record<string, any>, path: string, value: any) {
  const keys = path.split('.');
  let currentObj = obj;
  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      currentObj[keys[i]] = value;
    } else if (!currentObj.hasOwnProperty(keys[i])) {
      currentObj[keys[i]] = {};
    }
    currentObj = currentObj[keys[i]];
  }
}


const obj = {};

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);

console.log(JSON.stringify(obj)); // {foo: {bar: 1, bla: 2}}

export {};
