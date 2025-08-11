function getCentury(year: number): number {
  return Math.ceil(year / 100);
}

console.log(getCentury(1901)); // 20
console.log(getCentury(1900)); // 19