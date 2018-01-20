### Array Helper Methods

* `forEach`
* `map`
* `filter`
* `find`
* `every`
* `some`
* `reduce`

---

### forEach

```js
// ES5
var colors = ['red', 'blue', 'green'];
for( var i = 0; i < colors.length ; i++) {
  console.log(colors[i]);
}

colors.forEach(function(color) {
  console.log(color);
})


// Create an array of numbers
var numbers [1,2,3,4,5];

// Create a variable to hold the sum
var sum = 0;

function adder(number) {
  sum += number;
}

// Loop over the array, incrementing the sum variable
numbers.forEach(adder)

// print the sum variable
console.log(sum);
```

---

### map

```js
var numbers = [1, 2, 3];
var doubledNumbers = [];

for (var i = 0; i < numbers.length; i++) {
  doubledNumbers.push(numbers[i] * 2);
}

var doubled = numbers.map(function(number) {
  return number * 2;
});

doubled;
doubledNumbers;

var cars = [
  { model: 'Buick', price: 'CHEAP' },
  { model: 'Camaro', price: 'expensive' }
];

var prices = cars.map(function(car) {
  return car.price;
});

prices;
```

---

### filter

```js
var products = [
  { name: 'cucumber', type: 'vagetable' },
  { name: 'banana', type: 'fruit' },
  { name: 'celery', type: 'vagetable' },
  { name: 'orange', type: 'fruit' }
];

var filteredProducts = [];

for (var i = 0; i < products.length; i++) {
  if (products[i].type === 'fruit') {
    filteredProducts.push(products[i]);
  }
}

filteredProducts;

products.filter(function(product) {
  return product.type === 'fruit';
});
```

```js
var products = [
  { name: 'cucumber', type: 'vagetable', quantity: 0, price: 1 },
  { name: 'banana', type: 'fruit', quantity: 10, price: 15 },
  { name: 'celery', type: 'vagetable', quantity: 30, price: 13 },
  { name: 'orange', type: 'fruit', quantity: 3, price: 5 }
];

// Type is 'vegetable', quantity is greater than 0, price is less than 10

products.filter(function(product) {
  return (
    product.type === 'vegetable' && product.quantity > 0 && product.price < 10
  );
});
```

```js
var post = { id: 4, title: 'New Post' };
var comments = [
  { postId: 4, content: 'awesome post' },
  { postId: 3, content: 'it was ok' },
  { postId: 4, content: 'neat' }
];

function commentsForPost(post, comments) {
  return comments.filter(function(comment) {
    return comment.postId === post.id;
  });
}

commentsForPost(post, comments);
```

---

### find

```js
var users = [
  { name: 'Jill' },
  { name: 'Alex', id: 4 },
  { name: 'Bill' },
  { name: 'Alex' }
];
var user;

for (var i = 0; i < users.length; i++) {
  if (users[i].name === 'Alex') {
    user = users[i];
    break;
  }
}

users.find(function(user) {
  return user.name === 'Alex';
}); // { name: 'Alex', id: 4 }
```

```js
function Car(model) {
  this.model = model;
}

var cars = [new Car('Buick'), new Car('Camaro'), new Car('Focus')];

cars.find(function(car) {
  return car.model === 'Focus';
});
```

```js
var posts = [{ id: 1, title: 'New Post' }, { id: 2, title: 'Old Post' }];

var comment = { postId: 1, content: 'Great Post' };

function postForcomment(posts, comment) {
  return posts.find(function(post) {
    return post.id === comment.postId;
  });
}

postForcomment(posts, comment); // { id: 1, title: 'New Post' },
```

```js
/*
var ladders = [
  { id: 1, height: 20 },
  { id: 3, height: 25 }
];

findWhere(ladders, { height: 25 }); // result: { id:3, height: 25 }
*/

function findWhere(array, criteria) {
  const key = Object.keys(criteria);
  return array.find(ladder => ladder[key] === criteria[key]);
}
```

---

### every and some

