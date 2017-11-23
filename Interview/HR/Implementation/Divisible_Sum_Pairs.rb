# You are given an array of n integers, a0, a1, ... a_n-1
# , and a positive integer, k .
# Find and print the number of (i,j) pairs where i < j and a_i + a_j is divisible by k.


#!/bin/ruby

def divisibleSumPairs(n, k, ar)
  # Complete this function
  count = 0;
  (0...n-1).each do |i|
    (i+1...n).each do |j|
      count += 1 if (ar[i] + ar[j]) % k == 0
    end
  end

  count;
end

n, k = gets.strip.split(' ')
n = n.to_i
k = k.to_i
ar = gets.strip
ar = ar.split(' ').map(&:to_i)
result = divisibleSumPairs(n, k, ar)
puts result;
