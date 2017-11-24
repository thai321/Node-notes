#!/bin/ruby

a = gets.strip
b = gets.strip

hash = Hash.new(0)

a.split('').each do |letter|
  hash[letter] += 1
end

count = 0
b.split('').each do |letter|
  if hash[letter] && hash[letter] > 0
    count += 2
    hash[letter] -= 1
  end
end

result = (a.length + b.length) - count
puts result
