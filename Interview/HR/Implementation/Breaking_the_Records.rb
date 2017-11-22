# Maria plays n games of college basketball in a season. Because she wants to go pro, she tracks her points scored per game sequentially in an array defined as score = [s0, s1,..s_n-1] . After each game i, she checks to see if score s_i breaks her record for most or least points scored so far during that season.
#
# Given Maria's array of scores for a season of n games, find and print the number of times she breaks her record for most and least points scored during the season.


# Note: Assume her records for most and least points at the start of the season are the number of points scored during the first game of the season.

#!/bin/ruby

def getRecord(s)
  # Complete this function

  highest = s[0]
  lowest = s[0]
  result = [0,0]

  s[1..-1].each do |score|
    if score > highest
      result[0] += 1
      highest = score
    end

    if score < lowest
      result[1] += 1
      lowest = score
    end

  end

  result
end

n = gets.strip.to_i
s = gets.strip
s = s.split(' ').map(&:to_i)
result = getRecord(s)
print result.join(" ")
