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
