interface Tree {
  value: number;
  children?: Tree[];
}

function bfs(tree: Tree): number[] {
  const queue: Tree[] = [tree];
  const result: number[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node.value);
    if (!node.children) continue;
    for (const child of node.children) {
      queue.push(child);
    }
  }
  return result;
}

const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{value: 4}]
    },
    {
      value: 3
    }
  ]
};

console.log(bfs(tree)); // 1 2 3 4