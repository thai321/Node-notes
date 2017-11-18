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
//                    n      m
// function anagrams(stringA, stringB) {
//   const SPECIAL = ['!', '?', '.', ',', "'", '"', ' '];
//   const hash = {};
//
//   // O(n)
//   for (let char of stringA) {
//     if (!SPECIAL.includes(char)) {
//       if (!hash[char]) {
//         hash[char] = 1;
//       } else {
//         hash[char]++;
//       }
//     }
//   }
//
//   // O(m)
//   for (let char of stringB) {
//     if (!SPECIAL.includes(char)) {
//       if (!hash[char] && hash[char] <= 0) {
//         return false;
//       }
//       hash[char]--;
//     }
//   }
//
//   // O(n)
//   return Object.values(hash).every(n => n === 0);
// }
