import { EventEmitter } from 'events';

const ee = new EventEmitter();

function stream(eventEmitter: EventEmitter, event: string): AsyncIterableIterator<any> {
  let resolver: Function | null;
  let queue: any[] = [];

  eventEmitter.on(event, (data) => {
    if (resolver) {
      resolver({ value: data, done: false });
      resolver = null;
    } else {
      queue.push(data);
    }
  });

  return {
    [Symbol.asyncIterator]() {
      return this;
    },

    next() {
      if (queue.length) return Promise.resolve({ value: queue.shift(), done: false });
      return new Promise((resolve) => {
        resolver = resolve;
      });
    }
  };
}

(async () => {
  for await (const e of stream(ee, 'foo')) {
    console.log(e); // 1 2 3
  }
})();

ee.emit('foo', 1);
ee.emit('foo', 2);
ee.emit('foo', 3);

// Generator version

const ee2 = new EventEmitter();

async function *streamGen(eventEmitter: EventEmitter, event: string): AsyncIterableIterator<any> {
  const queue: any[] = [];
  let resolver: Function | null;

  eventEmitter.on(event, (data) => {
    if (resolver) {
      resolver(data);
      resolver = null;
    } else {
      queue.push(data);
    }
  });

  while (true) {
    while (queue.length) {
      yield queue.shift();
    }
    yield new Promise(resolve => resolver = resolve);
  }
}

(async () => {
  for await (const e of streamGen(ee2, 'foo')) {
    console.log(e); // 11 21 31
  }
})();

ee2.emit('foo', 11);
ee2.emit('foo', 21);
ee2.emit('foo', 31);

export {};
