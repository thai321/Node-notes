# Given a square matrix of size , calculate the absolute difference between the sums of its diagonals.
#
# Input Format
#
# The first line contains a single integer, . The next  lines denote the matrix's rows, with each line containing space-separated integers describing the columns.
#
# Constraints
#
# Output Format
#
# Print the absolute difference between the two sums of the matrix's diagonals as a single integer.
#
# Sample Input
#
# 3
# 11 2 4
# 4 5 6
# 10 8 -12
# Sample Output
#
# 15


# Diagonal Difference
n = gets.strip.to_i
a = Array.new(n)
for a_i in (0..n-1)
    a_t = gets.strip
    a[a_i] = a_t.split(' ').map(&:to_i)
end

left = 0;
right = 0;

i = 0;
j = 0;

while (i < n && j < n )
  left += a[i][j]
  right += a[n - i - 1][i]
  i += 1;
  j += 1;
end

print ((left - right).abs)
