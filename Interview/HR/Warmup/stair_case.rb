# Consider a staircase of size n = 4:
#
#    #
#   ##
#  ###
# ####
# Observe that its base and height are both equal to , and the image is drawn using # symbols and spaces. The last line is not preceded by any spaces.
#
# Write a program that prints a staircase of size .
#
# Input Format
#
# A single integer, , denoting the size of the staircase.
#
# Output Format
#
# Print a staircase of size  using # symbols and spaces.
#
# Note: The last line must have  spaces in it.

#!/bin/ruby

n = gets.strip.to_i

1.upto(n) do |steps|
  spaces = n - steps
  puts " "*spaces + "#" *steps
end