```js
computers = [
  { name: 'Apple', ram: 24 },
  { name: 'Compaq', ram: 4 },
  { name: 'Acer', ram: 32 }
];

var allComputersCanRunProgram = true;
var onlySomeComputersCanRunProgram = false;

for(var i = 0; i < computers.length; i++) {
  var computer computers[i];

  if(computer.ram < 16) {
    allComputersCanRunProgram = false;
  } else {
    onlySomeComputersCanRunProgram = true;
  }
}


allComputersCanRunProgram;
onlySomeComputersCanRunProgram;


computers.every(function(computer) {
  return computer.ram > 16;
});

computers.some(function(computer) {
  return computer.ram > 16;
});
```

```js
var names = ['Alexandria', 'Matthew', 'Joe'];

names.every(function(name) {
  return name.lengthh > 4;
}); // False

names.some(function(name) {
  return name.length > 4;
}); // True
```

```js
function Field(value) {
  this.value = value;
}

Field.prototype.validate = function() {
  return this.value.length > 0;
};

var username = newField('2cool');
var password = new Field('my_password');
var birthdate = new Field('10/10/2010');

// username.validate() && password.validate();

var fields = [usename, password, birthdate];

var formIsValid = fields.every(function(field) {
  return field.validate();
});

if (formIsValid) {
  // allow user to submit!
} else {
  // show an error
}
```

---

### reduce

```js
var numbers = [10, 20, 30];
var sum = 0;

for (var i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

numbers.reduce(function(sum, number) {
  return sum + number;
}, 0);
```

```js
var primaryColors = [{ color: 'red' }, { color: 'yellow' }, { color: 'blue' }];

primaryColors.reduce(function(previous, color) {
  previous.push(color);
  return previous;
}, []);
```

```js
// interview question: bracket balance

'()()()()';
'(((())))';

function balanvedParens(string) {
  return !string.split('').reduce(function(previous, char) {
    if (previous < 0) return previous; // ")("

    previous += char === '(' ? 1 : -1;
    return previous;
  }, 0);
}

balancedParens('((((');
```

```js
// Another really hard one!  Write a function called 'unique' that will remove all the duplicate values from an array.
//
// For example, given the following array:
// var numbers = [1, 1, 2, 3, 4, 4];
// Your function should return
// [1, 2, 3, 4]
// Hint: Use the 'reduce' and 'find' helpers.

function unique(array) {
  return array.reduce((prev, num) => {
    return prev.find(n => n === num) ? prev : prev.push(num) && prev;
  }, []);
}
```

---

### const and let

```js
// var name = 'Jane';
// var title = 'Software Engineer';
// var hourlyWage = 40;

// ES6
const name = 'Jane'; // never change
let title = 'Software Engineer'; // could change
let hourlyWage = 40; // could change

// some time later ...
title = 'Senior Software Engineer';
hourlyWage = 45;
```

---

### Template Strings

```js
function getMessage() {
  const year = new Date().getFullYear();
  return `The year is ${year}`;
}
getMessage();
```

---

### Arrow function

```js
const team = {
  members: ['Jane', 'Bill'],
  teamName: 'Super Squad',
  teamSummary: function() {
    return this.members.map(function(member) {
      return `${member} is on team ${this.teamName}`;
    }); // TypeError: Cannot read property 'teamName'
  }

  // Fix 1:
  teamSummary: function() {
    return this.members.map(function(member) {
      return `${member} is on team ${this.teamName}`;
    }.bind(this));
  }

  // Fix 2:
  teamSummary: function() {
    return this.members.map(member => {
      return `${member} is on team ${this.teamName}`;
    });
  }

};

team.teamSummary()
```

```js
// Finbonacci
const fibnacci = n => (n < 3 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
```

---

### Enhanced Object Literals

