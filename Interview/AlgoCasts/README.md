## String Reversal

```js
// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'elppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

function reverse(str) {
  return str.split('').reduce((acum, char) => char + acum, '');
}

module.exports = reverse;

function reverse(str) {
  return str
    .split('')
    .reverse()
    .join('');
}

function reverse(str) {
  if (str === '') return '';
  return reverse(str.substring(1)) + str[0];
}

function reverse(str) {
  return reverseHelper(str, '');
}

function reverseHelper(str, acum) {
  if (str.length <= 0) return acum;
  return reverseHelper(str.substring(1), str[0] + acum);
}

function reverse(str) {
  let reversed = '';

  for (let char of str) {
    reversed = char + reversed;
  }

  return reversed;
}
```
--------

## Palindrome

```js
// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

function palindrome(str) {
  return str.split('').every((char, i) => char === str[str.length - i - 1]);
}

module.exports = palindrome;

function palindrome(str) {
  return (
    str
      .split('')
      .reverse()
      .join('') === str
  );
}

function palindrome(str) {
  return str.split('').every((char, i) => char === str[str.length - i - 1]);
}

```


------

## Reverse Int

```js
// --- Directions
// Given an integer, return an integer that is the reverse
// ordering of numbers.
// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9

function reverseInt(n) {
  const num = Math.abs(n);
  return Math.sign(n) * reverseHelper(num, 0);
}

function reverseHelper(n, result) {
  if (n === 0) return result;
  return reverseHelper(Math.floor(n / 10), result * 10 + n % 10);
}

module.exports = reverseInt;

function reverseInt(n) {
  return (
    parseInt(
      n
        .toString()
        .split('')
        .reverse()
        .join('')
    ) * Math.sign(n)
  );
}

function reverseInt(n) {
  let result = 0;
  let num = Math.abs(n);
  const sign = Math.sign(n);

  while (num > 0) {
    result = result * 10 + num % 10;
    num = Math.floor(num / 10);
  }

  return result * sign;
}
```


-----

## Max Chars

```js
// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  const memo = {};

  for (let char of str) {
    if (!memo[char]) {
      memo[char] = 1;
    } else {
      memo[char]++;
    }
  }

  let result = '';
  let most = 0;
  let secondWord = '';
  let secondMost = 0;

  for (let char in memo) {
    if (memo[char] > most) {
      result = char;
      most = memo[char];
    } else if (memo[char] > secondMost) {
      secondWord = char;
      secondMost = memo[char];
    }
  }

  console.log(secondWord);
  return result;
}

module.exports = maxChar;

```


-----


## FizzBuzz

```js
// --- Directions
// Write a program that console logs the numbers
// from 1 to n. But for multiples of three print
// “fizz” instead of the number and for the multiples
// of five print “buzz”. For numbers which are multiples
// of both three and five print “fizzbuzz”.
// --- Example
//   fizzBuzz(5);
//   1
//   2
//   fizz
//   4
//   buzz

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      console.log('fizzbuzz');
    } else if (i % 3 === 0) {
      console.log('fizz');
    } else if (i % 5 === 0) {
      console.log('buzz');
    } else {
      console.log(i);
    }
  }
}

module.exports = fizzBuzz;

```
-------

## Chunk

```js
// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

function chunk(array, size) {
  const result = [];
  let i = 0;

  while (i < array.length) {
    const subArray = array.slice(i, i + size);
    result.push(subArray);
    i = i + size;
  }

  return result;
}

module.exports = chunk;

function chunk(array, size) {
  const result = [];
  let i = 0;

  while (i < array.length) {
    const subArray = [];
    let j = 1;
    while (j <= size && i < array.length) {
      subArray.push(array[i]);
      i++;
      j++;
    }

    result.push(subArray);
  }

  return result;
}

```
-------

## Anagram

```js
// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

// O(nlog(n) + mlog(m))
//                    n      m
function anagrams(stringA, stringB) {
  return cleanString(stringA) === cleanString(stringB);
}

// O(klog(k))
//                    k
function cleanString(str) {
  return str
    .replace(/[^\w]/g, '')
    .toLowerCase()
    .split('')
    .sort()
    .join();
}

module.exports = anagrams;

// O(n + m)
//                   n      m
function anagrams(stringA, stringB) {
  const SPECIAL = ['!', '?', '.', ',', "'", '"', ' '];
  const hash = {};

  // O(n)
  for (let char of stringA) {
    if (!SPECIAL.includes(char)) {
      if (!hash[char]) {
        hash[char] = 1;
      } else {
        hash[char]++;
      }
    }
  }

  // O(m)
  for (let char of stringB) {
    if (!SPECIAL.includes(char)) {
      if (!hash[char] && hash[char] <= 0) {
        return false;
      }
      hash[char]--;
    }
  }

  // O(n)
  return Object.values(hash).every(n => n === 0);
}
```

