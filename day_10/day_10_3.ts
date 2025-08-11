interface Tree<T> {
  value: T;
  children?: Tree<T>[];
}

function iterate<T = number>(tree: Tree<T>): Iterator<T> {
  const queue: Tree<T>[] = [];
  queue.push(tree);
  return {
    next() {
      const currentNode = queue.shift();
      if (!currentNode) return { value: undefined, done: true };

      if (currentNode.children?.length) {
        queue.push(...currentNode?.children);
      }
      return { value: currentNode.value, done: false }
    }
  };
}

const i = iterate({
  value: 1,
  children: [{value: 2}, {value: 3, children: [{value: 4}]}]
});

console.log(i.next()); // {value: 1, done: false}
console.log(i.next()); // {value: 2, done: false}
console.log(i.next()); // {value: 3, done: false}
console.log(i.next()); // {value: 4, done: false}
console.log(i.next()); // {value: undefined, done: true}

export {};