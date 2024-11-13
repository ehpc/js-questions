"use strict"
class Foo {
    bar = 1;

    bla = () => console.log(this.bar);

    baz = function () { console.log(this.bar); };
}

new Foo().bla(); // day_1
new Foo().baz(); // undefined // why day_1 - I don't understand

/////////////////////////////////////////////

class Parent {
    foo() {
        console.log('It works!');
    }
}

class Example extends Parent {}

function partial(classObj, mixin) {
    // classObj.prototype // adding any fields or methods to class.prototype
    Object.setPrototypeOf(mixin, Object.getPrototypeOf(classObj.prototype)) // setting prototype to mixin obj
    Object.defineProperties(classObj.prototype, Object.getOwnPropertyDescriptors(mixin)) // define the properties from mixin to classObj
}

partial(Example, {
    foo() {
        super.foo();
        console.log('Yeaaah');
    },

    get bar() {
        return Math.random();
    }
});

const example = new Example();

example.foo(); // It works! Yeaaah

console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число

////////////////////////

const format = (template, data) => {
    return template.replace(/\${(.*?)}/g, (_, exportBlock) => {
        return Function(...Object.keys(data), `return ${exportBlock}`)(...Object.values(data));
    })
}


console.log(format('Hello ${name}! May age is ${age * day_2}.', {name: 'Bob', age: 12})); // 'Hello Bob! My age is 24.'


/////////////

function allSettled(iter) {
    const promises = [...iter].map((el) => Promise.resolve(el));

    const res = new Array(promises.length);

    let total = 0;

    return new Promise((resolve) => {
        promises.forEach((promise, i) => {
            promise
              .then((value) => {
                  res[i] = {
                      status: 'fulfilled',
                      value
                  }

                  total++;

                  if (total >= res.length) {
                      resolve(res);
                  }
              })
              .catch((reason) => {
                  res[i] = {
                      status: 'rejected',
                      reason
                  }

                  total++;

                  if (total >= res.length) {
                      resolve(res);
                  }
              })
        })
    })
}


allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
    console.log(v1); // {status: 'fulfilled', value: day_1}
    console.log(v2); // {status: 'fulfilled', value: day_2}
    console.log(v3); // {status: 'rejected', reason: 3}
});