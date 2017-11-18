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

// function reverse(str) {
//   return str
//     .split('')
//     .reverse()
//     .join('');
// }
//
// function reverse(str) {
//   if (str === '') return '';
//   return reverse(str.substring(1)) + str[0];
// }
//
// function reverse(str) {
//   return reverseHelper(str, '');
// }
//
// function reverseHelper(str, acum) {
//   if (str.length <= 0) return acum;
//   return reverseHelper(str.substring(1), str[0] + acum);
// }
//
// function reverse(str) {
//   let reversed = '';
//
//   for (let char of str) {
//     reversed = char + reversed;
//   }
//
//   return reversed;
// }
