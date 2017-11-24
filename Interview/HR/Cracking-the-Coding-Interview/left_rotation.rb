# A left rotation operation on an array of size n shifts each of the array's elements 1 unit to the left. For example, if left rotations are performed on array [1, 2, 3, 4, 5], then the array would become [3, 4, 5, 1, 2].
#
# Given an array of n integers and a number, d, perform d left rotations on the array. Then print the updated array as a single line of space-separated integers.


#!/bin/ruby

n,k = gets.strip.split(' ')
n = n.to_i
k = k.to_i
a = gets.strip
a = a.split(' ').map(&:to_i)

print (a[k..-1] + a[0...k]).join(' ')
