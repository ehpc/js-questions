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

console.log(log(tree)); // 1 2 3 4

// tree width traverse
function log(tree) {
  const queue = [tree];

  while (queue.length) {
    const head = queue.shift();
    console.log(head.value);

    head.children?.forEach((child) => queue.push(child));
  }
}