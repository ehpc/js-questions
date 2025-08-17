type Comparator<T> = (a: T, b: T) => number;

class OrderedQueue<T> {
  #comparator: Comparator<T>
  /*
    Examples:
    Max heap as complete binary tree:
            9      level 0
         /    \
        5      7   level 1
       / \    /
      3   1  4     level 2
    As an array:
     Root Left1 Right1 Left1.L Left1.R Right1.L
    [ 9    5     7       3       1       4    ]
     0 1 2 3 4 5
    [9 5 7 3 1 4]
  */
  #heap: T[]

  constructor(comparator: (a: T, b: T) => number) {
    this.#comparator = comparator;
    this.#heap = [];
  }

  push(element: T) {
    let index = this.#heap.length;
    this.#heap.push(element);
    while (index !== 0) {
      const parentIndex = this.#heapGetParentIndex(index);
      if (this.#comparator(this.#heap[parentIndex], element) < 0) {
        [this.#heap[index], this.#heap[parentIndex]] = [this.#heap[parentIndex], this.#heap[index]];
        index = parentIndex;
      } else break;
    }
  }

  pop(): T | undefined {
    if (!this.#heap.length) return undefined;
    
    const result = this.#heap[0];
    const last = this.#heap.pop()!;
    const size = this.#heap.length;
    if (size > 0) {
      this.#heap[0] = last
      let index = 0;
      while (index < size) {
        const leftIndex = this.#heapGetLeftIndex(index);
        const rightIndex = this.#heapGetRightIndex(index);
        if (leftIndex >= size) break;
        let swapIndex = leftIndex;
        if (rightIndex < size && this.#comparator(this.#heap[leftIndex], this.#heap[rightIndex]) < 0) {
          swapIndex = rightIndex;
        }
        if (this.#comparator(this.#heap[index], this.#heap[swapIndex]) < 0) {
          [this.#heap[index], this.#heap[swapIndex]] = [this.#heap[swapIndex], this.#heap[index]];
          index = swapIndex;
        } else break;
      }
    }
    
    return result;
  }

  #heapGetLeftIndex(index: number) {
    return 2 * index + 1;
  }

  #heapGetRightIndex(index: number) {
    return 2 * index + 2;
  }

  #heapGetParentIndex(index: number) {
    return (index - 1) >> 1;
  }
}

const queue = new OrderedQueue<number>((a, b) => a - b);

queue.push(1);
console.log(queue.pop()); // 1
queue.push(1);
queue.push(5);
queue.push(2);
queue.push(-1);
queue.push(5);
queue.push(2);
queue.push(-1);
queue.push(5);

console.log(queue.pop());  // 5
console.log(queue.pop());  // 5

console.log(queue.pop());  // 5
console.log(queue.pop());  // 2
console.log(queue.pop());  // 2

export {};
