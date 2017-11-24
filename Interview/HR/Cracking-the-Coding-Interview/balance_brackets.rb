# Sample Input
#
# 3
# {[()]}
# {[(])}
# {{[[(())]]}}
#
# Sample Output
#
# YES
# NO
# YES

#!/bin/ruby

t = gets.strip.to_i

for a0 in (0..t-1)
  expression = gets.strip

  stack = []
  match = { '{' => '}',
          '[' => ']',
          '(' => ')' }
  result = nil

  expression.chars.each do |bracket|
    # if open bracket, then push to the stack
    if bracket == '{' || bracket == '[' || bracket == '('
      stack.push(bracket)
    else
      if stack.empty? || match[stack.pop] != bracket
      # close bracket, then pop from the stack and check if they match
      # return false if no match
        result = "NO"
        break
      end
    end
  end

  puts (result.nil? && stack.empty?) ? "YES" : "NO"
end
