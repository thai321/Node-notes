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
