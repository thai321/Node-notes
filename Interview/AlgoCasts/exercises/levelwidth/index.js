// --- Directions
// Given the root node of a tree, return
// an array where each element is the width
// of the tree at each level.
// --- Example
// Given:
//     0
//   / |  \
// 1   2   3
// |       |
// 4       5
// Answer: [1, 3, 2]

function levelWidth(root) {
  const queue = [root, 's'];
  const counter = [0];

  while (queue.length > 1) {
    const node = queue.shift();

    if (node === 's') {
      queue.push('s');
      counter.push(0);
    } else {
      counter[counter.length - 1]++;
      queue.push(...node.children);
    }
  }

  return counter;
}

module.exports = levelWidth;