------

## Capitalize

```js
// --- Directions
// Write a function that accepts a string.  The function should
// capitalize the first letter of each word in the string then
// return the capitalized string.
// --- Examples
//   capitalize('a short sentence') --> 'A Short Sentence'
//   capitalize('a lazy fox') --> 'A Lazy Fox'
//   capitalize('look, it is working!') --> 'Look, It Is Working!'

function capitalize(str) {
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === ' ') {
      result += str[i].toUpperCase();
    } else {
      result += str[i];
    }
  }

  return result;
}

module.exports = capitalize;

function capitalize(str) {
  const result = [];

  str.split(' ').forEach(word => {
    result.push(word[0].toUpperCase() + word.slice(1));
  });

  return result.join(' ');
}

```


------

## Print Steps (Stairs)

```js
// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

function steps(n, row = 0, stair = '') {
  if (n === row) {
    return;
  }

  if (n === stair.length) {
    console.log(stair);
    return steps(n, row + 1);
  }

  stair += stair.length <= row ? '#' : ' ';

  return steps(n, row, stair);
}

module.exports = steps;

function steps(n) {
  for (let i = 1; i <= n; i++) {
    let str = '';
    for (let j = 1; j <= n; j++) {
      if (j <= i) {
        str += '#';
      } else {
        str += ' ';
      }
    }

    console.log(str);
  }
}

```

-------

## Pyramind

```js
// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides
// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '
//       '#####'

function pyramid(n, row = 0, level = '') {
  if (row === n) {
    return;
  }

  if (level.length === 2 * n - 1) {
    console.log(level);
    return pyramid(n, row + 1);
  }

  const mid = Math.floor((2 * n - 1) / 2);
  const current = level.length;
  if (current >= mid - row && current <= mid + row) {
    level += '#';
  } else {
    level += ' ';
  }

  return pyramid(n, row, level);
}

module.exports = pyramid;

function pyramid(n) {
  const mid = Math.floor((2 * n - 1) / 2);

  for (let row = 0; row < n; row++) {
    let level = '';

    for (let column = 0; column < 2 * n - 1; column++) {
      if (column >= mid - row && column <= mid + row) {
        level += '#';
      } else {
        level += ' ';
      }
    }

    console.log(level);
  }
}
```


-----

## Find the Vowels

```js
// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
//   vowels('Hi There!') --> 3
//   vowels('Why do you ask?') --> 4
//   vowels('Why?') --> 0

function vowels(str) {
  const matches = str.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

module.exports = vowels;

function vowels(str) {
  let count = 0;
  const VOWELS = ['a', 'e', 'i', 'o', 'u'];
  for (let char of str.toLowerCase()) {
    if (VOWELS.includes(char)) {
      count++;
    }
  }

  return count;
}
```

-------

## Matrix Spiral

```js
// --- Directions
// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[1, 2],
//     [4, 3]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

function matrix(n) {
  const results = [];

  for (let i = 0; i < n; i++) {
    results.push([]);
  }

  let counter = 1;
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;

  while (startRow <= endColumn && startRow <= endRow) {
    // Top row
    for (let i = startColumn; i <= endColumn; i++) {
      results[startRow][i] = counter;
      counter++;
    }
    startRow++;

    // Right Column
    for (let i = startRow; i <= endRow; i++) {
      results[i][endColumn] = counter;
      counter++;
    }
    endColumn--;

    // Bottom row
    for (let i = endColumn; i >= startColumn; i--) {
      results[endRow][i] = counter;
      counter++;
    }
    endRow--;

    // Left Column
    for (let i = endRow; i >= startRow; i--) {
      results[i][startColumn] = counter;
      counter++;
    }
    startColumn++;
  }

  return results;
}

module.exports = matrix;
```

-------

## Fibonacci

```js
// --- Directions
// Print out the n-th entry in the fibonacci series.
// The fibonacci series is an ordering of numbers where
// each number is the sum of the preceeding two.
// For example, the sequence
//  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
// forms the first ten entries of the fibonacci series.
// Example:
//   fib(4) === 3

function memoize(fn) {
  const cache = {};

  return function(...args) {
    if (cache[args]) {
      return cache[args];
    }

    const result = fn.apply(this, args);
    cache[args] = result;
    return result;
  };
}

function slowFib(n) {
  // if (n === 0) return 0;
  // if (n === 1 || n === 2) return 1;
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const fib = memoize(slowFib);

module.exports = fib;

function fib(n) {
  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    const a = result[i - 1];
    const b = result[i - 2];

    result.push(a + b);
  }

  return result[n];
}

```

------

## Queue

