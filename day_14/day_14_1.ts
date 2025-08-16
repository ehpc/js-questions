function collapse(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  function recur(node: any, path: string = '') {
    if (node !== null && typeof node === 'object' && node.constructor === Object) {
      for (const prop of Object.getOwnPropertyNames(node)) {
        recur(node[prop], path ? `${path}.${prop}` : prop);
      }
    } else if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) {
        recur(node[i], path ? `${path}.${i}` : i.toString())
      }
    } else {
      result[path] = node;
    }
  }

  recur(obj);

  return result;
}

const obj = {
  a: {
    b: [1, 2],
    '': {c: 2}
  }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));

const complexObj = {
  a: {
    b: [1, {c: 3}, 2],
    '': {d: 4}
  }
};

// {'a.b.0': 1, 'a.b.1.c': 3, 'a.b.2': 2, 'a..d': 4}
console.log(collapse(complexObj));
