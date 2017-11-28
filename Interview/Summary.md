## Graph

- Implementation
```ruby
class Vertex
  attr_accessor :in_edges, :out_edges, :value

  def initialize(value)
    @value = value
    @in_edges = []
    @out_edges = []
    @visited = false
  end

  def visited?
    @visited
  end

  def visited!
    @visited = true
  end

  def delete_in_edge(edge)
    @in_edges.each_index do |idx|
      if @in_edges[idx] == edge
        @in_edges.delete_at(idx)
        break;
      end
    end
  end

  def delete_out_edge(edge)
    @out_edges.each_index do |idx|
      if @out_edges[idx] == edge
        @out_edges.delete_at(idx)
        break;
      end
    end
  end

class Edge
  attr_reader :source, :destination, :cost

  def initialize(source, destination, cost = 1)
    @source = source
    @destination = destination
    @cost = cost
    @source.out_edges << self
    @destination.in_edges << self
  end

  def destroy!
    @source.delete_out_edge(edge)
    @destination.delete_in_edge(edge)
    @source = nil
    @destination = nil
  end
end
```

```js
class Vertex {
  constructor(value) {
    this.value = value;
    this.inEdges = [];
    this.outEdges = [];
    this.visited = false;
  }

  visit() {
    this.visited = true
  }

  deleteOutEdge(outEdge) {
    for(let i = 0; i < this.outEdges.length; i++) {
      if (this.outEdges[i] === outEdge) {
        this.outEdges.splice(i, 1);
        break;
      }
    }
  }

  deleteInEdge(inEdge) {
    for(let i = 0; i < this.inEdges.length; i++) {
      if (this.inEdges[i] === inEdge) {
        this.inEdges.splice(i, 1);
        break;
      }
    }
  }
}

class Edge {
  constructor(fromVertex, toVertex, cost) {
    this.fromVertex = fromVertex;
    this.toVertex = toVertex;
    this.cost = this.cost || 1;
    fromVertex.outEdges.push(this);
    toVertex.inEdges.push(this);
  }

  destroy() {
    this.toVertex.deleteInEdge(this);
    this.fromVerte.deleteOutEdge(this);
    this.toVertex = undefined;
    this.fromVertex = undefined;
  }
}

function breadthFirstSearch(vertex, target) {
  let queue = [vertex];

  while(queue.length > 0) {
    let node = queue.shift();
    node.setVisit();
    if(node.value === target) {
      return node;
    } else {
      node.outEdges.forEach( edge => {
        let neighborVertex = edge.toVertex
        if (!neighborVertex.visited) {
          queue.push(neighborVertex);
        }
      })
    }
  }

  return null;
}


function depthFirstSearch(vertex, target) {
  if (vertex.value === target) {
    return vertex;
  } else {
    for(let i = 0; i < vertex.outEdges.length; i++) {
      let neighborVertex = vertex.outEdges[i].toVertex;
      let searchResult = depthFirstSearch(neighborVertex, target);
      if (serachResult === target) {
        return vertex;
      }
    }
  }

  return null;
}

// There are times when we need an iterative version of DFS.
// For Example, when we try to traverse two simultaneously,
// it's wise to use 2 stacks and fire DFS on them simultaneously.

function interativeDFS(root, target) {
  let stack = [root];
  while(stack.length > 0) {
    let currentNode = stack.pop();
    if(currentNode.value === target) {
      return currentNode;
    } else {
      let childrent = currentNode.children;
      for(let i = children.length -1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
}
```


-------

## Breadth First Search and Depth First Search (Tree & Graph)

### Implementation (Tree)
- Breadth first Search requires a queue. The first step is to insert the root into the queue and start
the while loop. While the queue is not empty, pop the element off (i.e. shift) from beginning of the queue and examine its value. Then push its children neighbors into the queue.

- DFS. The search begins at the root and then traverse down to its children.
When leaf node is reached, there is no children, the recursive step will terminate.
It will return early once target is found.

