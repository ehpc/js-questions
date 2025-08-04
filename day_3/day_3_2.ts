interface MySetImmediateStorage {
  lastId: number,
  activeIds: Set<number>,
}

const mySetImmediateStorage: MySetImmediateStorage = {
  lastId: 0,
  activeIds: new Set<number>(),
};

function mySetImmediate(cb: Function): number {
  const id = mySetImmediateStorage.lastId + 1;
  mySetImmediateStorage.activeIds.add(id);
  mySetImmediateStorage.lastId += 1;
  queueMicrotask(() => {
    if (mySetImmediateStorage.activeIds.has(id)) {
      cb();
    }
  });
  return id;
}

function myClearImmediate(id: number) {
  mySetImmediateStorage.activeIds.delete(id);
}


setTimeout(() => {
  console.log(3);
}, 0);

mySetImmediate(() => {
  console.log(1);
});

const timer = mySetImmediate(() => {
  console.log(2);
});

myClearImmediate(timer);

// 1 3

