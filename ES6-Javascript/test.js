// ------ Reduce ------

function unique(array) {
  return array.reduce((prev, num) => {
    return prev.find(n => n === num) ? prev : prev.push(num) && prev;
  }, []);
}

console.log(unique([1, 2, 3, 3, 4, 4]));

// ----- Template Strings ------

function getMessage() {
  const year = new Date().getFullYear();
  return `The year is ${year}`;
}
console.log(getMessage());

// ------ Enhanced Object Literals ------

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

function addNumbers(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log(addNumbers(1, 2, 3, 4, 5, 6, 7));

// ---- Rest and Spread -----

function validateShoppingList(...items) {
  if (items.indexOf('milk') < 0) {
    return ['milk', ...items];
  }

  return items;
}

console.log(validateShoppingList('oranges', 'bread', 'eggs'));
// [ 'milk', 'oranges', 'bread', 'eggs' ]

// New problem
const MathLibrary = {
  calculateProduct(...rest) {
    console.log('Please use the multiply metho instead');
    return this.multiply(...rest);
  },
  multiply(a, b) {
    return a * b;
  }
};

// ------ Destructing ------
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

// New Problem
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

// Practice
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

// double problem, recursion with Destructing
const numbers = [1, 2, 3];

function double([n, ...rest]) {
  return n ? [n * 2, ...double(rest)] : [];
}

console.log(double(numbers)); // [2, 4, 6]

// --- Generators ----

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
console.log(names);

// ---- Promises ------
/*
let promise = new Promise((resolve, reject) => {
  // resolve();
  reject();
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
*/

let promise = new Promise((resolve, reject) => {
  var request = new XHTMLRequest();

  // make request
  request.onload = () => {
    resolve();
  };
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

// Fetch

const url =
  'https://si-converter.herokuapp.com/units/si?units=hour/second*L*d/ha/t';
// const url = 'http://jsonplaceholder.typicode.com/posts';

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
