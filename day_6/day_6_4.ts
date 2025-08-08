function waterfall(fns: Iterable<Function>, resultFn: Function) {
  const iter = fns[Symbol.iterator]();
  function next(forwardedArgs: any[]) {
    const { value: fn, done } = iter.next();
    if (done) {
      return resultFn(null, ...forwardedArgs);
    }
    fn(...forwardedArgs, (err, ...args) => {
      if (err) {
        return resultFn(err);
      }
      next(args);
    });
  }
  next([]);
}

waterfall([
  (cb) => {
    cb(null, 'one', 'two');
  },
  
  (arg1, arg2, cb) => {
    console.log(arg1); // one
    console.log(arg2); // two
    cb(null, 'three');
  },
  
  (arg1, cb) => {
    console.log(arg1); // three
    cb(null, 'done');
  }
], (err, result) => {
  console.log(result); // done
});

waterfall(new Set([
  (cb) => {
    cb('ha-ha!');
  },
  
  (arg1, cb) => {
    cb(null, 'done');
  }
]), (err, result) => {
  console.log(err);    // ha-ha!
  console.log(result); // undefined
});

waterfall([
  (cb) => {
    setTimeout(() => cb(null, 'one', 'two'), 10);
  },
  
  (arg1, arg2, cb) => {
    setTimeout(() => {
      console.log(arg1); // one
      console.log(arg2); // two
      cb(null, 'three');
    }, 20);
  },
  
  (arg1, cb) => {
    setTimeout(() => {
      console.log(arg1); // three
      cb(null, 'done');
    }, 30);
  }
], (err, result) => {
  console.log(result); // done
});
