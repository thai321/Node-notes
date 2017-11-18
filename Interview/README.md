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

### Palindrome

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
