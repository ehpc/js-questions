var val = Promise.resolve(1);

var arr = [1, 2, 3];

for (var i = 0; i < arr.length; ++i) {
  (function(i) {
    val = val.then((val) => val + arr[i]);
  })(i)
}

val.then(console.log); // NaN

let o = 0