### Memory Management
- BFS:
  - Space complexity: **O(N)**. Because at the leaves -> if we have N items stored in the balanced tree ~ then there will be **N/2** leave nodes
  - So we have to store **O(N)** items if we want to traverse a tree that contains N items!!!
- DFS:
  - Here we have to backtrack (pop item from stack): so basically we just have to store as many items n the stack as the height of the tree -> which is **log(N)**!!!
  - ~ so the memory complexity will be O(logN)
- That's why depth-first search is preferred most of the times. There may be some situations where BFS is better ~ artificial intelligence, robot movements

```ruby
def bfs(root, target)
  queue = [root]
  until queue.empty?
    node = queue.shift
    return node if node.value == target

    node.children.each do |child|
      queue << child
    end
  end
  nil
end
```

### Implementation (graph)

```ruby
def bfs(node, target)
  queue = [node]

  until queue.empty?
    probe = queue.shift
    probe.visit!
    return probe if probe.value == target

    probe.out_edges.each do |edge|
      queue << edge.to_vertex if edge.to_vertex.visited?
    end
  end
  nil
end
```

## Tree Traversal
- There are three types depth-frist of tree Traversal
  - Pre-order, In-order, Post-order
- While breadth-first traversal is just level order (using a queue)
- Using a binary search tree as example, the traersal can be described as
  - Pre-order => [root][left][right]
  - In-order => [left][root][right]
  - Post-order => [left][right][root]

```ruby
def BinarySearchTree.preorder!(node)
  return [] if node.nil?
  arr = [node.value]
  arr += BinarySearchTree.preorder!(node.left)
  arr += BinarySearchTree.preorder!(node.right)
  arr
end

def BinarySearchTree.inorder!(node)
  return [] if node.nil?
  arr = []
  arr += BinarySearchTree.inorder!(node.left)
  arr << node.value
  arr += BinarySearchTree.inorder!(node.right)
  arr
end

def BinarySearchTree.postorder!(node)
  return [] if node.nil?
  arr = []
  arr += BinarySearchTree.postorder!(node.left)
  arr += BinarySearchTree.postorder!(node.right)
  arr << node.value
  arr
end
```


--------

## Topilogical Sort

```ruby
# Implementing topological sort using both Khan's and Tarian's algorithms

def topological_sort(vertices)
  result = []

  queue = vertices.select { |vertex| vertex.in_edges.empty? }

  until queue.empty?
    current = queue.shift
    result << current

    current.out_edges.dup.each do |edge|
      queue << edge.to_vertex if edge.to_vertex.in_edges.length == 1
      edge.destroy!
    end
  end

  return (result.length == vertices.length) ? result : []
end
```

```ruby
# Given an Array of tuples, where tuple[0] represents a package id,
# and tuple[1] represents its dependency, determine the order in which
# the packages should be installed. Only packages that have dependencies
# will be listed, but all packages from 1..max_id exist.

# N.B. this is how `npm` works.

# Import any files you need to
require_relative "graph"
require_relative "topological_sort"


def install_order(arr)
  max_id = 0
  order = {}

  arr.each do |tuple|
    if order[tuple[0]].nil?
      order[tuple[0]] = Vertex.new(tuple[0])
    end
    if order[tuple[1]].nil?
      order[tuple[1]] = Vertex.new(tuple[1])
    end

    Edge.new(order[tuple[1]], order[tuple[0]])
    max_id = tuple.max if tuple.max > max_id
  end

  indepencies = (1..max_id).select { |id| order[id].nil? }

  topological_sort(order.values).map { |v| v.value } + indepencies
end
```

------

## Graph Representation
- Adjacency List and Adjacency matrix

### Density:
- Density: 2|E|/(|V| |V| - 1)

-------

## Connected Component
- Vertices v and w are connected if there is apth between
### Properties
- There relation "is connected to" is an equivalence relation:
  - Reflexsive: v is connected to v
  - Symmetric: if v is connected to w, then w is connected to v
  - Transitive: is v connected to w and w connected x , then v is connected to x

- A connected component is a maximal set of connected vertices

