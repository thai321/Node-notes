# There are two kangaroos on a number line ready to jump in the positive direction (i.e, toward positive infinity). The first kangaroo starts at location x1 and moves at a rate of v1 meters per jump. The second kangaroo starts at location x2 and moves at a rate of v2 meters per jump. Given the starting locations and movement rates for each kangaroo, can you determine if they'll ever land at the same location at the same time?
#
# Input Format
#
# A single line of four space-separated integers denoting the respective values of x1, v1 , x2 ,and v2 .


# Output Format
#
# Print YES if they can land on the same location at the same time; otherwise, print NO.
#
# Note: The two kangaroos must land at the same location after making the same number of jumps.

#
# Sample Input 0
#
# 0 3 4 2

# Sample Output 0
#
# YES


# Explanation 0

# The two kangaroos jump through the following sequence of locations:
# 1. 0 -> 3 -> 6 -> 9  -> 12
# 2. 4 -> 6 -> 8 -> 10 -> 12

# Thus, the kangaroos meet after 4 jumps and we print YES.


#!/bin/ruby

def kangaroo(x1, v1, x2, v2)
  # Complete this function
  (x1 - x2) % (v1 - v2) === 0 ? 'YES' : 'NO'
end

x1, v1, x2, v2 = gets.strip.split(' ')
x1 = x1.to_i
v1 = v1.to_i
x2 = x2.to_i
v2 = v2.to_i
result = kangaroo(x1, v1, x2, v2)
puts result;
