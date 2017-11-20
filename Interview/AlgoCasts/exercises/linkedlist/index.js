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