- The goal is to partition a set of vertices into connected component, we will achieve this in linear time by iterating through all the vertices contained in a graph.


#### Approach

1) Initialize all vertices as unmarked
2) For each unmarked vertex v, run DFS to identity all vertices discovered as part of the same component
3) Create a hash map, using vertex as the key, and assign an ID number as value, then mark the vertex as visited
4) ID number begins at 1, it should stay at 1 for the whole DFS search.
5) Upon completion of the first DFS search, ID should increment.
6) Iterate to next vertex, if it's visited, skip. Once we find an unvisited node, we fire DFS again but now ID = 2.

```ruby
class ConnectedComponent
  def initialize(graph)
    @components = Hash.new
    @graph = graph
    mapConnectecdComponents
  end

  def mapConnectecdComponents
    id = 1
    @graph.vertices.each do |vertex|
      if !vertex.visited?
        dfs(vertex, id)
        id += 1
      end
    end
    @count = id
  end

  def count
    @count
  end

  def dfs(vertex, id)
    @components[vertex] = id
    vertex.visit!
    vertex.out_edges.each do |edge|
      dfs(edge.to_vertex, id)
    end
  end
end
```


-------------

### Interview Problems
#### Routes Between Nodes
- Routes Between Nodes(CTCI): Given a directed graph, design an algorithm to find out whether there is a route between two nodes

```ruby
def is_there_route?(source, dest)
  dfs(source, dest) == dest
end

def dfs(node, target)
  node.visit!
  return node if node == target

  node.out_edges.each do |edge|
    neighbor_vertex = edge.to_vertex
    search_result = dfs(neighborVertex, target)
    return neighbor_vertex if !search_result.nil?
  end
end

```

--------
#### Deep Copy
- **Deep Copy** of a Graph: Given a node, and this node contains other nodes, they together form a graph. Write a function to deep copy this node and everything inside it.
```
Example 1
A contains B and C. B & C contain nothing
A.nodes = [B, C]
B.nodes = []
C.nodes = []

Example 2
A contains itself
A.nodes = [A]

Example 3
Cyclic Graph
A.nodes = [B]
B.nodes = [C]
C.nodes = [A]

Example 4 => What is the time complexity of your algorithm, given this example?
D.nodes = [E, F, D, E, E, E, E, F]
E.nodes = [G, H]
F.nodes = []
G.nodes = []
H.nodes = []
```

```ruby
# N = numver of nodes
# M = sum of the sizes of all node lists
# Time: O(N + M)
# Space: O(N) + O(M)

class Node
  def initialize
    @nodes = []
  end

  def depCopy(dup_record = Hash.new)
    new_node = Node.new
    dup_record[self] = new_node

    self.nodes.each do |node|
      # It's already been copied, so use the copied version
      if dup_record[node]
        new_node.nodes << dup_record[node]
      else
        # It hasn't been copied, so make a copy
        new_node.nodes << node.deepCopy(dup_record)
      end
    end

    new_node
  end
end
```

-----

 #### Valid BST


```js
// --- Directions
// Given a node, validate the binary search tree,
// ensuring that every node's left hand child is
// less than the parent node's value, and that
// every node's right hand child is greater than
// the parent

function validate(node, min = null, max = null) {
  if (max !== null && node.data > max) {
    return false;
  }

  if (min !== null && node.data < min) {
    return false;
  }

  if (node.left && !validate(node.left, min, node.data)) {
    return false;
  }

  if (node.right && !validate(node.right, node.data, max)) {
    return false;
  }

  return true;
}

module.exports = validate;
```
------

#### Has Path With Given Sum

- Given a binary tree t and an integer s,
- determine whether there is a root to leaf path in t such that the sum of vertex values equals s.


```ruby
#
# Definition for binary tree:
# class Tree
#   attr_accessor :value, :left, :right
#   def initialize(val)
#     @value = val
#     @left = nil
#     @right = nil
# end
def hasPathWithGivenSum(t, s)
  return s == 0 if t.nil?

  if t.left.nil? && t.right.nil? # leaf node
      return t.value == s
  end

  return true if t.left && hasPathWithGivenSum(t.left, s - t.value)
  return true if t.right && hasPathWithGivenSum(t.right, s - t.value)

  return false;
end
```
-------

