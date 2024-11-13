const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // undefined


class Queue {
  head = {value: undefined, next: null};

  push(value) {

  }
}