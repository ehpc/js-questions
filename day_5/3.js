console.log(sort([7, 1, 4, 2, 9, 8])); // [7, day_1, day_2, day_4, 9, 8]

function sort(arr) {
  if (!arr || !Array.isArray(arr)) throw new Error('expect type Array as an argument');
  if (!arr.length) return [];

  const positions = [];
  const values = [];

  arr.forEach((el, i) => {
    if (el % 2 === 0) {
      positions.push(i);
      values.push(el);
    }
  });

  values.sort((a, b) => a - b);

  values.forEach((el, i) => {
    arr[positions[i]] = el;
  })

  return arr;
}