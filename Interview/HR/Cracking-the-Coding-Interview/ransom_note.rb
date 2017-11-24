# Sample Input 0
#
# 6 4
# give me one grand today night
# give one grand today
# Sample Output 0
#
# Yes


# Sample Input 1
#
# 6 5
# two times three is not four
# two times two is four
# Sample Output 1
#
# No

# Explanation 1
# two should occurs 2 times magazine




#!/bin/ruby

m,n = gets.strip.split(' ')
m = m.to_i
n = n.to_i
magazine = gets.strip
magazine = magazine.split(' ')
ransom = gets.strip
ransom = ransom.split(' ')

magazine_hash = Hash.new(0)
magazine.each { |word| magazine_hash[word] += 1}

ransom.each do |word|
  if magazine_hash[word] > 0
    magazine_hash[word] -= 1
  else
    puts "No"
    return
  end
end

puts "Yes"
return