```js
// --- Description
// Create a queue data structure.  The queue
// should be a class with methods 'add' and 'remove'.
// Adding to the queue should store an element until
// it is removed
// --- Examples
//     const q = new Queue();
//     q.add(1);
//     q.remove(); // returns 1;

class Queue {
  constructor() {
    this.data = [];
  }

  add(record) {
    this.data.unshift(record);
  }

  remove() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

module.exports = Queue;
```


## Weave

```js
// --- Directions
// 1) Complete the task in weave/queue.js
// 2) Implement the 'weave' function.  Weave
// receives two queues as arguments and combines the
// contents of each into a new, third queue.
// The third queue should contain the *alterating* content
// of the two queues.  The function should handle
// queues of different lengths without inserting
// 'undefined' into the new one.
// *Do not* access the array inside of any queue, only
// use the 'add', 'remove', and 'peek' functions.
// --- Example
//    const queueOne = new Queue();
//    queueOne.add(1);
//    queueOne.add(2);
//    const queueTwo = new Queue();
//    queueTwo.add('Hi');
//    queueTwo.add('There');
//    const q = weave(queueOne, queueTwo);
//    q.remove() // 1
//    q.remove() // 'Hi'
//    q.remove() // 2
//    q.remove() // 'There'

const Queue = require('./queue');

function weave(sourceOne, sourceTwo) {
  const q = new Queue();

  while (sourceOne.peek() || sourceTwo.peek()) {
    if (sourceOne.peek()) {
      q.add(sourceOne.remove());
    }

    if (sourceTwo.peek()) {
      q.add(sourceTwo.remove());
    }
  }

  return q;
}

module.exports = weave;
```


------

## Stack

```js
// --- Directions
// Create a stack data structure.  The stack
// should be a class with methods 'push', 'pop', and
// 'peek'.  Adding an element to the stack should
// store it until it is removed.
// --- Examples
//   const s = new Stack();
//   s.push(1);
//   s.push(2);
//   s.pop(); // returns 2
//   s.pop(); // returns 1

class Stack {
  constructor() {
    this.data = [];
  }

  push(record) {
    this.data.push(record);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

module.exports = Stack;

```

-----

## Queue from 2 Stacks

```js
// --- Directions
// Implement a Queue datastructure using two stacks.
// *Do not* create an array inside of the 'Queue' class.
// Queue should implement the methods 'add', 'remove', and 'peek'.
// For a reminder on what each method does, look back
// at the Queue exercise.
// --- Examples
//     const q = new Queue();
//     q.add(1);
//     q.add(2);
//     q.peek();  // returns 1
//     q.remove(); // returns 1
//     q.remove(); // returns 2

const Stack = require('./stack');

class Queue {
  constructor() {
    this.stackOne = new Stack();
    this.stackTwo = new Stack();
  }

  add(record) {
    this.stackOne.push(record);
  }

  remove() {
    if (this.stackTwo.peek()) {
      return this.stackTwo.pop();
    } else {
      this.queueify();
    }

    return this.stackTwo.pop();
  }

  peek() {
    if (this.stackTwo.peek()) {
      return this.stackTwo.peek();
    } else {
      this.queueify();
    }

    return this.stackTwo.peek();
  }

  queueify() {
    while (this.stackOne.peek()) {
      this.stackTwo.push(this.stackOne.pop());
    }
  }
}

module.exports = Queue;
```


----

## LinkedList

```js
// --- Directions
// Implement classes Node and Linked Lists
// See 'directions' document

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  size() {
    let current = this.head;
    let count = 0;

    while (current) {
      current = current.next;
      count++;
    }

    return count;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) return null;

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    return current;
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) return;

    // let temp = this.head;
    this.head = this.head.next;
    // temp = null;
  }

  removeLast() {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
      return;
    }

    let prev = this.head;
    let current = this.head.next;

    while (current.next) {
      prev = current;
      current = current.next;
    }

    prev.next = null;
  }

  insertLast(data) {
    let last = this.getLast();

    if (last) {
      last.next = new Node(data);
    } else {
      // the chain is empty
      this.insertFirst(data);
    }
  }

  getAt(n) {
    // if (!this.head) return null;

    let i = 0;
    let current = this.head;

    while (current && i <= n) {
      if (i === n) {
        return current;
      }

      i++;
      current = current.next;
    }

    return null;
  }

  removeAt(n) {
    if (!this.head) return;

    if (n === 0) {
      let temp = this.head;
      this.head = this.head.next;
      return;
    }

    let prev = this.getAt(n - 1);
    if (!prev || !prev.next) {
      return;
    }

    let temp = prev.next;
    prev.next = temp.next;
    temp = null;
  }

  insertAt(data, n) {
    if (n == 0 || !this.head) {
      this.insertFirst(data);
      return;
    }

    let prev = this.getAt(n - 1) || this.getLast();

    let newNode = new Node(data);
    newNode.next = prev.next;
    prev.next = newNode;
  }
}

module.exports = { Node, LinkedList };
```
