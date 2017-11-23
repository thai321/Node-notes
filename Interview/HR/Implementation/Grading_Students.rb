#!/bin/ruby

def solve(grades)
   # Complete this function
   result = []

   grades.each do |grade|
    if grade > 37
      temp = (grade/5.0 + 0.5).round * 5
      result << (((temp - grade) < 3) ? temp : grade)
    else
      result << grade
    end
   end

   result
end

n = gets.strip.to_i
grades = Array.new(n)
for grades_i in (0..n-1)
    grades[grades_i] = gets.strip.to_i
end
result = solve(grades)
print result.join("\n")