```js
// ES5
function createBookShop(inventory) {
  return {
    inventory: inventory,
    inventoryValue: function() {
      return this.inventory.reduce((total, book) => total + book.price, 0);
    },
    priceForTitle: function(title) {
      return this.inventory.find(book => book.title === title).price;
    }
  };
}

const inventory = [
  { title: 'Harry Potter', price: 10 },
  { title: 'Eloquent Javascript', price: 15 }
];

const bookShop = createBookShop(inventory);

console.log(bookShop.inventoryValue());
console.log(bookShop.priceForTitle('Harry Potter'));

// ES6

function createBookShop2(inventory) {
  return {
    inventory,
    inventoryValue() {
      return this.inventory.reduce((total, book) => total + book.price, 0);
    },
    priceForTitle(title) {
      return this.inventory.find(book => book.title === title).price;
    }
  };
}

const bookShop2 = createBookShop2(inventory);

console.log(bookShop2.inventoryValue());
console.log(bookShop2.priceForTitle('Harry Potter'));
```

---

### Rest and Spread

```js
function addNumbers(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

addNumbers(1, 2, 3, 4, 5, 6, 7);
```

```js
const defaultColors = ['red', 'green'];
const userFavoriteColors = ['orange', 'yellow'];

['blue', ...defaultColors, ...userFavoriteColors];
// ['blue', 'red', 'green', orange', 'yellow']
```

```js
function validateShoppingList(...items) {
  if (items.indexOf('milk') < 0) {
    return ['milk', ...items];
  }

  return items;
}

validateShoppingList('oranges', 'bread', 'eggs');
```

```js
const MathLibrary = {
  calculateProduct(...rest) {
    console.log('Please use the multiply metho instead');
    return this.multiply(...rest);
  },
  multiply(a, b) {
    return a * b;
  }
};
```

```js
function unshift(array, ...letters) {
  return [...letters, ...array];
}
```

---

### Destructing

```js
var expense = {
  type: 'Business',
  amount: '$45 USD'
};

var type = expense.type;
var amount = expense.amount;

// ES6
const { type, amount } = expense;
```

```js
var savedFiled = {
  extension: '.jpg',
  name: 'repost',
  size: 14040
};

function fileSummary({ name, extension, size }, { color }) {
  return `${color}, The file ${name}.${extension} is of size ${size}`;
}

console.log(fileSummary(savedFiled, { color: 'blue' }));
// blue, The file repost..jpg is of size 14040
```

```js
const companies = ['Google', 'Facebook', 'Uber'];

const [name, name2, ...rest] = companies;
const firstCompany = companies[0]; // 'Google'

name; // 'Google'
name2; // 'Facebok'
rest; // ['Uber']
```

```js
const companies = [
  { name: 'Google', location: 'Mountain View' },
  { name: 'Facebook', location: 'Menlo Park' },
  { name: 'Uber', location: 'San Francisco' }
];

const [{ location }] = companies;
location; // 'Mountain View'
```

```js
const Google = {
  locations: ['Mountain View', 'New York', 'London'];
};

const { locations: [ location ] } = Google;
location; // 'Mountain View'
```

```js
function signup({ email, password, city, dateOfBirth, username }) {
  // create new user
}

const user = {
  username: 'myname',
  password: 'mypassword',
  email: 'myemail@example.com',
  dateOfBirth: '1/1/1990',
  city: 'New York'
};
```

```js
const points = [[4, 5], [10, 1], [0, 40]];

points.map(([x, y]) => {
  return { x, y };
});
// [ {x: 4, y: 5},
//   {x: 10, y: 1},
//   {x: 0, y: 40}
// ]
```

* **Practice**

```js
const classes = [
  ['Chemistry', '9AM', 'Mr. Darnick'],
  ['Physics', '10:15AM', 'Mrs. Lithun'],
  ['Math', '11:30AM', 'Mrs. Vitalis']
];

const classesAsObject = classes.map(([subject, time, teacher]) => ({
  subject,
  time,
  teacher
}));

console.log(classesAsObject);
```

* Practice

```js
const numbers = [1, 2, 3];

function double([n, ...rest]) {
  return n ? [n * 2, ...double(rest)] : [];
}

double(numbers); // [2, 4, 6]
```

---

### Class

#### ES5

