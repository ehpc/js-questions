class LRUNode {
  next: LRUNode | null = null;
  prev: LRUNode | null = null;
  key: string;
  value: number;

  constructor (key: string, value: number) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  #size: number;
  #used: number = 0;
  #head: LRUNode | null = null;
  #tail: LRUNode | null = null;
  #nodeByKey: Map<string, LRUNode> = new Map();

  constructor(size: number) {
    this.#size = size;
  }

  #moveToHead(node: LRUNode) {
    if (this.#head === node) return;

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
      return;
    }

    if (node === this.#tail) this.#tail = node.prev;

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;

    node.prev = null;
    node.next = this.#head;
    this.#head.prev = node;
    this.#head = node;
  }

  set(key: string, value: number) {
    if (this.#nodeByKey.has(key)) {
      const node = this.#nodeByKey.get(key)!;
      node.value = value;
      this.#moveToHead(node);
    } else {
      const node = new LRUNode(key, value);
      this.#nodeByKey.set(key, node);
      this.#used += 1;
      this.#moveToHead(node);
    }

    if (this.#used > this.#size) {
      const tail = this.#tail;
      if (tail) {
        this.#tail = tail.prev;
        if (tail.prev) {
          tail.prev.next = null;
        } else {
          this.#head = null;
        }
        this.#nodeByKey.delete(tail.key);
        this.#used -= 1;
      }
    }
  }

  get(key: string): number | undefined {
    const node = this.#nodeByKey.get(key);
    if (!node) return;

    this.#moveToHead(node);

    return node.value;
  }

  has(key: string): boolean {
    return this.#nodeByKey.has(key);
  }
}


const cache = new LRUCache(3); // Размер кеша

cache.set('key1', 1);
cache.set('key2', 2);
cache.set('key3', 3);

console.log(cache.get('key1')); // 1

cache.set('key4', 4);

console.log(cache.has('key2')); // false
