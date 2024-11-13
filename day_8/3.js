const original = {
  myDate: new Date(),
  mySet: new Set([1, 2, 3]),
  myMap: new Map([
    [new Date(), {a: 1}]
  ])
};

const str = serialize(original);

// ÐÐ±ÑÐµÐºÑ Ð´Ð¾Ð»Ð¶ÐµÐ½ Ð¸Ð¼ÐµÑÑ Ð°Ð½Ð°Ð»Ð¾Ð³Ð¸ÑÐ½ÑÑ ÑÑÑÑÐºÑÑÑÑ Ñ original
parse(str);

function serialize(obj) {
  const toJSON = Date.prototype.toJSON;
  delete Date.prototype.toJSON;

  try {
    return JSON.stringify(obj, (key, value) => {
      if (value instanceof Date) {
        return `[[DATA]]:Date;${value.valueOf()}`;
      }

      if (value instanceof Set || value instanceof Set) {
        return `[[DATA]]:${value.constructor.name};${serialize([...value])}`;
      }

      return value;
    })
  } finally {
    Object.defineProperty(Date.prototype, 'toJSON', {
      configurable: true,
      enumerable: false,
      writable: true,
      value: toJSON,
    })
  }
}

function parse(str) {
  return JSON.parse(str, (key, value) => {
    if (typeof value === 'string' && value.startsWith('[[DATA]]')) {
      const [_, type, data] = /^\[\[DATA]]:(.*?);(.*)/.exec(value);

      return Function('data', `return new ${type}(data)`)(parse(data));
    }

    return value;
  });
}