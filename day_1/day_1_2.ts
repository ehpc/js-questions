class Parent {
  foo() {
    console.log('It works!');
  }
}

class Example extends Parent {}

// Your code starts here

function partial(target, obj) {
  const parentPrototype = Object.getPrototypeOf(target.prototype);
  Object.setPrototypeOf(obj, parentPrototype);
  Object.defineProperties(target.prototype, Object.getOwnPropertyDescriptors(obj))
}

/*
Важный нюанс! Super работает через [[HomeObject]] (10.2 ECMAScript Function Objects).
При этом изменить [[HomeObject]] мы не можем, и, соответственно, мы вынуждены менять
прототип именно у obj, а не его копии, например. Потому что, если бы мы решили сделать
копию obj, то при копировании в неё методов, [[HomeObject]] бы всё равно указывал на obj.

Детальнее: при объявлении метода, внутри которого используется ключевое слово
"super", у функции создаётся скрытый атрибут [[HomeObject]], который указывает
на объект, внутри которого объявлен метод. При этом, если мы скопируем
метод в другой объект, [[HomeObject]] продолжит указывать на тот же самый
объект. То есть поиск по цепочке прототипов будет происходить исходя из 
[[HomeObject]], который был зафиксирован на этапе создания функции, а не на 
этапе выполнения.
*/

// Your code ends here

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

// @ts-ignore
console.log(example.bar); // Случайное число
// @ts-ignore
console.log(example.bar); // Случайное число
// @ts-ignore
console.log(example.bar); // Случайное число