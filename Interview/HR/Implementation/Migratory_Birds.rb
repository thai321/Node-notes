# A flock of n birds is flying across the continent. Each bird has a type, and the different types are designated by the ID numbers 1, 2, 3, 4, and 5.
#
# Given an array of n integers where each integer describes the type of a bird in the flock, find and print the type number of the most common bird. If two or more types of birds are equally common, choose the type with the smallest ID number.


#!/bin/ruby

def migratoryBirds(n, ar)
  # Complete this function
  hash = Hash.new(0)

  ar.each { |el| hash[el] += 1 }


  common = 0
  most_freq = hash[ar[0]]

  (1...n).each do |i|
    if hash[ar[i]] > most_freq
      most_freq = hash[ar[i]]
      common = i
    end
  end

  ar[common]
end

n = gets.strip.to_i
ar = gets.strip
ar = ar.split(' ').map(&:to_i)
result = migratoryBirds(n, ar)
puts result;
