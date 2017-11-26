
## Has Path With Given Sum

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


## Is Tree Symmetric

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
---------

## Find Profession

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

## kth Smallest In BST

```js
//
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
        if (--k == 0)
            result = t.value;
        k = findK(t.right, k);
        return k;
    }

    findK(t, k);
    return result;

}

```

---------

## Is Sub Tree

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
-----------

## Restore Binary Tree

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

def restoreBinaryTree(inorder, preorder)
    return nil if inorder.length == 0

    tree = Tree.new(preorder.shift)
    pivot = inorder.index(tree.value)

    tree.left = restoreBinaryTree(inorder[0...pivot], preorder)
    tree.right = restoreBinaryTree(inorder[pivot..-1], preorder)

    return tree
end

```



--------


## New Road System

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
