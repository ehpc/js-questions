class Foo {
  bar = 1;

  bla = () => console.log(this.bar);

  baz = function () { console.log(this.bar); };
}

new Foo().bla(); // Выведется 1
new Foo().baz(); // Выведется 1

/*

Согласно спецификации ECMAScript 15.2.4 Runtime Semantics: InstantiateOrdinaryFunctionObject
(https://tc39.es/ecma262/#sec-runtime-semantics-instantiateordinaryfunctionobject),
значение "this" в обычной функции определяется в момент вызова функции, а не в момент 
её создания. На это указывает пункт 3:
"Let F be OrdinaryFunctionCreate(..., FunctionBody, non-lexical-this, env, privateEnv)".
Как видим, указан "non-lexical-this". Детали вычисления "this" зависят от контекста
вызова функции и описаны в ECMAScript 13.3.6.2 (https://tc39.es/ecma262/#sec-evaluatecall).
Если функция вызывается как метод объекта, то "this" будет ссылаться на этот объект.
Если функция вызывается как обычная функция, то "this" будет ссылаться на глобальный объект
или будет undefined в строгом режиме.

Значение "this" при вызове стрелочной функции определяется согласно спецификации
ECMAScript 15.3.4 Runtime Semantics: InstantiateArrowFunctionExpression 
(https://tc39.es/ecma262/#sec-runtime-semantics-instantiatearrowfunctionexpression).
В частности, в пункте 5: Let closure be OrdinaryFunctionCreate(..., ConciseBody, lexical-this, env, privateEnv).
Видим, что указано "lexical-this".
Поэтому значение "this" в стрелочной функции определяется лексически, то есть
оно берётся из окружающего контекста, в котором функция была объявлена.

Описание понятия лексической среды можно найти в 9.1 Environment Records
(https://tc39.es/ecma262/#sec-environment-records).

 */
