function unique(arr) {
  return [...new Set(arr).values()].join(',');
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

// console.log( unique(values) ); // Hare,Krishna,:-O

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function aclean(arr) {
  const map = new Map();

  arr.toReversed().forEach((el) => {
      const sortedElement = el
        .toLowerCase()
        .split('')
        .sort()
        .join('');

      map.set(sortedElement, el);
    }
  );

  return [...map.values()].join(',');
}

console.log(aclean(arr)); // "nap,teachers,ear" или "PAN,cheaters,era"