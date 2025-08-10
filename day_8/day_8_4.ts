class QueueItem {
  value: number;
  next: QueueItem | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

class Queue {
  #head: QueueItem | null = null;
  #tail: QueueItem | null = null;
  
  push(value: number) {
    const newItem = new QueueItem(value);
    if (this.#tail) {
      this.#tail.next = newItem;
      this.#tail = newItem;
    } else {
      this.#head = newItem;
      this.#tail = newItem;
    }
  }

  pop(): number | undefined {
    if (this.#head) {
      const item = this.#head;
      this.#head = item.next;
      if (!this.#head) this.#tail = null;
      return item.value;
    }
  }
}

const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
console.log(queue.pop()); // undefined