# Lily has a chocolate bar consisting of a row of n squares where each square has an integer written on it. She wants to share it with Ron for his birthday, which falls on month m and day d . Lily wants to give Ron a piece of chocolate only if it contains m consecutive squares whose integers sum to d.
#
# Given m, d, and the sequence of integers written on each square of Lily's chocolate bar, how many different ways can Lily break off a piece of chocolate to give to Ron?
#
# For example, if m = 2, d = 2  and the chocolate bar contains n rows of squares with the integers [1, 2, 1, 3, 2] written on them from left to right, the following diagram shows 2 ways to break off a piece:



#!/bin/ruby

# O(n)
def solve(n, s, d, m)
  # Complete this function
  records = s;

  (1...n).each do |i|
    records[i] += records[i-1]
  end

  numberOfWays = (m <= n && records[m - 1] == d) ? 1 : 0;

  (m...n).each do |i|
    if records[i] - records[i - m] == d
      numberOfWays += 1
    end
  end

  numberOfWays

end

n = gets.strip.to_i
s = gets.strip
s = s.split(' ').map(&:to_i)
d, m = gets.strip.split(' ')
d = d.to_i
m = m.to_i
result = solve(n, s, d, m)
puts result;
