interface Tree {
  value: any;
  children?: Tree[];
}

function maxDepth(obj: Tree, rootPoints: 0 | 1 = 0): number {
  if (!obj.children || obj.children.length === 0) {
    return 1;
  }
  return rootPoints + Math.max(...obj.children.map((child) => maxDepth(child, 1)));
}

const obj: Tree = {
  value: 'foo',
  children: [
    {
      value: 'bar'
    },

    {
      value: 'bla',
      children: [{value: 'baz'}]
    }
  ]
};

console.log(maxDepth(obj)); // 2

export {};
