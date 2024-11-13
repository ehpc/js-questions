const obj = {
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

console.log(maxDepth(obj)); // day_2

function maxDepth(root) {
  let max = 0;

  function calculateMaxDepth(root, currentDepth = 0) {
    root?.children?.forEach((node) => {
      const depth = calculateMaxDepth(node, currentDepth + 1);

      if (depth > max) {
        max = depth;
      }
    });

    return currentDepth;
  }

  calculateMaxDepth(root, 0);

  return max;
}