```js
function Car(options) {
  this.title = options.title;
}

Car.prototype.drive = function() {
  return 'vroom';
};

const car = new Car({ title: 'Focus' });
car.drive();
car; // 'Focus'

function Toyota(options) {
  Car.call(this.options);
  this.color = options.color;
}

Toyota.prototype = Object.create(Car.prototype);
Toyota.prototype.constructor = Toyota;

Toyota.prototype.honk = function() {
  return 'beep';
};

const toyota = new Toyota({ color: 'red', title: 'Daily Drive' });
toyata;
toyata.drive(); // 'vroom'
toyata.honk(); // 'beep'
```

#### ES6

```js
class Car {
  constructor(options) {
    this.title = options.title;
  }

  drive() {
    return 'vroom';
  }
}

class Toyota extends Car {
  constructor(options) {
    super(options);
    this.color = options.color;
  }

  honk() {
    return 'beep';
  }
}

const toyota = new Toyota({ color: 'red', title: 'Daily Drive' });
toyota.honk();
```

---

### Generators

```js
const colors = ['red', 'green', 'blue'];

for (let color of colors) {
  console.log(color);
}
```

```js
function* shopping() {
  // stuff on the sidewalk

  // walking down the side walk

  // go into the store with cash
  const stuffFromStore = yield 'cash';
  //walking to laundry place
  const cleanClothes = yield 'laundry';

  // walking back home
  return [stuffFromStore, cleanClothes];
}

const gen = shopping();
gen.next(); // leaving our house, {"value": "cash", "done": false}
// walked into the store
// waling up and down the aisles...
// purchase our stuff

gen.next('groceries'); // leaving the store with groceries, {"value": "groceries", "done": false}

gen.next('clean clothes'); // {"value": ["groceries", "clean clothes"], "done": true}
```

```js
function* colors() {
  yield 'red';
  yield 'blue';
  yield 'green';
}

const gen = colors();
gen.next();
gen.next();
gen.next();
gen.next();

const myColors = [];
for (let color of colors()) {
  myColors.push(color);
}
myColors; // ['red', 'blue', 'green']
```

```js
const testingTeam = {
  lead: 'Amanda',
  tester: 'Bill',
  [Symbol.iterator]: function*() {
    yield this.lead;
    yield this.tester;
  }
};

const engineeringTeam = {
  testingTeam,
  size: 3,
  department: 'Engineering',
  lead: 'Jill',
  manager: 'Alex',
  engineer: 'Dave',
  [Symbol.iterator]: function*() {
    yield this.lead;
    yield this.manager;
    yield this.engineer;
    yield* this.testingTeam;
  }
};

const names = [];
for (let name of engineeringTeam) {
  names.push(name);
}
names; // ["Jill", "Alex", "Dave", "Amanda", "Bill"]
```

```js
class Comment {
  constructor(content, children) {
    this.content = content;
    this.children = children;
  }

  *[Symbol.iterator]() {
    yield this.content;
    for (let child of this.children) {
      yield* child;
    }
  }
}

const children = [
  new Comment('good comment', []),
  new Comment('bad comment', []),
  new Comment('meh', [])
];

const tree = new Comment('Great post!', children);

const values = [];
for (let value of tree) {
  values.push(value);
}
values; // ["Great post!", "good comment", "bad comment", "meh"]
```

---

### Promises and Fetch

```js
let promise = new Promise((resolve, reject) => {
  resolve();
  // reject();
});

promise
  .then(() => {
    console.log('Finally finished!');
  })
  .then(() => {
    console.log('I was also ran');
  })
  .then(() => {
    console.log('something new');
  })
  .catch(() => {
    console.log('uh oh!!!');
  });
```

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 3000);
});

promise
  .then(() => {
    console.log('Finally finished!');
  })
  .then(() => {
    console.log('I was also ran');
  })
  .then(() => {
    console.log('something new');
  })
  .catch(() => {
    console.log('uh oh!!!');
  });
```

#### fetch

```js
// Fetch

const url =
  'https://si-converter.herokuapp.com/units/si?units=hour/second*L*d/ha/t';
// const url = 'http://jsonplaceholder.typicode.com/posts';

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

```js
const url = 'http://not-existed-url';

fetch(url)
  .then(response => response.json())
  .catch(error => console.log('BAD', error));
```
