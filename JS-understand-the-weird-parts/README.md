### Lexical Enviroment

* Where something sits physically in the code you write
* "Lexical" means 'having to do with words or grammar'. A lexical environment exists in programming languages in which **where** you write something is important.

### Execution Context

* A wrapper to help mangage the code that is running
* There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

### Name/Value Pair:

* A name which maps to a unique value.
* The name may be defined more than once, but only can have one value in any given **context**.
* That value may be more name/value pairs.

### Object:

* A collection of name value pairs
* The smiples definition when talking about Javascript.
* Ex:

```js
Address:
{
  Street: 'Main',
  Number: 100,
  Apartment: {
    Floor: 3,
    Number: 301
  }
}
```

---

### The Global Enviroment and the Global Object

* Whenever your code is run, the JS engine creates **Global Object** (window) and special variable calls **this**
* Global "Not Inside a fuction"

---

### First Class functions:

* Everyting you can do with other types you can do with functions.
* Assign them to variables, pass them around, create them on the fly.

* Function (a special type of object)'s properties: Primtive, Object, Function, Name (optional, can be anonymous), Code ("Invocable" --> () )

Ex:

* Name: `greet`
* Code: `console.log('hi')` <-- Invocable

```js
function greet() {
  console.log('hi');
}

greet.language = 'English';
console.log(greet);
// function greet() { console.log('hi')}

console.log(greet.language); // "English"
```

---

### Callback function:

* A function you hgive to antoher function, to be run when the other function is finished
* So the function you call (i.e. invoke), "calls back" by calling the function you gave it when it finishes.

---

### Call, Apply, Bind

```js
var person = {
  firstname: 'John',
  lastname: 'Doe',
  getFullName: function() {
    var fullname = this.firstname + ' ' + this.lastname;
    return fullname;
  }
};

var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
};

logName(); // error cause "this" is global

// ----- Fix -----
var logPersonName = logName.bind(person);
logPersonName(); // Logged: John Doe

// Or
var logName = function(lang1, lang2) {
  console.log('Logged: ' + this.getFullName());
}.bind(person);

// call, apply
logName.call(person, 'en', 'es');
logName
  .apply(person, ['en', 'es'])(function(lang1, lang2) {
    console.log('Logged: ' + this.getFullName());
  })
  .apply(person, ['en', 'es']);

// function borrowing
var person2 = {
  firstname: 'Jane',
  lastname: 'Doe'
};

console.log(person.getFullName.apply(person2));

// function currying
function mutiply(a, b) {
  return a * b;
}

var multipleByTwo = multiply.bind(this, 2);
console.log(multipleByTwo(4)); // 8

var multipleByTwo = multiply.bind(this, 2, 3);
console.log(multipleByTwo(4)); // 6

var multipleByTwo = multiply.bind(this);
console.log(multipleByTwo(4, 5)); // 20
```

---

### Function Currying:

* Creating a copy of a function but with some preset parameters
* Very useful in mathematical situations

---

### Prototype

```js
var person = {
  firstname: 'Default',
  lastname: 'Default',
  getFullName: function() {
    return this.firstname + ' ' + this.lastname;
  }
};

var john = {
  firstname: 'John',
  lastname: 'Doe'
};

// don't do this EVER! for demo purposes only!!!
john.__proto__ = person;
console.log(john.getFullName()); // John Doe
console.log(john.firstname); // John

var jane = {
  firstname: 'Jane'
};

jane.__proto__ = person;
console.log(jane.getFullName()); // Jane Default cause jane doesn't have a last name
```

---

### Reflection

* An Object can look at itself, listing and changing its properties and methods

---

### Object create

```js
var person = {
  firstname: 'Default',
  lastname: 'Default',
  greet: function() {
    return 'Hi ' + this.firstname;
  }
};

var john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);
```

---

### extends

```js
class InformalPerson extends Person {
  constructor(firstname, lastname) {
    super(firstname, lastname);
  }

  great() {
    return 'Yo ' + firstname;
  }
}
```

---

### typeof, instanceof

```js
var a = 3;
console.log(typeof a); // number

var b = 'hello';
console.log(typeof b); // string

var c = {};
console.log(typeof c); // object

var d = [];
console.log(typeof d); // object --> weird!
console.log(Object.Prototype.toString.call(d)); // better [object Array]

var e = new Person('Jane');
console.log(typeof e); // object
console.log(e instanceof Person); // true

console.log(typeof undefined); // undefined
console.log(typeof null); // object --> bug

var z = function() {};
console.log(typeof z); // function
```
