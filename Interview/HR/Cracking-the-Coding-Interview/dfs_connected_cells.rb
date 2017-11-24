# Sample Input
#
# 4
# 4
# 1 1 0 0
# 0 1 1 0
# 0 0 1 0
# 1 0 0 0
# Sample Output
#
# 5

# Explanation
#
# The diagram below depicts two regions of the matrix; for each region, the component cells forming the region are marked with an X:
#
# X X 0 0     1 1 0 0
# 0 X X 0     0 1 1 0
# 0 0 X 0     0 0 1 0
# 1 0 0 0     X 0 0 0
# The first region has five cells and the second region has one cell. Because we want to print the number of cells in the largest region of the matrix, we print .

#!/bin/ruby

n = gets.strip.to_i
m = gets.strip.to_i
grid = Array.new(n)
for grid_i in (0..n-1)
    grid_t = gets.strip
    grid[grid_i] = grid_t.split(' ').map(&:to_i)
end

def dfs(row, column, n, m, grid)
  if row < 0 || row >= n || column < 0 || column >= m
    return 0
  end

  if grid[row][column] != 1
    return 0
  end

  count = 1
  grid[row][column] = -1
  (row-1..row+1).each do |x|
    (column-1..column+1).each do |y|
      count += dfs(x,y, n, m, grid)
    end
  end

  return count
end

def solve(n, m, grid)
  max_cells = 0

  (0...n).each do |row|
    (0...m).each do |column|
      if (grid[row][column] == 1)
        cells = dfs(row, column, m, n, grid)
        if(cells > max_cells)
          max_cells = cells
        end
      end
    end
  end

  max_cells
end
puts solve(n, m, grid)
