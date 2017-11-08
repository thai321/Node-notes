## 03 Types  Equality

- What are the different types in javascript?
  - Boolean:  true/ false
  - Number: 1, 1.0
  - String: "a", 'a'
  - Null: null
  - Undefined:  undefined
  - Object: new Object()

```js
typeof(1) // "number"
typeof('a') // "string"
typeof(true) // "boolean"
typeof(undefined) // "undefined"
typeof(null) // "object"
typeof({}) // "object"

null == undefined // true
undefined == null // true
```

- What is they difference between == and ===?
  - == : Check for equality of the value
  - === : Check for both type as well as value equality

```js
0 === 0 // true
0 !== 1 // true
0 == 0 // true
0 != 1 // true

'' == '0' // 'false'
0 == '' // true
0 == '0' // true
0 === '' // false
0 === '0' // false

0 == '0' // true ---> String(0) == '0' // true

false == 'false' // true
String(false) // "false" --> "false" == 'false' // true

false == 'false' --> false == Boolean('false') --> false == true // false

```

- What is the type of NaN?
  - NaN stands for Not A Number

```js
typeof(NaN) // "number"

"abc"/4 // NaN

NaN == anything // always false
NaN == false // false
NaN == NaN // false

isNaN(NaN) // true
isNaN(1) // false
isNaN("1") // false
isNaN("A") // true --> Number("A") // NaN
isNaN() // true 

var a = NaN
a !== a // true

a = 1 // 1
a !== a // false

a = 'a' // "a"
a !== a // false
```

## Scopes
- What are the different scopes in javascript?

- Function scope
```js
function moo() {
  var foo = 1;
}
console.log(foo); // Uncaught ReferenceError: foo is not defined

function moo() {
  var foo = 1;
  console.log(foo);
}
moo(); // 1
```

- Block level scope
```js
for( var i = 0; i < 5; i++) {
  var j = 5;
}
console.log(j); // 5
```

- What is variable hoisting?
  - Functions and variables are hoisted to the top of the page. But not a variable equal to the function/ anay
```js
console.log(a); // undefined ---> no error
var a = 1;

// TRANSFORM INTO
var a;
console.log(a);
a = 1;
```

```js
function foo() {
  console.log(a); // undefined --> No Error
  var a = 1;
}
// TRANSFORM INTO
function foo() {
  var a;
  console.log(a);
  a = 1;
}
foo(); // undefined --> No Error


// ##########
foo();
var foo = function() {
  var a;
  console.log(a);
  a = 1;
}
// --> Uncaught TypeError: foo is not a function

// TRANSFORM INTO
var foo;

foo(); // foo is not a function --> can't call undefined

foo = function() {
  var a;
  console.log(a);
  a = 1;
}
```

- What is the scope chain?
  - Global scope:
  - Function scope: they can nest inside other function scope, and when it need to use an variable, it looks up --> it's called the scope chain. First, look to see if the variable exist in its own function scope, if it can't find it --> it will look inside its outer function scope, if it can't find it there --> it keeps going outer and outer until it reach to the global scope.

  
```js
function foo() {
  console.log(myvar);
}
function goo() {
  var myvar = 1;
  foo();
}
goo(); // Uncaught ReferenceError: myvar is not defined


function goo() {
  var myvar = 1;
  function foo() {
    console.log(myvar);
  }
  foo();
}
goo(); // 1
```