#### Is Tree Symmetric

```ruby
#
# Definition for binary tree:
# class Tree
#   attr_accessor :value, :left, :right
#   def initialize(val)
#     @value = val
#     @left = nil
#     @right = nil
# end

def isTreeSymmetric(t)
  return true if t.nil?
  return helper(t.left, t.right)
end

def helper(t1, t2)
  return true if t1.nil? && t2.nil?

  return false if t1.nil? || t2.nil?

  return false if t1.value != t2.value

  return helper(t1.left, t2.right) && helper(t1.right, t2.left)
end
```
------

### Find Profession


```ruby
# Consider a special family of Engineers and Doctors. This family has the following rules:
#
# Everybody has two children.
# The first child of an Engineer is an Engineer and the second child is a Doctor.
# The first child of a Doctor is a Doctor and the second child is an Engineer.
# All generations of Doctors and Engineers start with an Engineer.
# We can represent the situation using this diagram:
#
#              E
#         /         \
#        E           D
#      /   \        /  \
#     E     D      D    E
#    / \   / \    / \   / \
#   E   D D   E  D   E E   D
# Given the level and position of a person in the ancestor tree above, find the profession of the person.
# Note: in this tree first child is considered as left child, second - as right.
#
# Example
#
# For level = 3 and pos = 3, the output should be
# findProfession(level, pos) = "Doctor".

def findProfession(level, pos)
  return "Engineer" if level == 1

  if findProfession(level - 1, (pos+1)/2) == "Doctor"
      return pos%2 == 0 ? "Engineer" : "Doctor"
  end

  return pos%2 == 0 ? "Doctor" : "Engineer"
end
```
------

### kth Smallest In BST

```js
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function kthSmallestInBST(t, k) {
  var result;

  function findK(t, k) {
    if (t == null)
      return k;

    k = findK(t.left, k);
    if (--k == 0) {
      result = t.value;
    }

    k = findK(t.right, k);
    return k;
  }

  findK(t, k);
  return result;

}
```
------

#### Is Sub Tree
```ruby
# Definition for binary tree:
# class Tree
#   attr_accessor :value, :left, :right
#   def initialize(val)
#     @value = val
#     @left = nil
#     @right = nil
# end

def isSubtree(t1, t2)
  if t1.nil?
    if t2.nil?
      return true
    else
      return false
    end
  end

  if equalTrees(t1, t2)
    return true
  else
    return isSubtree(t1.left, t2) || isSubtree(t1.right, t2)
  end
end

def equalTrees(t1, t2)
  if t1.nil? && t2.nil?
    return true
  end

  if !t1.nil? && !t2.nil?
    if t1.value == t2.value
     return equalTrees(t1.left, t2.left) && equalTrees(t1.right, t2.right)
    end
  end

  # value is not the same
  # one of them is nil, but other the other
  return false;
end
```
------

#### Restore Binary Tree

```ruby
# Definition for binary tree:
# class Tree
#   attr_accessor :value, :left, :right
#   def initialize(val)
#     @value = val
#     @left = nil
#     @right = nil
# end

def restoreBinaryTree(inorder, preorder)
  return nil if inorder.length == 0

  tree = Tree.new(preorder.shift)
  pivot = inorder.index(tree.value)

  tree.left = restoreBinaryTree(inorder[0...pivot], preorder)
  tree.right = restoreBinaryTree(inorder[pivot..-1], preorder)

  return tree
end

```
------

### Level Width Tree

```js
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
```


-------

#### Tree Level Order Print

