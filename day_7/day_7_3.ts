import { inspect } from 'util';

function serialize(obj: any): string {
  return JSON.stringify(obj, function (key, value) {
    if (this[key] instanceof Date) {
      return `:s:d:${value.valueOf()}`;
    } else if (this[key] instanceof Set) {
      return `:s:s:${serialize([...value])}`;
    } else if (this[key] instanceof Map) {
      return `:s:m:${serialize([...value])}`;
    }
    return value;
  });
}

function parse(objStr: string): any {
  return JSON.parse(objStr, function (key, value) {
    if (typeof value === 'string' && value.startsWith(':s')) {
      const type = value.slice(3, 4);
      const data = value.slice(5);
      if (type === 'd') {
        return new Date(data);
      } else if (type === 's') {
        return new Set(parse(data));
      } else if (type === 'm') {
        return new Map(parse(data));
      }
    }
    return value;
  });
}

const original = {
  myDate: new Date(),
  mySet: new Set([1, 2, 3]),
  mySet2: new Set([{insideSet: new Set([1, 2])}, 3]),
  myMap: new Map([
    [new Date(), {a: 1}]
  ])
};

console.log(inspect(original, false, 10));

const str = serialize(original);
console.log(str);

// Объект должен иметь аналогичную структуру с original
const parsed = parse(str);
console.log(inspect(parsed, false, 10));
