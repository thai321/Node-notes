#!/bin/ruby

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
