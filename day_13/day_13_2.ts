function findFirstBadCommit<T = string>(commits: T[], comparator: (T) => boolean): number {
  let left = 0;
  let right = commits.length - 1;
  let firstBadIndex = -1;
  while (left <= right) {
    const middle = Math.floor(left + (right - left) / 2);
    const isGood = comparator(commits[middle]);
    if (isGood) {
      left = middle + 1;
    } else {
      right = middle - 1;
      firstBadIndex = middle;
    }
  }
  return firstBadIndex;
}

const commits = ['good', 'good', 'good', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad'];

const test = (commit) => commit === 'good';

console.log(findFirstBadCommit(commits, test)); // 3
console.log(findFirstBadCommit(['good', 'good'], test)); // -1
console.log(findFirstBadCommit(['bad'], test)); // 0
