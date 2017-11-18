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