```python
Given a binary tree of integers, print it in level order. The output
will contain space between the numbers in the same level, and new

line between different levels. For example, if the tree is:
           6
1 --- 3 ---5
      2 ---4

http://nbviewer.jupyter.org/github/jmportilla/Python-for-Algorithms--Data-Structures--and-Interviews/blob/master/Trees/Trees%20Interview%20Problems/tree_print.png


The output should be:

1
2 3
4 5 6
import collections

class Node:
  def __init__(self, val=None):
    self.left = None
    self.right = None
    self.val =  val

    import collections

d = collections.deque([1,2,3]) # can append, popLeft,...
d.append([4])
d.popleft()
d.pop()
print d



def levelOrderPrint(tree): # O(n), n is number of nodes

  if not tree:
    return

  nodes = collections.deque([tree])

  currentCount = 1
  nextCount = 0

  while len(nodes) != 0:

    currentNode = nodes.popleft()
    currentCount -= 1

    print currentNode.val,

    if currentNode.left:
      nodes.append(currentNode.left)
      nextCount += 1

    if currentNode.right:
      nodes.append(currentNode.right)
      nextCount += 1

    if currentCount == 0:
      print '\n'
      currentCount, nextCount = nextCount, currentCount

one = Node(1)
two = Node(2)
three = Node(3)
four = Node(4)
five = Node(5)
six = Node(6)

one.left = two
two.left = four
one.right = three
three.left = five
three.right = six

levelOrderPrint(one)
# 1
#
# 2 3
#
# 4 5 6
```

-------

#### Trim a Binary Search Tree

- Given the root of a binary search tree and 2 numbers min and max, trim the tree such that all the numbers in the new tree are between min and max (inclusive). The resulting tree should still be a valid binary search tree. So, if we get this tree as input:


```python
def trimBST(tree,minVal,maxVal):

  if not tree:
    return

  tree.left = trimBST(tree.left, minVal, maxVal)
  tree.right = trimBST(tree.right, minVal, maxVal)

  if minVal <= tree.val <= maxVal:
    return tree

  if tree.val < minVal:
    return tree.right

  if tree.val > maxVal:
    return tree.left


# Use tree.left , tree.right , and tree.val as your methods to call
```

----

#### New Road System

```ruby
def newRoadSystem(roadRegister)
  n = roadRegister.length
  c = [0]*n

  (0...n).each do |i|
    (0...n).each do |j|
      if roadRegister[i][j]
        c[i] += 1
        c[j] -= 1
      end
    end
  end

  c.all? { |el| el == 0 }
end
```


------

### DFS Connected Cell

```ruby
# Sample Input
#
# 4
# 4
# 1 1 0 0
# 0 1 1 0
# 0 0 1 0
# 1 0 0 0
# Sample Output
#
# 5

# Explanation
#
# The diagram below depicts two regions of the matrix; for each region, the component cells forming the region are marked with an X:
#
# X X 0 0     1 1 0 0
# 0 X X 0     0 1 1 0
# 0 0 X 0     0 0 1 0
# 1 0 0 0     X 0 0 0
# The first region has five cells and the second region has one cell. Because we want to print the number of cells in the largest region of the matrix, we print .

#!/bin/ruby

n = gets.strip.to_i
m = gets.strip.to_i
grid = Array.new(n)
for grid_i in (0..n-1)
    grid_t = gets.strip
    grid[grid_i] = grid_t.split(' ').map(&:to_i)
end

def dfs(row, column, n, m, grid)
  if row < 0 || row >= n || column < 0 || column >= m
    return 0
  end

  if grid[row][column] != 1
    return 0
  end

  count = 1
  grid[row][column] = -1
  (row-1..row+1).each do |x|
    (column-1..column+1).each do |y|
      count += dfs(x,y, n, m, grid)
    end
  end

  return count
end

def solve(n, m, grid)
  max_cells = 0

  (0...n).each do |row|
    (0...m).each do |column|
      if (grid[row][column] == 1)
        cells = dfs(row, column, m, n, grid)
        if(cells > max_cells)
          max_cells = cells
        end
      end
    end
  end

  max_cells
end
puts solve(n, m, grid)

```



------

## Heap

