console.log(diff([1, 2, 3, 4, 5], [3, 4, 1])); // [2, 5]

function diff(firstArray, secondArray) {
  const set = new Set(secondArray);

  return firstArray.filter((el) => !set.has(el));
}