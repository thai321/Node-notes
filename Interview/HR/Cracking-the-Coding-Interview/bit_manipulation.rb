# Find unquie element in array

# Sample Input 0
#
# 1
# 1
# Sample Output 0
#
# 1
# Explanation 0
# The array only contains a single 1, so we print 1 as our answer.

# Sample Input 1
#
# 3
# 1 1 2
# Sample Output 1
#
# 2
# Explanation 1
# We have two 1's and one 2. We print 2, because that's the only unique element in the array.


# Sample Input 2
#
# 5
# 0 0 1 2 1
# Sample Output 2
#
# 2
# Explanation 2
# We have two 0's, two 1's, and one 2. We print 2, because that's the only unique element in the array.


#!/bin/ruby

n = gets.strip.to_i
a = gets.strip
a = a.split(' ').map(&:to_i)

result = 0

a.each { |num| result ^= num }

puts result