```ruby
class BinaryMinHeap
  attr_reader :store, :prc

  def initialize(&prc)
    @prc ||= Proc.new { |x,y| x <=> y }
    @store = []
  end

  def count
    @store.length
  end

  def extract
    @store[0], @store[count - 1] = @store[count - 1], @store[0]
    result = @store.pop
    BinaryMinHeap.heapify_down(@store, 0, &@prc)
    result
  end

  def peek
    @store[0]
  end

  def push(val)
    @store.push(val)
    BinaryMinHeap.heapify_up(@store, count - 1, &@prc)
  end

  public
  def self.child_indices(len, parent_index)
    left_index = 2*parent_index + 1
    right_index = 2*parent_index + 2
    [left_index, right_index].select { |n| n < len }
  end

  def self.parent_index(child_index)
    raise "root has no parent" if child_index == 0
    (child_index - 1) / 2
  end

  def self.heapify_down(array, parent_idx, len = array.length, &prc)
    prc ||= Proc.new { |x,y| x <=> y}
    parent = array[parent_idx]

    children_idxs = child_indices(len, parent_idx)
    children = children_idxs.map { |idx| array[idx] }

    return array if children.all? { |el| prc.call(parent, el) <=0 }

    smaller_child_idx = children_idxs[0] # left children index

    if children_idxs.length == 2 && prc.call(children[0], children[1]) > - 1
      smaller_child_idx = children_idxs[1] # right children index
    end

    array[smaller_child_idx], array[parent_idx] = parent, array[smaller_child_idx]

    heapify_down(array, smaller_child_idx, len, &prc)
  end

  def self.heapify_up(array, child_idx, len = array.length, &prc)
    return array if child_idx == 0

    prc ||= Proc.new { |a, b| a <=> b }
    child = array[child_idx]
    parent_idx = parent_index(child_idx)
    parent = array[parent_idx]

    if prc.call(child, parent) < 0
      array[parent_idx], array[child_idx] = child, parent
      heapify_up(array, parent_idx, len, &prc)
    else
      return array
    end
  end
end
```


- Heap Sort

```ruby

class Array
  def heap_sort!
    heap = BinaryMinHeap.new
    self.each { |num| heap.push(num) }
    (0...length).each { |i| self[i] = heap.extract }
  end
end

```


- K Largest Element

```ruby
require_relative 'heap'

def k_largest_elements(array, k)
  heap = BinaryMinHeap.new
  new_array = array.dup
  new_array.each { |num| heap.push(num) }
  (0...new_array.length).each { |i| new_array[i] = heap.extract }

  new_array[-k..-1]
end

```


-------

## Hash Map

```ruby
require_relative 'p02_hashing'
require_relative 'p04_linked_list'

class HashMap
  include Enumerable
  attr_reader :count, :store

  def initialize(num_buckets = 8)
    @store = Array.new(num_buckets) { LinkedList.new }
    @count = 0
  end

  def include?(key)
    bucket(key).include?(key)
  end

  def set(key, val)
    if include?(key)
      bucket(key).update(key, val)
    else
      resize! if @count == num_buckets
      bucket(key).append(key, val)
      @count += 1
    end
  end

  def get(key)
    bucket(key).get(key)
  end

  def delete(key)
    bucket(key).remove(key)
    @count -= 1
  end

  def each
    @store.each do |bucket|
      bucket.each do |node|
        yield [node.key, node.val]
      end
    end
  end

  # uncomment when you have Enumerable included
  # def to_s
  #   pairs = inject([]) do |strs, (k, v)|
  #     strs << "#{k.to_s} => #{v.to_s}"
  #   end
  #   "{\n" + pairs.join(",\n") + "\n}"
  # end

  alias_method :[], :get
  alias_method :[]=, :set

  private

  def num_buckets
    @store.length
  end

  def resize!
    new_hash_map = HashMap.new(num_buckets * 2)

    each do |key, val|
      new_hash_map.set(key, val)
    end

    @store = new_hash_map.store
  end

  def bucket(key)
    # optional but useful; return the bucket corresponding to `key`
    @store[key.hash % num_buckets]
  end
end
```
