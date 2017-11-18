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
