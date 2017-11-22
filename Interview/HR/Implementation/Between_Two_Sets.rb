# Consider two sets of positive integers, A = {a0, a1,... a_n-1} and B = {b0, b1,... b_n-1} . We say that a positive integer, x, is between sets A  and B if the following conditions are satisfied:
# 1. All elements in A are factors of x.
# 2. x is a factor of all elements in B.

# Given A and B , find and print the number of integers (i.e., possible x's) that are between the two sets.

# Sample Input
#
# 2 3
# 2 4
# 16 32 96

# Sample Output
#
# 3

#!/bin/ruby

def getTotalX(a, b)
  # Complete this function
  a_max = a.min
  b_min = b.min

  arr = (a_max..b_min).select do |n|
    a_factor = a.all? { |x| n % x == 0 }
    b_factor = b.all? { |x| x % n == 0 }
    a_factor && b_factor
  end

  arr.length
end

n, m = gets.strip.split(' ')
n = n.to_i
m = m.to_i
a = gets.strip
a = a.split(' ').map(&:to_i)
b = gets.strip
b = b.split(' ').map(&:to_i)
total = getTotalX(a, b)
puts total
