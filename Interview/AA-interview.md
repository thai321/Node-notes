## `digital_root`

Write a method, `digital_root(num)`. It should sum the digits of a
positive integer. If it is greater than or equal to 10, sum the digits of the
resulting number. Keep repeating until there is only one digit in the
result, called the "digital root". Do not use string conversion within
your method.

### Solution

```ruby
def digital_root(num)
  while num >= 10
    num = digital_root_step(num)
  end

  num
end

def digital_root_step(num)
  root = 0
  while num > 0
    root += (num % 10)

    num /= 10
  end

  root
end

#recursive solution

def digital_root_recur num
  return num if num < 10
  digital_root_recur((num % 10) + (num / 10))
end

```

## `caesar_cipher`

Write a function that takes a message and an increment amount and
outputs the same letters shifted by that amount in the
alphabet. Assume lowercase and no punctuation. Preserve spaces.

### Solution

```ruby
def caesar_cipher(str, shift)
  letters = ("a".."z").to_a

  encoded_str = ""
  str.each_char do |char|
    if char == " "
      encoded_str << " "
      next
    end

    old_idx = letters.find_index(char)
    new_idx = (old_idx + shift) % letters.count

    encoded_str << letters[new_idx]
  end

  encoded_str
end
```


-------
## `longest_common_substring`

Write a function, `longest_common_substring(str1, str2)` that takes two strings and returns the longest common substring. A substring is defined as any consecutive slice of letters from another string.

Bonus: solve it in `O(m * n)` using `O(m * n)` extra space. (Hint: the solution involves dynamic programming which will be introduced later in the course.)

### Naive Implementation

```ruby
def longest_common_substring(str1, str2)
  longest_substring = ""

  start_idx = 0
  while start_idx < str1.length
    # don't consider substrings that would be too short to beat
    # current max.
    len = longest_substring.length + 1

    while (start_idx + len) <= str1.length
      end_idx = start_idx + len
      substring = str1[start_idx...end_idx]
      longest_substring = substring if str2.include?(substring)

      len += 1
    end

    start_idx += 1
  end

  longest_substring
end
```

This runs in `O(m * n**2)` time, where n is the length of the length of `str1` and m is the length of `str2`. We know this because there are two nested `while` loops that iterate through `str1` (`O(n**2)`), and within the while loop we check the substring for inclusion in `str2` (`O(m)`).

### Dynamic Programming Implementation

```ruby
def make_matrix(str1, str2)
  matrix = Array.new(str1.length + 1) { Array.new(str2.length + 1, 0) }

  str1.chars.each_with_index do |el1, idx1|
    str2.chars.each_with_index do |el2, idx2|
      if el1 == el2
        matrix[idx1 + 1][idx2 + 1] = matrix[idx1][idx2] + 1
      else
        matrix[idx1 + 1][idx2 + 1] = 0
      end
    end
  end

  matrix
end

def longest_common_substring(str1, str2)
  matrix = make_matrix(str1, str2)
  greatest_substring = ""
  matrix.each_with_index do |row, idx1|
    row.each_with_index do |length, idx2|
      if length > greatest_substring.length
        greatest_substring = str2[idx2 - length...idx2]
      end
    end
  end

  greatest_substring
end

```

In this implementation, we solve the problem in a bottom up manner. We start off by creating an n x m matrix using our `make_matrix` helper function. This matrix will hold the length of the longest common substring at each of the first string and second string.

We then iterate through each of the strings in a nested loop and compare each of the characters. If the characters are different, our common substring length that position is 0, so we add a 0 into the matrix at `matrix[idx1 + 1][idx2 + 1]`. Otherwise, we look to the value at `matrix[idx1][idx2]` (the previous positions in each of the strings) and increment it by one.

Example:

CAT & RAT
```
   |"" | C | A | T
--------------------
"" | 0 | 0 | 0 | 0
--------------------
R  | 0 | 0 | 0 | 0
--------------------
A  | 0 | 0 | 1 | 0
--------------------
T  | 0 | 0 | 0 | 2  <--- Longest substring ends here!
```

Once we have a matrix of the longest common substrings at each position, we can iterate through it and find the length and end position of the maximum substring.
When we find the maximum length, we can find the substring by tracing back `length` by grabbing the substring from `index - length` to `index`.

This solution is `O(n * m)` and takes up `O(n * m)` extra space for the matrix.

[Solution on TutorialHorizon](http://algorithms.tutorialhorizon.com/dynamic-programming-longest-common-substring/)

## `sum_rec`

Write a function that takes an array of integers and returns their
sum. Use recursion.

### Solution

```ruby
def sum_rec(nums)
  return 0 if nums.empty?
  nums[0] + sum_rec(nums.drop(1))
end
```


-------

## `fibs`

Write a function, `fibs(num)` which returns the first n elements from
the fibonnacci sequence, given n.

Solve it both iteratively and recursively.

### Iterative Solution

```ruby
def fibs(num)
  return [] if num == 0
  return [0] if num == 1

  fibs = [0, 1]
  while fibs.count < num
    fibs << fibs[-1] + fibs[-2]
  end

  fibs
end
```

Time complexity is `O(n)`, where n is num.

### Recursive Solution

```ruby
def fibs(num)
  return [] if num == 0
  return [0] if num == 1
  return [0, 1] if num == 2

  prev_fibs = fibs(num - 1)
  prev_fibs << prev_fibs[-1]  + prev_fibs[-2]

  prev_fibs
end
```

Time complexity is `O(n)`, where n is num. Space complexity is `O(n)`, since we will have `O(n)` frames on the call stack.

## `isPalindrome`

Write a JavaScript function that takes a string and returns true if
it's a palindrome, false if it's not. Use JavaScript.

This solution takes less time and memory than rebuilding the string
backward and comparing the two.

### Solution

```js
function isPalindrome (string) {
  var length = string.length;

  for (var i = 0; i < length/2; i++) {
    if (string[i] !== string[length - 1 - i]) {
      return false;
    }
  }

  return true;
}
```

* Time complexity: `O(n)`.
* Space complexity: `O(1)`.


-------

## `valid_ip?`

Write a method that takes a string as input. It should return true if
the input is a valid IPv4 address (ie. anything between `0.0.0.0` and
`255.255.255.255` is valid).

### Solution

```ruby
def valid_ip?(str)
  return false unless str =~ /^\d+(\.\d+){3}$/
  nums = str.split(".").map(&:to_i)
  nums.all? {|num| num >= 0 && num <= 255}
end
```

In this solution, we start by immediately returning false if the string does not abide by a specified format: it should start with a series one or more digits (`\d+`) followed by three groups that start with `.` and are followed with one or more digits (`(\.\d+){3}`). Once we satisfy this condition, we split the string and check that the digits are all within the valid range.

## `sum_from_file`

Write a method that reads in a file of integers, one per line, and
sums them. Skip the line if it begins with a `"#"`.

### Solution

```ruby
def sum_from_file(filename)
  nums = File
    .readlines(filename)
    .select { |line| line[0] != "#" }
    .map(&:to_i)

  nums.inject(:+)
end
```

This method uses the ruby `File` class. `::readlines` creates an array of each line of the file. We then use `Array#select` to skip lines beginning with `#`, convert the remaining lines to integers, and find the sum. This solution is `O(n)`, where n is the number of lines in the file.

## `shuffle`

You are given an array and a random number generator. Shuffle the
array.

### Solution

```ruby
def shuffle(array)
  new_array = array.dup
  array.each_index do |index|
    # notice how each time it moves the number at `index` out of the
    # way so it may be sampled later.
    rand_index = index + rand(array.length - index)
    new_array[index], new_array[rand_index] =
      new_array[rand_index], new_array[index]
  end
  new_array
end
```

* Time complexity: `O(n)`.



--------


## `myMap`

Implement the `Array.prototype.map` function in JavaScript.

### ES5 Solution

```js
Array.prototype.myMap = function(fn) {
  var final = [];
  this.forEach(function (el) {
    final.push(fn(el));
  });

  return final;
};
```

### ES6 Solution

```js
Array.prototype.myMap = function(fn) {
  const final = [];
  this.forEach((el) => {
    final.push(fn(el));
  });

  return final;
};
```

## Employees Query

In a SQL db, you have two tables, an employees table and a departments
table. Employees belong to only one department. Write a SQL query that,
given a department name, finds all the employees in that department.

### Solution

```sql
SELECT
  employees.*
FROM
  employees e
JOIN
  departments d ON e.department_id = d.id
WHERE
  d.name = ?
```


-------

## SQL + ActiveRecord

(from InstaCart) Write the following queries in SQL and in Rails:

* a. "count all users",
* b. "count all active users (you define what active means)",
* c. "count all users who visited the site within a certain time period".

### Solution

* a.

```sql
SELECT
  COUNT(*)
FROM
  users;
```

```ruby
User.count
```

* b. Here we assume that `active` is a column on the `users` table.

```sql
SELECT
  COUNT(*)
FROM
  users
WHERE
  users.active = true;
```

```ruby
User.where(:active => "TRUE").count
```

* c.

```sql
SELECT
  COUNT(*)
FROM
  users
WHERE
  users.last_login BETWEEN :time_period_start AND :time_period_end ;
```

```ruby
User.where(last_login: (time_period_start..time_period_end)).count
```

## `folding_cipher`

Implement the Folding Cipher. It folds the alphabet in half and uses
the adjacent letter. Ie. a <=> z, b <=> y, c <=> x, m <=> n.

```ruby
def folding_cipher(str)
  # Hash::[] creates a hash from a list of key-value pairs
  folded_alphabet = Hash[('a'..'z').zip(('a'..'z').to_a.reverse)]
  str.chars.map { |chr| folded_alphabet[chr] }.join
end
```


--------

## `uniq_subs`

Write a method that finds all the unique substrings for a word.

### Solution

A results array and the `include?` method can be used to enforce
uniqueness, but it adds the time cost of iterating through that array
to check for inclusion. Keeping track of substrings in a set or hash is more
efficient (`O(1)` lookup time).

```ruby
require 'set'

def uniq_subs(str)
  subs = Set.new

  str.length.times do |i|
    (i...str.length).each do |j|
      subs.add(str[i..j])
    end
  end

  subs
end
```

Time complexity: `O(n^3)`

One `"n"` comes from the outer loop, a second from the inner loop, and a
third from the line `subs.add(str[i..j])`, which contains two
operations that are linear in the length of `str`. First, slicing the
string from `i` to `j` is linear in the length of the substring, and the
average substring length grows linearly with the length of `str`.
Additionally, hashing a string (which we do when adding it to a set) takes `O(L)` time, where `L` is the length of the hashed string, so the time to hash the average substring also grows linearly in the length of `str`.

## `largest_contiguous_subsum`

Given an array of integers (positive and negative) find the largest
contiguous subsum (sum of a subarray).

You can solve this trivially in `O(n**2)` time by considering all
subarrays. Try to solve it in `O(n)` time with `O(1)` memory.

### Recursive Solution

Say for an array of `n` elements you know:

* The largest contiguous subsum, AND
* The largest contiguous subsum **ending at the last of `n`
  elements**.

Now, say that you extend the `n` elements with an `n+1`th element. How
does the largest contiguous subsum ending at the `n+1`th element
change?

How does the largest contiguous subsum change?

Illustration:

```
Suppose your array is [5, 3, -7, 6], then:

* The largest subsum is 8 with subarray [5, 3].
* The largest subsum ending at the last element is 7 with subarray [5, 3, -7, 6].

Say that you push 4 to the array to get [5, 3, -7, 6, 4].

* The largest subsum ending at the last element is 11 with subarray [5, 3, -7, 6, 4].
* The largest subsum overall is the max of the old largest subsum AND the new largest subsum.
In other words, the new largest sum is 11 because [8, 11].max = 11.
```

```ruby
def lcs(arr)
  lcs_helper(arr)[:best_sum]
end

def lcs_helper(arr)
  if arr.empty?
    return { best_sum: 0, best_suffix_sum: 0 }
  end

  result = lcs_helper(arr.drop(1))
  old_best_sum, old_best_suffix_sum = result[:best_sum], result[:best_suffix_sum]
  new_best_suffix_sum = [old_best_suffix_sum + arr.first, arr.first].max
  new_best_sum = [old_best_sum, new_best_suffix_sum].max

  { best_sum: new_best_sum,
    best_suffix_sum: new_best_suffix_sum }
end
```

### Iterative Solution

```ruby
def lcs(arr)
    current_sum = 0
    max = arr.first || 0  # return 0 for empty array

    arr.each do |el|
        current_sum += el
        max = current_sum if max < current_sum
        current_sum = 0 if current_sum < 0
    end

    max
end
```


-------

## `silly_years`

Write a function that takes a year (four digit integer) and returns an
array with the 10 closest subsequent years that meet the following
condition: the first two digits summed with the last two digits are
equal to the middle two digits. E.g.,

    1978 => 19 + 78 = 97
    2307 => 23 + 07 = 30

### Solution

```ruby
def silly_years(year)
  years = []

  until years.length == 10
    year += 1
    digits = year.to_s

    first_two, middle_two, last_two = [
      digits[0..1], digits[1..2], digits[2..-1]
    ].map { |pair| pair.to_i }

    years << year if (first_two + last_two) == middle_two

  end

  years
end
```

In this solution, we iterate up from `year`, adding each year that meets the condition into the result array until we have 10 silly years.

There's also a more efficient deductive solution, courtesy of [@joshuameisel][josh-meisel-handle].

We're only looking at 4-digit years, all in the form "abcd" (in 1987, a = 1, b = 9, c = 8, d = 7).
*"The first two digits plus the last two equal the middle two"* means *"ab + cd = bc"*.
But ab is really 10 * a + b (as in 87 is 8 * 10 + 7). So we reformulate *"ab + cd = bc"*
as (10 * a + b) + (10 * c + d) = (10 * b + c).
Subtracting by the right side we get: (10 * a + b) + (10 * c + d) - (10 * b + c) = 0.
Combine like terms:
10 * a - 9 * b + 9 * c + d = 0.
We can manipulate the left side further. It's equal to:
a + 9a - 9b + 9c + d = a + 9a + 9(-b) + 9c + d = a + 9(a - b + c) + d = 0
So:
a + d = -9(a - b + c)

We've proven that a + d is a multiple of 9. We also know that a and d, being digits, are between 0 and nine inclusive.
So a + d is in between 0 + 0 = 0 and 9 + 9 = 18. It has to be 0, 9, or 18. It can't be 0 (there's no year 0870). a + d also can't be 18, because that would mean a and d are both 9. In the year 9bc9, 9b + c9 is at least 99, meaning b and c would also be at least 9. We know 9999 does not match the pattern we're looking for.

We're now proven that
* a + d = 9
* a - b + c = -1

Given the above, we can figure out what d and c must be once we know a and b. This means there is at most one silly year per century. On our input year, we simply iterate up subsequent centuries to see if any of them have a silly year. A century tells us a and b, from which we derive c and d. If c and d are both between 0 and 9, abcd is a silly year.

In code:

```ruby
def silly_years(year)
  years = []

  year_arr = year.to_s.split("").map(&:to_i)

  # Keep going until we hit 10
  while years.length < 10

    # Calculate the digits using the principles above
    first_digit = year_arr[0]
    second_digit = year_arr[1]
    third_digit = -1 - first_digit + second_digit
    last_digit = 9 - first_digit

    # Set the year_arr
    year_arr = [first_digit, second_digit, third_digit, last_digit]

    # Make sure the year_arr is valid
    if year_arr.all? { |digit| digit.between?(0, 10) }
      current_silly_year = year_arr.map(&:to_s).join("").to_i

      # Just in case the current_silly_year is before our initial year
      years << current_silly_year if current_silly_year > year
    end

    # Time to move on to the next century
    year_arr[1] += 1

    # Carry if it's a new millenium
    if year_arr[1] >= 10
      year_arr[1] -= 10
      year_arr[0] += 1
    end
  end

  years
end

```

[josh-meisel-handle]: https://github.com/joshuameisel

## `pair_sum`

Given an array of integers, return all pairs that sum up to a
specified value `k`. List the pairs in `[min, max]` order.

### Solution

```ruby
require 'set'

def pair_sum(arr, k)
  seen = Set.new
  pairs = Set.new

  arr.each do |num|
    target = k - num

    if seen.include?(target)
      # add in [min, max] order
      pairs.add(
        [[num, target].min, [num, target].max]
      )
    end

    # add `num` after checking; what if we put this before and there's
    # a single `0` is in the `arr`?
    seen.add(num)
  end

  pairs
end

pair_sum([1, 2, -1], 0)          # => #<Set: {[-1, 1]}>
pair_sum([1, 2, -1, -1], 0)      # => #<Set: {[-1, 1]}>
pair_sum([1, 2, -1, -1, -2], 0)  # => #<Set: {[-1, 1], [-2, 2]}>
pair_sum([1, 2, -1, -1, -2], 1)  # => #<Set: {[-1, 2]}>
pair_sum([1, 2, -1, -1, -2], -1) # => #<Set: {[-2, 1]}>
```

Time complexity: `O(n)`. This uses the fact that hash set `add` and
`include?` are both `O(1)`.


--------


## `matrix_region_sum`

Given a matrix of integers and coordinates of a rectangular region
within the matrix, find the sum of numbers falling inside the
rectangle.

### Solution

```ruby
def matrix_region_sum(matrix, top_left_coords, bottom_right_coords)
  total_sum = 0

  (top_left_coords[0]..bottom_right_coords[0]).each do |row_idx|
    (top_left_coords[1]..bottom_right_coords[1]).each do |col_idx|
      total_sum += matrix[row_idx][col_idx]
    end
  end

  total_sum
end
```

In this solution, we assume that the coords are in the format (row_idx, col_idx).
Our `top_left_coords` contain the lower bounds and our `bottom_right_coords` contain the upper bounds.

With this knowledge, we can iterate through the inclusive range from `top_left_coords[0]..bottom_right_coords[0]` and `top_left_coords[1]..bottom_right_coords[1]` to find all of the elements that are within the specified rectangle and add them to our total sum.

Time complexity: `O(number of rows * number of columns)`. This is the
best possible because we have to add every one of the numbers in the
rectangle. Anything less would require us to skip numbers.

## `merge_sort`

Implement merge sort.

### Solution

```ruby
def merge_sort(array)
  # already sorted
  return array if array.count < 2

  middle = array.count / 2
  left, right = array.take(middle), array.drop(middle)

  sorted_left, sorted_right = merge_sort(left), merge_sort(right)

  merge(sorted_left, sorted_right)
end

def merge(left, right)
  merged_array = []
  until left.empty? || right.empty?
    merged_array <<
      ((left.first < right.first) ? (left.shift) : (right.shift))
  end

  merged_array + left + right
end
```

Time complexity: `O(n*log(n))`.

```ruby
def merge(left, right)
  merged_array = []
  i, j = 0, 0
  until i == left.length || j == right.length
    if left[i] > right[j]
      merged_array << right[j]
      j += 1
    else
      merged_array << left[i]
        i += 1
    end
  end
  merged_array + left.drop(i) + right.drop(j)
end
```

Time complexity for merge only: `O(n)`.

------

## Hindsight

What would you do differently if you had to do Project X over again?

**NB**: Project X can be any major project you completed at App Academy, during your time in college/grad school, or at a previous job.

The answer should tell the interviewer:

- What the project was (concisely)
- A description of what you did that wasn't ideal
- A description of how you would do that differently, including an explanation of why (what did you learn after the project?)

## `binary_search`

Implement binary search

### Solution

```ruby
def binary_search(array, target)
  return nil if array.count == 0

  midpoint = array.length / 2
  case target <=> array[midpoint]
  when -1
    binary_search(array.take(midpoint), target)
  when 0
    midpoint
  when 1
    subproblem_answer =
      binary_search(array.drop(midpoint + 1), target)
    subproblem_answer.nil? ? nil : (midpoint + 1) + subproblem_answer
  end
end
```

Time complexity: `O(log(n))`

## `productify`

Given a list of numbers in an array, replace all the numbers with the
product of all other numbers. Do this in `O(n)` time **without using
division**.

### Solution

```ruby
def productify(arr)
  products = Array.new(arr.length, 1)

  lower_prod = 1
  0.upto(arr.size - 1) do |i|
    products[i] = products[i] * lower_prod
    lower_prod = lower_prod * arr[i]
  end

  upper_prod = 1
  (arr.size - 1).downto(0) do |i|
    products[i] = products[i] * upper_prod
    upper_prod = upper_prod * arr[i]
  end

  products
end
```

Each item `products[j]` in the result array can be thought of the product of all elements where index `i > j` (the elements before i) times all the items where index `i < j` (the elements after i).

How do we get the product of all the items before and after each element in `O(n)` time? We can first find the `lower_product` at each index `i`, which keeps track of the product of all the elements before `i`, and multiply each element `products[i]` in the result array by the current `lower_product`. We then step backwards through the indices to calculate the `upper_product` and multiply each element `products[i]` in the result array with the current `upper_product`.

This allows us to calculate the product of all elements except for the element at `arr[i]` in `O(n)` time.



-------


## `subsets`

Write a function that takes an array and returns all of its
subsets. How many sets will it return?

### Solution

```ruby
def subsets(arr)
  return [[]] if arr.empty?

  val = arr[0]
  subs = subsets(arr.drop(1))
  new_subs = subs.map { |sub| sub + [val] }

  subs + new_subs
end
```

We can solve subsets recursively. We can think of the subsets of an array of length n as all the subsets of the array without the first element  (`subsets(array.drop(1))`) plus the same subsets with the first element added on to each one.

Pseudocode Example:
```
subsets(['a', 'b', 'c'])
subs_without_a => [[], ['c'], ['b'], ['c', 'b']]
subs_with_a => [['a'], ['c', 'a'], ['b', 'a'], ['c', 'b', 'a']]
all_subs = subs_without_a + subs_with_a
```

With this in mind, we can set our base case as a single empty subset (`[[]]`). We can then calculate the subsets of any array by finding the subsets of the array excluding the first element, and add them to the subsets of the array with the first element.

We will finish with 2 ** n subsets, so at minimum our time complexity will be `O(2**n)`.

## `longest_palindrome`

Write a function that will take a string and return the indices of the
start/end of the longest palindrome it contains.

Example:

`longest_palindrome('acapella') => [0, 2]`

### Solution

Your palindrome checker could reverse the string and compare it to the
original, but that takes extra memory (that takes `O(n)` extra
memory). Instead, you should be able to solve this problem with `O(1)`
memory.

The naive solution is to generate all of the substrings (of which there are
`O(n**2)` many), and for each substring, check if it's a palindrome. A
palindrome check takes linear time, so this is total `O(n**3)` time, or cubic
time.

```ruby
def longest_palindrome(string)
  best_palindrome_start = 0
  best_palindrome_len = 0

  0.upto(string.length - 1).each do |start|
    # micro-optimization: don't look at substrings shorter than best
    # palindrome.
    len = best_palindrome_len + 1
    while start + len <= string.length
      if is_palindrome?(string, start, len)
        best_palindrome_start, best_palindrome_len = start, len
      end

      len += 1
    end
  end

  [best_palindrome_start, best_palindrome_start + best_palindrome_len - 1]
end

def is_palindrome?(string, start, len)
  len.times do |i|
    if string[start + i] != string[(start + len - 1) - i]
      return false
    end
  end

  true
end
```

This obviously sucks. We can do better. If we realize that every biggest
palindrome will have many smaller palindromes nested inside it, we realize that
we don't have to look at every palindrome separately; we can linearly scan
through the array, and for each index in the array (or space between indices),
check to see what's the largest palindrome *centered* there.

This approach will take `O(n**2)` time and `O(1)` space.

```ruby
def longest_palindrome(str)
    longest_length = 0
    longest_begin = 0

    str.length.times do |i|
        stretch = 0
        # expand out from char i, and see if there's an expanding palindrome
        # (for odd palindrome lengths)
        loop do
            break unless both_in_range?(i + stretch, i - stretch, str)

            if str[i - stretch] == str[i + stretch]
                this_pal_length = stretch * 2 + 1
                if this_pal_length > longest_length
                    longest_length = this_pal_length
                    longest_begin = i - stretch
                end
            else
              break
            end

            stretch += 1
        end

        # now check centering around the spaces between chars
        # (for even palindrome lengths)
        stretch = 0
        loop do
            break unless both_in_range?(i + stretch + 1, i - stretch, str)

            if str[i - stretch] == str[i + stretch + 1]
                this_pal_length = stretch * 2 + 2
                if this_pal_length > longest_length
                    longest_length = this_pal_length
                    longest_begin = i - stretch
                end
            else
              break
            end

            stretch += 1
        end
    end

    str.slice(longest_begin, longest_length)
end

def both_in_range?(i1, i2, str)
    [i1, i2].all? { |idx| idx.between?(0, str.length - 1) }
end
```

There is a way to do this in linear time, but it involves a degree of insight
that you'd never be expected to achieve in an interview. You can read more about
the linear time algorithm below, known as [Manacher's Algorithm](http://en.wikipedia.org/wiki/Longest_palindromic_substring).

[Someone's ruby implementation of Manacher's algorithm.](https://github.com/billymonk/algorithms/blob/master/ruby/manacher.rb)
[Visualization of Manacher's algorithm.](http://manacher-viz.s3-website-us-east-1.amazonaws.com/#/)



-------

## `fast_intersection`

Given `arr1` and `arr2`, find the intersection of both sets. It should
be trivial to write an `O(n**2)` solution. Use sorting to solve in
`O(nlog(n))`. Next, improve this to `O(n)` time (maybe use a non-array
datastructure).

## Solution

### O(n**2) solution

```ruby
def intersection1(arr1, arr2)
  arr1.uniq.select { |el| arr2.include?(el) }
end
```

We have a loop through `arr1` to select which contributes `O(n)` and a nested `arr2.include?` which contributes another `O(n)` for a total of `O(n**2)`.

### O(nlogn) solution

```ruby
def intersection2(arr1, arr2)
  arr1, arr2, idx1, idx2 = arr1.sort, arr2.sort, 0, 0

  intersection = []
  while idx1 < arr1.length && idx2 < arr2.length
    case arr1[idx1] <=> arr2[idx2]
    when -1
      idx1 += 1
    when 0
      intersection << arr1[idx1]
      idx1 += 1
      idx2 += 1
    when 1
      idx2 += 1
    end
  end
  intersection
end
```

We start off by sorting which is an `O(nlogn)` operation. From there we can step through the array, keeping a separate indices for our position in `arr1` and `arr2`, adding to our result array when we find an intersecting element (this is an `O(n)` operation). Our total time complexity is `O(nlogn)`.

### O(n) solution

```ruby
def intersection3(arr1, arr2)
  intersection = []
  set_1 = arr1.to_set
  arr2.each do |el|
    intersection << el if set_1[el]
  end

  intersection
end
```

In our final solution, we use a set to keep track of all the seen elements in `arr1`. This is an `O(n)` operation. In a separate loop, we iterate through `arr2`, checking to see if we've seen each element. Because we've added everything from `arr1` to a hash, lookup time is `O(1)`, for a total time complexity of `O(n)`, and additional space complexity of `O(n)`.

## `common_subsets`

Write a function that takes two arrays (`arr1` and `arr2`) of integers
and returns an array with all the subsets commmon to both.

Don't generate all subsets of `arr1` and `arr2`, which would take time
exponential in the size of `arr1`/`arr2` (and take `O(2**n)` memory as
well). Instead, directly generate the subsets of both.

### Solution

```ruby
def common_subsets(arr1, arr2)
  subsets(intersection3(arr1, arr2))
end

def subsets(arr)
  return [[]] if arr.empty?

  val = arr[0]
  subs = subsets(arr.drop(1))
  new_subs = subs.map { |sub| sub + [val] }

  subs + new_subs
end
```

We know that all common subsets between `arr1` and `arr2` are formed from the intersecting elements, so we can utilize the `intersection3` function that we wrote for the previous problem, and then generate the subsets of the intersection. Recall that our `intersection3` function took `O(n)` time. We then generate the subsets of this intersection, which will take `O(2**n)` time, where `n` is the number of elements that intersect, for a total time complexity of `O(2**n)`.

## `can_win?`

Given an array and index, find if it's possible to reach the value 0 by starting at the given index and repeatedly moving left/right by the distance found at `array[index]`.

Example:
```
can_win?([1, 0, 1], 0)
=> true

can_win?([1, 2, 0], 0)
=> false
```

Hint: Use memoization to record where you've been.

### Solution

Recursive:

```ruby
def can_win?(arr, pos = 0, seen = {})
  return false if !pos.between?(0, arr.length - 1) || seen[pos]
  return true if arr[pos].zero?

  seen[pos] = true

  can_win?(arr, pos + arr[pos], seen) ||
  can_win?(arr, pos - arr[pos], seen)
end
```

Our goal is to make it to a 0 by stepping forward or backwards by the value of our current position in the array.

In our recursive solution, we keep track of our current position as well as a `seen` hash. In our base cases, we return false unless the current position falls within the bounds of the array or we have already seen the current position (this means our search through that position ended fruitlessly). We return true if the value at that position is 0. Before making the recursive call to `can_win?`, we set `seen[pos] = true` so we don't try to visit it again.

We then make two recursive calls to `can_win?` passing in `pos + arr[pos]` (stepping forward by that position's value) and `pos - arr[pos]` (stepping backwards by that position's value) for our new positions. If either one of our recursive calls returns true, we've won!

Iterative:

```ruby
# A non-recursive solution.
def can_win(array, index)
  positions_to_try = [index]
  visited_positions = Array.new(array.length, false)
  visited_positions[index] = true

  until positions_to_try.empty?
    # We should probably use a queue for this.
    position = positions_to_try.shift
    value = array[position]

    if value == 0
      return true
    end

    [position + value, position - value].each do |pos|
      next if visited_positions[pos]
      next if (pos < 0 || array.length <= pos)

      positions_to_try << pos
      # This insures we don't add a position twice to our queue.
      visited_positions[pos] = true
    end
  end

  false
end
```

We can also do this iteratively using a queue. In this case, we get our current position, find the new positions by adding and subtracting the value, and throw them onto the back of the queue if they fall within the array and haven't been visited yet.

Our solutions will take up `O(n)` time - worst case, we visit every item in the array before finding (or not finding) a 0.



--------


## Non-Comparison Sorts

Part 1: Say that I gave you an array of length `n`, containing the
numbers `1..n` in jumbled order. "Sort" this array in `O(n)` time. You
should be able to do this without looking at the input.

Part 2: Say that I give you an array of length `n` with numbers in the
range `1..N` (`N >= n`). Sort this array in `O(n + N)` time. You may
use `O(N)` memory.

Part 3: Say I give you an array of `n` strings, each of length `k`. I
claim that, using merge sort, you can sort this in `O(knlog(n))`,
since comparing a pair of strings takes `O(k)` time.

I want you to beat that. Sort the strings in `O(kn)`. **Hint**: do not
compare any two strings. You may assume all strings contain only
lowercase letters `a..z` without whitespace or punctuation.

### Solutions

```ruby
def sort1(arr)
  (1..(arr.length)).to_a
end
```
Our first sort is simple - if we have an array of elements from 1 to arr.length, we can simply make a new array using the range `1..arr.length`! No comparisons here!

```ruby
def sort2(arr, max_val)
  counts = Array.new(max_val + 1, 0)
  arr.each { |el| counts[el] += 1 }

  arr = []
  counts.each_index do |val|
    counts[val].times { arr << val }
  end
  arr
end
```

In our second sort, we know that we have n items in our array from the range `1..N`. To solve this in `O(n + N)` time, we can start off with an array of counts of length `N + 1`. We iterate through the array, incrementing the value at the correct index every time we find an item. We then iterate through the counts array and add the correct number of elements into our final ordered results array.

```ruby
def sort3(strings, length)
  (length - 1).downto(0) do |i|
    buckets = Array.new(26) { [] }
    strings.each do |string|
      letter = string[i]
      buckets[letter.ord - "a".ord] << string
    end

    strings = []
    buckets.each do |bucket|
      bucket.each { |string| strings << string }
    end
  end

  strings
end
```

Our last sort is a little bit trickier. Our general strategy will be to go through the entire array of strings and sort them into buckets letter by letter, starting with the last (and least significant) letter, then join the buckets together. Once we've done this, we can rest assured that the strings are now sorted by the last letter.

We then move up to the second-to-last letter and do the same, sorting the strings into buckets based on this letter. When we add these strings into buckets based on the second-to-last letter, the order within each bucket will maintain its relative orders based on the last letter, so on and so forth through the string until it is entirely sorted.

Example:
```ruby
sort3([`cat`, `car`, `bat`])

# buckets after sorting by last letter
buckets = [[], ... , [`car`], ..., [`cat`, `bat`],  ...]

# strings after we join the buckets back together, now sorted by last letter
strings = [`car`, `cat`, `bat`]

# buckets after sorting by second to last letter - note that they retain their relative ordering by last letter in the buckets
buckets = [[`car`, `cat`, `bat`], ..., []]

# strings after we join the buckets back together, now sorted by last letter and second-to-last letter
strings = [`car`, `cat`, `bat`]

# lastly, buckets sorted by the first and most important letter
buckets = [[], ..., [`bat`], [`car`, `cat`] ...]

strings = [`bat`, `car`, `cat`]
```

We have a loop that goes through each string `O(n)` nested within a loop that goes through each letter `O(k)` for a total time complexity of `O(n * k)`.

## `weighted_random_index`

Given an array, write a function that will return a random index of
the array. The probability of an index being returned is weighted by
the value at that index against the sum of the array values. For
example, for the array `[4, 6, 8]`, index 0 should be returned with 4
in 18 odds, index 1 should be returned with 6 in 18 odds, and index 2
should be return with 8 in 18 odds. Implement this in `O(n)` time.

### Solution

```ruby
def weighted_random_index(arr)
  total_sum = arr.inject(:+)
  value = rand(total_sum)

  cumulative_sum = 0
  arr.each_with_index do |el, i|
    cumulative_sum += el
    return i if value < cumulative_sum
  end
end
```

We can solve this problem by generating a total sum (`O(n)`) and taking a random value from the sum. To find out which index we've actually landed on, we generate a cumulative sum at each index (`O(n)`). If our random value is less than the cumulative sum at that point, we have found our index and return it. Our total time complexity is (`O(n)`).



--------

## `move_zeros`

Given an array, move all zeros to the end. The order of non-zero
elements does not matter. Ex:

```
move_zeros([1, 2, 0, 3, 4, 0, 5, 6, 0]) == [1, 2, 6, 3, 4, 5, 0, 0, 0]
```

Algorithm should be `O(n)`; use `O(1)` extra space.

### Solution

```ruby
def move_zeros(array)
  current_index = 0
  num_zeros = 0

  while current_index < (array.length - num_zeros)
    current_value = array[current_index]

    if current_value != 0
      current_index += 1
      next
    end

    back = array.length - 1 - num_zeros
    array[current_index], array[back] =
      array[back], array[current_index]
    num_zeros += 1

    # we can't add one to current_index since `back` may have
    # contained a zero and we don't know it.
  end

  # Return the array
  array
end

def move_zeros2(arr)
  left, right = 0, arr.size - 1
  loop do
    left  += 1 until arr[left]  == 0 || left == right
    right -= 1 until arr[right] != 0 || left == right
    break if left == right
    arr[left], arr[right] = arr[right], arr[left]
  end
  arr
end
```

## `look_and_say`

Implement the 'look and say' function. 'Look and say' takes an input
array and outputs an array that describes the count of the elements in
the input array as they appear in order.

**Example:**

```ruby
# there is one '1' in the input array
look_and_say([1]) == [[1, 1]]

# there are two '1's in the input array
look_and_say([1, 1]) == [[2, 1]]

# there is one '2', followed by one '1' in the input array
look_and_say([2, 1]) == [[1, 2], [1, 1]]

# is one '1', followed by one '2', followed by 2 '1's in the input
# array
look_and_say([1, 2, 1, 1]) == [[1, 1], [1, 2], [2, 1]]
```

### Solution

Maintain a current count, maintain a current element. Push both onto
new array when a different element is detected.

```ruby
def look_and_say(array)
  return [] if array.empty?

  output = [[1, array[0]]]

  (1...array.length).each do |idx|
    el = array[idx]
    if el == output.last[1]
      output.last[0] += 1
    else
      output << [1, el]
    end
  end

  output
end
```

The time complexity of this problem is `O(n)`, since we iterate through the array once.


---------

## Sums Upon Sums

I give you a scrambled list of `n` unique integers between 0
and `n`. Tell me what number is missing.

If I let you use `O(nlog(n))` time, what is a naive way of doing this?

Next, what if I require that you solve the problem in `O(n)` time?
What datastructure might you use?

Finally, how could you solve the problem in `O(n)`, and also `O(1)`
space?

### Solution

`O(nlog(n))` solution - sort the numbers and look for a gap:

```ruby
def which_missing_1(arr)
  arr.sort.each_with_index do |el, idx|
    return idx if el != idx
  end

  arr.length
end
```

`O(n)` with `O(n)` extra space - add the numbers to a hash set and then check for each number from 0 - n.

```ruby
def which_missing_2(arr)
  found = {}
  arr.each do |el|
    found[el] = true
  end

  0.upto(arr.length).each do |el|
    return el unless found[el]
  end
end
```

`O(n)` with `O(1)` extra space: The expected sum of the first `n` numbers is `(n + 1)(n / 2)` (prove this). Sum up all the numbers yourself, and subtract the actual from expected values. This number must be missing.

```ruby
def which_missing_3(arr)
  total = (arr.length + 1) * arr.length / 2
  actual_sum = arr.inject(&:+)
  total - actual_sum
end
```

In both these solutions, we update the array in-place to use `O(1)` extra space. We achieve this by iterating through the array until we find a zero, then swapping with the item at the back of the array. We then increase our known count of zeros by one so that we can swap with the item at `length - 1 - num_zeros`. When we swap, we may have swapped with another zero and not known it. We only increment the index if we encounter a non-zero so we can check the potential-zero again. This solution uses `O(n)` time.

## K Closest Stars

Consider a coordinate system for the Milky Way, in which Earth is at (0,0,0). Model stars as points, and assume distances are in light years. The Milky Way consists of approximately 10^12 stars, and their coordinates are stored in a file. How would you compute the k stars which are closest to Earth?

Hint: Suppose you know the k closest stars in the first n stars. If the (n + 1)th star is to be added to the set of k closest stars, which element in that set should be evicted?

### Solution

We are working with a big dataset!

If we were working with a smaller dataset, there are a few ways we could solve this problem.

1) We could read the data into an array, then sort the array and take the kth smallest elements.
2) We could read the items into an array and use  [QuickSelect](http://stackoverflow.com/questions/10846482/quickselect-algorithm-understanding).

However, both of these solutions would take up `O(n)` space complexity. Given the vast number of stars in our galaxy, these solutions will simply not do!

To solve this problem in a lower space complexity (teehee, space complexity because we are talking about outer space), we can solve this problem using a priority queue.

```ruby

def k_closest_stars(sequence, k)
  # This we pass our MaxHeap a proc to calculate distance
  heap = BinaryMaxHeap.new do |el1, el2|
    distance1 = Math.sqrt(el1[0]**2 + el1[1]**2 + el1[2]**2)
    distance2 = Math.sqrt(el2[0]**2 + el2[1]**2 + el2[2]**2)
    distance1 <=> distance2
  end

  # Start off the heap with k items
  k.times do
    heap.push(sequence.pop)
  end

  # Until we reach the end, push on new items from our sequence and extract the max
  while sequence.length > 0
    heap.push(sequence.pop)
    heap.extract
  end

  # We can return an array of k closest stars
  k_closest = []

  until heap.empty?
    k_closest.push(heap.extract)
  end

  k_closest
end

```

In this solution, we assume that we have a BinaryMaxHeap class that takes in a proc for sorting. In this case, we sort by distance from (0,0,0), earth's position.

We start by pushing k items onto the max heap. Then, until we reach the end of the sequence of stars, we continue reading in each star, adding them to the heap (`O(logk)`), then extracting the max (`O(1)`). This will maintain a structure that keeps track of the k closest stars at all times. Finally, when we reach the end of the star stream, we push everything from the heap onto an array, which we ultimately return.

The time complexity is (`O(nlogk)`) because we must read through each star once, and adding them to the heap is an `O(logk)` operation. The space complexity (teehee) is a mere `O(k)`.

## `bonus_stack`

Implement a stack with a  method `max` that returns the maximum
value of the stack. `max` should run in `O(1)` time, no matter what operations are performed on the stack.

### Solution

```ruby
class MaxStack
  def initialize
    @values = []
  end

  def push(value)
    if @values.empty?
      @values << [value, value]
    else
      new_max = [self.max, value].max
      @values << [value, new_max]
    end
  end

  def pop
    value, max = @values.pop

    value
  end

  def max
    @values.last[1]
  end
end
```

Flashback to good old min-max stack from week 2! First, let's review stacks: stacks are a FIFO (first in first out) data structure. Next, let's talk about how to keep track of the max. We can't just keep an `@max` instance variable - what happens if we add on a new maximum element, then pop it off? We'd have to look through our entire stack which would take `O(n)` time to search for our new max. Instead, we store metadata along with each element - the current max at the time the element was added to the stack. From there, no matter what operations are performed, we can keep track of the stack's current max.



---------


## `StackQueue`

Implement a queue using stacks. That is, write `enqueue` and `dequeue`
using only `push` and `pop` operations.

In terms of performance, `enqueue` should be `O(1)`, but `dequeue` may
be worst-case `O(n)`. In terms of ammortized time, `dequeue` should be
`O(1)`. Prove that your solution accomplishes this.

### Solution

```ruby
class StackQueue
  def initialize
    @in, @out = [], []
  end

  def enqueue(value)
    @in << value
  end

  def dequeue
    if @out.empty?
      @out << @in.pop until @in.empty?
    end

    @out.pop
  end
end
```

Think back to our `StackQueue` class from the good old days. First off, recall that a queue is a FILO (first in last out) data structure. We use two stacks to implement our stack queue. Every time we add an item, we push it onto an `@in` stack. This is a `O(1)` operation. When we dequeue, we will only dequeue from our `@out` stack. If something is on our `@out` stack, dequeueing is a `O(1)` operation. If our `@out` stack is empty, we will pop from the `@in` stack and push everything onto the `@out` stack, toppling the stack upside down like a slinky so that the first items pushed on will come out of our queue first, as they should.

But wait - isn't moving every item from our `@in` stack to the `@out` stack an `O(n)` operation? Does this make dequeueing an `O(n)` operation? While toppling the stack is an `O(n)` operation, each `O(n)` operation gives us `n` free dequeues. Since we get n free dequeues for every `O(n)` topple and n / n is 1, dequeueing is an `O(1)` amortized operation.

## Windowed Max Range

Given an array, and a window size `w`, find the maximum `max - min`
within a range of `w` elements.

For instance:

```ruby
windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
# still 6!
windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8
```

You can write a naive version that considers all subarrays of size
`w`. However, if `w = n/2` then there are `n/2` subarrays of length
`n/2` to consider. Therefore, I would call this solution quadratic.
Write it anyway :-)

Let's improve it to `O(n)`. Here are some hints:

* First solve `MaxStack`. Could you write simply a `MinMaxStack` to
  track both the min and the max in a stack?
* Next, solve `StackQueue`. Could you use your `MinMaxStack` to write
  a `MinMaxStackQueue` which tracks both the min and max.
* Last, can you use your `MinMaxStackQueue` to solve the problem?

### Solution

```ruby
class MinMaxStack
  def initialize
    @entries = []
  end

  def length
    @entries.length
  end

  def push(value)
    if @entries.empty?
      @entries << { value: value, min: value, max: value }
    else
      @entries << {
        value: value,
        max: [@entries.last[:max], value].max,
        min: [@entries.last[:min], value].min
      }
    end
  end

  def pop
    (@entries.pop)[:value]
  end

  def max
    @entries.empty? ? nil : (@entries.last)[:max]
  end

  def min
    @entries.empty? ? nil : (@entries.last)[:min]
  end
end

class MinMaxStackQueue
  def initialize
    @in, @out = MinMaxStack.new, MinMaxStack.new
  end

  def enqueue(value)
    @in.push(value)
  end

  def dequeue
    if @out.length == 0
      @out.push(@in.pop) until @in.length == 0
    end

    @out.pop
  end

  def length
    @in.length + @out.length
  end

  def max
    maxes = []
    maxes << @in.max if @in.length > 0
    maxes << @out.max if @out.length > 0

    maxes.max
  end

  def min
    mins = []
    mins << @in.min if @in.length > 0
    mins << @out.min if @out.length > 0

    mins.min
  end
end

def windowed_max_range(array, window_size)
  max_range = nil

  q = MinMaxStackQueue.new
  array.each do |el|
    q.enqueue(el)
    if max_range.nil? || (q.max - q.min) > max_range
      max_range = (q.max - q.min)
    end

    if q.length == window_size
      q.dequeue
    end
  end

  max_range
end
```

Let's walk through the above queue. We've already implemented our `MinMaxStack`. We can extend this to be a `MinMaxStackQueue` which allows us to take the min and max of our queue in `O(1)` time by using `MinMaxStack`s in our queue, and generating the min/max of both the `@in` and the `@out` stack.

Now for the windowed max range problem. We can start by enqueueing the first `w` items of our array, where `w` is the length of our window. We can generate the max range of this window by subtracting the queue's min from the queue's max. We can then inch our queue through the array by dequeueing the first item that entered the queue (remember: this is an `O(1)` operation) and enqueueing the next item in the array. If the max range for this window is greater than the old max range, we replace it with the new max range. We stop when we reach the end of the array.

Iterating through our array and enqueueing/dequeueing each item takes `O(n)` time, and all the other operations are `O(1)`, for a total time complexity of `O(1)` and an additional space complexity of `O(n)`.




-------


## Hash Directory

Suppose a hash representing a directory. All keys are strings with
names for either folders or files. Keys that are folders point to
nested hashes. Keys that are files point to "true". Write a function
that takes such a hash and returns an array of strings with the path to
each file in the hash.

**Example:**

```ruby
files = {
  'a' => {
    'b' => {
      'c' => {
        'd' => {
          'e' => true
        },

        'f' => true
      }
    }
  }
}

file_list(files) # => ['a/b/c/d/e', 'a/b/c/f']
```

### Solution

```ruby
def file_list(hash)
  files = []

  hash.each do |item, nested_item|
    if nested_item.is_a?(Hash)
      folder = item
      nested_files = file_list(nested_item)
      nested_files.each { |file| files << "#{folder}/#{file}" }
    else
      files << item
    end
  end

  files
end
```

The most difficult part of this problem is figuring out how to parse the file tree and what to return. We know that each call to `file_list` should return an array of files.

When we iterate through the keys of our hash, our base case is that we find a key that points to `true` - this means we've found a file. We can add it directly into our results array. Otherwise, we know we need to make a recursive call to `file_list`. The recursive call will ultimately return an array of files. We can map over this list and add each item to our results array, making sure that we put the items into the results in the format `"#{folder}/#{file}"` so that we know how the results are nested.




-------


## `find_missing_number`

Assume an array of non-negative integers. A second array is formed by
shuffling the elements of the first array and deleting a random
element. Given these two arrays, find which element is missing in the
second array. Do this in linear time with constant memory use.

### Solution

```ruby
def find_missing_number(array1, array2)
  array1.reduce(:+) - array2.reduce(:+)
end
```

Simpler than you think! Find the sums of the arrays and subtract the array with an item missing - the result should be the missing item. Time complexity: `O(n)`.

## `is_shuffle?`

Given three strings, return whether the third is an **interleaving**
of the first two. Interleaving means it only contains characters from
the other two, no more no less, and preserves their character
ordering. "abdecf" is an interleaving of "abc" and "def". Note that
the first two strings needn't be in alphabetical order like these.

You may assume that the first two strings do not contain any
characters in common.

Next, relax the assumption that the first two strings contain no
overlap. Analyze the time-complexity of your solution. You may wish to
view this problem recursively.

Example:

```
interleaving?('XXZ', 'XXY', 'XXYXXZ')
=> true
```

Note: make sure you can answer why this won't work with your initial implementation.

### Solution

No repeats:

```ruby
# time: O(n), space: O(1)
def is_shuffle?(str1, str2, str3)
  return false unless str1.length + str2.length == str3.length

  idx1, idx2, idx3 = 0, 0, 0
  while idx3 < str3.length
    if str1[idx1] == str3[idx3]
      idx1 += 1
      idx3 += 1
    elsif str2[idx2] == str3[idx3]
      idx2 += 1
      idx3 += 1
    else
      return false
    end
  end

  true
end
```

For our first implementation, we can assume that characters won't be repeated. We can keep track of three indices, one that steps through the first string, one that steps through the second, and a third that steps through the potential interleaved string. If one of the letters at its current index matches the interleaved string's letter at its current index, we increment both that string's index and the interleaved string's index.
If neither of the strings at its current index matches the interleaved string at its current index, we immediately return false because we've encountered a mystery letter and cannot possibly be interleaved.

Potential Repeats:

```ruby
# O(2**n): `str3.length == n + 1` requires twice the work of
# `str3.length == n`
def is_shuffle?(str1, str2, str3)
  return str1.empty? && str2.empty? if str3.empty?

  if str1[0] == str3[0]
    return true if is_shuffle?(str1[1..-1], str2, str3[1..-1])
  end

  if str2[0] == str3[0]
    return true if is_shuffle?(str1, str2[1..-1], str3[1..-1])
  end

  false
end
```
Imagine that we try to use our initial solution with our first implementation of `is_shuffle?`. Why could `interleaving?('XXZ', 'XXY', 'XXYXXZ')` return false? By default, if we find a matching letter in our first string, we step forward with that index. When we get to the `Y` in our interleaved string, we are still at the first index of the second string will return false. We can resolve this problem by making two recursive calls if both strings match a letter - one where we step forward in the first string, one where we step forward in the second. If either of these finds an interleaving string, we return true immediately. (Our base case is that all strings are empty, meaning that we've stepped through every letter.) Otherwise, if neither possibility is interleaving, we return false. In this case, we make 2 recursive calls for each letter in our interleaving string, for a worst case performance of `O(2**n)`.

## Bonus: Dynamic Programming FTW

Our previous `is_shuffle` solution runs in `O(2**n)` time because each
step might involve 2 solutions of a subproblem of size `n-1`.

That is a terrible time complexity. First, let's change our solution
to an iterative solution using breadth first search, rather than
a recursive depth first search.

```ruby
def is_shuffle?(str1, str2, str3)
  candidates = [[0, 0]]

  until candidates.empty?
    str1_used_len, str2_used_len = *(candidates.shift)
    str3_used_len = str1_used_len + str2_used_len

    if str3_used_len == str3.length
      return true
    end

    if str1[str1_used_len] == str3[str3_used_len]
      candidates << [str1_used_len + 1, str2_used_len]
    end
    if str2[str2_used_len] == str3[str3_used_len]
      candidates << [str1_used_len, str2_used_len + 1]
    end
  end

  false
end
```

This still sucks. It still searches the entire tree, branching out as
much as twice at every step. This will use tons of memory, too,
because it is breadth first.

You can improve it:

```ruby
def is_shuffle?(str1, str2, str3)
  seen_candidates = Hash.new(false)
  candidates = [[0, 0]]

  until candidates.empty?
    str1_used_len, str2_used_len = *(candidates.shift)
    str3_used_len = str1_used_len + str2_used_len

    if str3_used_len == str3.length
      return true
    end

    if str1[str1_used_len] == str3[str3_used_len]
      new_candidate = [str1_used_len + 1, str2_used_len]
      if !seen_candidates[new_candidate]
        candidates << new_candidate
        seen_candidates[new_candidate] = true
      end
    end
    if str2[str2_used_len] == str3[str3_used_len]
      new_candidate = [str1_used_len, str2_used_len + 1]
      if !seen_candidates[new_candidate]
        candidates << new_candidate
        seen_candidates[new_candidate] = true
      end
    end
  end

  false
end
```

If `str1.length == str2.length == str3.length / 2`, then there are
`str.length/2 * str.length/2` possible candidates. That's a memory
usage of `O(n**2)`. But it also means a time complexity of `O(n**2)`.

**Thanks Edward Swernofsky!**



-------


## `binary`

Write a function that takes an integer and returns it in binary form.

### Solution

```ruby
def binary(num)
  result = []

  until num == 0
    result.unshift(num % 2)
    num /= 2
  end

  result.empty? ? "0" : result.join
end
```

To get the binary representation of a number, we simply add each digit into an array by unshifting `num % 2` into the result, then dividing the number by two to get the next digit. Complexity: `O(log n)`

## Factorial

Implement factorial with and without recursion. What is a potential
disadvantage of the recursive way?

What is tail-recursion? Does Ruby have tail-call optimization? Pretend
it did; write a tail-recursive version of `rec_fac`.

### Solution

```ruby
def recursive_fac(num)
  return num if num == 1
  tail_rec(num - 1) * num
end

def tail_recursive_fac(num, prod = 1)
  return prod if num == 1
  return tail_rec_fac(num - 1, prod * num)
end

def iterative_fac(num)
  product = 1
  2.upto(num) { |i| product *= i }

  product
end
```

All of these methods have a time complexity of `O(n)`. A downside to our recursive methods is that we have to create `n` stack frames, leading to an additional space complexity of `O(n)`.

Our stack frames would look like this for a non-tail-call-optimized version:

```
fact(4)
#=> 4 * fact(3)
#=> 4 * ( 3 * fact(2) )
#=> 4 * ( 3 * ( 2 * fact(1) ) )
#=> 4 * ( 3 * ( 2 * 1 ) )
#=> 4 * ( 3 * 2 )
#=> 4 * 6
#=> 24
```

In tail call optimizations, the compiler essentially transforms recursive calls into a loop. Rather than generating many stack frames, each tail recursive call replaces the previous top stack frame. To accomplish this, we need to return a call to the initial method as the last statement in our function. We accomplish this by adding an additional argument which keeps track of the current product. Tail recursion isn't enabled by default in Ruby (replacing the top frame of the callstack makes debugging hard), but you can enable it fairly easily. [Here](http://nithinbekal.com/posts/ruby-tco/) is an excellent resource that talks more about tail recursion in Ruby and how to use it.




---------


## `max_unique_psub`

Given a string, find the lexicographically greatest
pseudo-substring.

Example (read on for further explanation):

```
max_unique_psub('abcdef')
=> 'f'

max_unique_psub('abcdefedcba')
=> 'fedcba'

max_unique_psub('algorithms')
=> 'ts'
```

Let's define a **pseudo-substring**: `psub` is any subset that is ordered by index. (Differs from a standard substring because it does not need to be contiguous.)

For example:

```
"ac" is a psub of "acb"
"cb" is a psub of "acb"
"bc" is _not_ a psub of "acb" (letters are out of order)

psubs("acb") == [
  "a",
  "ac",
  "acb",
  "ab",
  "c",
  "cb",
  "b"
]
```

Next, let's define **lexicographical order**:

* `str1 > str2` IF
* (a) `str1 != str2` AND EITHER
* (b1) `str2` is a prefix of `str1` OR
* (b2) at the first position at which `str1` and `str2` differ (say
  `i`), `str1[i] > str2[i]`.

For instance: `"abc" > "ab"` and `"acb" > "abc"`.

With this information, given a string `str`, find the lexicographical greatest psubstring.

Solve it first by generating all psubstrings and picking
the greatest (in Big-Oh, how many are there?).

Next, improve your algorithm to do this in `O(n)` time.

## Solution

```ruby
# O(n**2)
def max_unique_psub(str)
  psub = str[str.length - 1]

  (str.length - 2).downto(0) do |i|
    next if str[i] < psub[0]
    # CAREFUL: this takes O(n) in the inner loop to copy the contents of
    # psub to create the new string.
    psub = str[i] + psub
  end

  psub
end
```

In our first solution, we walk backwards through a string, starting from the last index. Every time we find an element that is greater than our first element, we know that we've found a new first element of our pseudo-substring, and we push it to the front.

This solution takes `O(n**2)` - the loop through the string's indices takes `O(n)` and copying the contents of psub over takes `O(n)`. We can do slightly better by simply pushing the element into the array and reversing at the end.

```ruby
# Slight rewriting that is O(n)
def max_unique_psub(str)
  psub_arr = [str[str.length - 1]]

  (str.length - 2).downto(0) do |i|
    next if str[i] < psub_arr.last
    # this is amortized O(1) time.
    psub_arr << str[i]
  end

  psub = psub_arr.reverse.join("")
  psub
end
```




--------


## `permutations`

Write a method that takes an array and returns all its
permutations. Time/memory complexity should be proportional to the
number of permutations; what is this?

Example:

```ruby
permutations([1,2,3])
=> [[1, 2, 3], [2, 1, 3], [2, 3, 1], [1, 3, 2], [3, 1, 2], [3, 2, 1]]

```

Bonus:

Write a class, `PermutationIterator`, that will iterate
through permutations of an array. It should use `O(n)` memory, and
return the "next" permutation in `O(1)` time. It can iterate through
permutations in whatever order you desire.

### Solution

```ruby
# O(n!)
def permutations(arr)
  return [[]] if arr.empty?

  perms = []
  arr.length.times do |i|
    # Choose an element to be first
    el = arr[i]
    rest = arr.take(i) + arr.drop(i + 1)

    # Find permutations of the rest, and tack the first `el` at front.
    new_perms = permutations(rest).map { |perm| perm.unshift(el) }
    perms.concat(new_perms)
  end

  perms
end
```

For an array of length `n`, there will be `O(n!)` permutations - the solution is `O(n!)` for both time and space complexity. We find permutations recursively, returning `[[]]`, the empty set of permutations, as our base case. We can then find the permutations of any array by iterating through the array, removing each element in turn (`arr.take(i) + arr.drop(i + 1)`) then finding the permutations of the remaining elements. We then unshift the removed element into each of those permutations.

## Truckin'

Given a fleet of 50 trucks, each with a full fuel tank and a range of
100 miles, how far can you deliver a payload? You can transfer the
payload from truck to truck, and you can transfer fuel from truck to
truck. Assume all the payload will fit in one truck.

### Solution

First, note that we have enough fuel for `50 * 100 == 5,000` truck
miles. Our problem is that we can't put all the fuel on a single
truck.

Instead, begin by driving all 50 trucks simultaneously. After two
miles, we will have burned `50 * 2 = 100` miles worth of fuel. This is
one trucks worth of fuel. Because we only have 49 trucks worth of fuel
left, it is unnecessary to drive all 50 trucks any more, because we
can fit all the fuel in 49 trucks.

Therefore, at the two mile mark, transfer all the fuel from one truck
to the other trucks. Leave an empty truck at the two mile mark. All
the other trucks are totally full of fuel.

Next, drive the remaining 49 trucks for `100/49` miles. After `100/49`
miles, we'll have burned another 100 miles worth of fuel, so we can
fit all the fuel in the remaining 48 trucks.

Continue like this until there is only one truck left, and it runs out
of fuel.

Let's calculate how many miles we can drive:

* 50 trucks of fuel: `100/50` miles
* 49 trucks of fuel: `100/49` miles
* 48 trucks of fuel: `100/48` miles
* ...
* 1 truck of fuel: `100/1` miles

Thus, you can then add up `100/50 + 100/49 + 100/48 + ... + 100/1`. This
is  ~449.9.
```




--------


## `cyclic?`

Consider a linked list. Each link in the list holds a `next` reference
to the next item in the list, except for the final link, which points
to `nil`.

It is possible to have a "list" without any end, which loops back on
itself. Possibilities:

```
A -> B -> C -> A -> ...
A -> B -> C -> B -> ...
```

Write a method `cyclic?(first_link)`, which will return true if a list
is cyclic. Your first version may use `O(n)` memory. Next, write a
version which uses `O(1)` memory; you'll probably need a different
approach.

### Solution

```ruby
def cyclic1?(first_link)
  set = Set.new

  current_link = first_link
  until current_link.nil?
    # if list is cyclic, must loop back on itself eventually
    return true if set.include?(current_link)
    set << current_link

    current_link = current_link.next
  end

  false
end
```

In our first edition of `cyclic?` we use a set. We iterate through the links and add each seen link to a set. If we encounter a link we've already seen, we return true because it means we've found a cycle. If we make it all the way to the end (`current_link.nil?`) we return false. This takes up `O(n)` space; we can do better.

```ruby

def cyclic2?(first_link)
  slow_runner = first_link
  fast_runner = first_link

  while true
    2.times do
      fast_runner = fast_runner.next
      return false if fast_runner.nil?
      return true if fast_runner == slow_runner
    end

    slow_runner = slow_runner.next
  end
end
```

In this solution, we use a classic "tortoise and hare" strategy. We keep track of a slow link and a fast link, incrementing the fast link by two steps each time we increment the slow link by one. Eventually, either the fast link reaches the end (`fast_runner.nil?`) or the slow link will equal the fast link, indicating that the fast link has looped back around and found a loop. This solution takes up `O(1)` space.

## `converging_node`

Given two singly-linked lists of (possibly) differing lengths that
converge at some point, find the node at which they converge.

### Solution

```ruby
def converge?(a, b)
  difference = find_difference(a, b)

  a_runner = a
  b_runner = b

  if difference > 0
    difference.times do
      b_runner = b_runner.next
    end
  else
    (-difference).times do
      a_runner = a_runner.next
    end
  end

  until a_runner.nil?
    return true if a_runner == b_runner
    a_runner = a_runner.next
    b_runner = b_runner.next
  end

  false
end

def find_difference(a, b)
  difference = 0

  a_runner = a
  b_runner = b

  until a_runner.nil? && b_runner.nil?
    if a_runner.nil?
      difference += 1
      b_runner = b_runner.next
    elsif b_runner.nil?
      difference -= 1
      a_runner = a_runner.next
    else
      a_runner = a_runner.next
      b_runner = b_runner.next
    end
  end

  difference
end
```

Imagine two runners, running at the same speed across the linked
lists. If one list is longer than the other, the shorter list's runner
will reach the end first. The difference between the two runners'
times is the difference in length between the two lists. Knowing this,
we can give one runner a head-start of a distance equivalent to the
difference in length between the two lists. Then traversing both lists
at equal speed will result in the two runners colliding at the
intersection point.


-------

## Fun with `NaN`

In JavaScript, what is `NaN` and what is its type?  How can you test if a value is equal to `NaN`?

## `next_largest`

Given a node in a Binary Search Tree, find the node with the next
largest value. Assume you don't have the root of the tree, just a
single node from it.

### Solution

```ruby
# O(log(n)) if BST is balanced
def next_largest(node)
  if node.right
    # find smallest node to the right
    return left_most_node(node.right)
  end

  # no nodes to the right; climb up
  until true
    parent_node = node.parent
    if parent_node.nil?
      # at the top of the tree, and nothing bigger to the right.
      return nil
    elsif parent_node.left == node
      # parent is bigger than us
      return parent_node
    else
      # parent is smaller, keep climbing.
      node = parent_node
    end
  end
end

def left_most_node(node)
  # keep going down and to the left
  node = node.left until node.left.nil?

  node
end
```

In this solution we have two cases. In the first case, the node has a node to the right. If this is the case, we can find the next largest node by going to the node's right, then finding the left-most node from that tree.

Example: (pseudocode)

```ruby
        5
      /   \
    2       7
  /   \   /   \
1      3 6     8

left_most_node(node_5)
=> node_6
```

If we pass in `node_x` there is nothing to the right, we instead look up to the parent node. If there is no parent, `node_x` is the largest node. If the parent's right node is `node_x`, the parent is smaller, so we move upwards again.

Example: (pseudocode)

```ruby
        5
      /   \
    2       7
  /   \   /   \
1      3 6     8

left_most_node(node_3)
=> node_5
```

## `isBalancedTree`

Write a JavaScript function to check if a binary tree is balanced. A
tree is balanced if, at every node, the depth of subtree on the left
hand side is equal to the depth of the subtree on the right (plus or minus
one).

### Solution

In our brute-force solution, we traverse our tree, finding the depth at each node using a helper `getDepth` function, which travels all the way to the leaf nodes of the tree and returns a depth. We then make recursive calls to make sure that both the left and right sides of the tree are also balanced. `getDepth` takes `O(n)` time, where `n` is the number of nodes, and `isBalanced` takes `O(n)` time, since we must call it once for each node. This leads to a total time complexity of `O(n**2)`.

```js

// Take in the root node
function isBalanced (node) {
  // Base case: the tree is empty.  Return true.
  if (!node) {
    return true;
  }

  // Get the depths of left and right subtrees and compare
  var leftDepth = getDepth(node.left);
  var rightDepth = getDepth(node.right);
  var depthDiff = Math.abs(leftDepth - rightDepth);

  // The tree is balanced if both subtrees are balanced AND
  // the difference in depths of those subtrees is between -1 and 1
  return (isBalanced(node.left) && isBalanced(node.right)) && depthDiff < 2;
}

function getDepth (node) {
  // Base case: empty tree.  Depth is 0.
  if (!node) {
    return 0;
  }

  // Take the larger depth of the two subtrees, calculated recursively
  return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
}
```

We can do better by avoiding repetitive calls to `isBalanced`. Rather than checking all the way to the leaf nodes at each point in our tree, we can simply make it to the leaf nodes first and return a depth as we traverse back up.

```javascript
function isBalanced (node) {
  return isBalancedNode(node).isBalanced;
}

function isBalancedNode (node) {
  if (!node) {
    return {isBalanced: true, depth: -1};
  }

  let left = isBalancedNode(node.left);
  let right = isBalancedNode(node.right);

  if (left.isBalanced && right.isBalanced &&
        Math.abs(left.depth - right.depth) <= 1) {
    return {isBalanced: true, depth: Math.max(right.depth, left.depth) + 1};
  } else {
    return {isBalanced: false, depth: 0};
  }
}
```

In this solution, we use a helper function `isBalancedNode` which returns an object containing both whether a node is balanced, and the depth. In our base case, we find a null node which returns true with a depth of -1. In our recursive step, we check the left and right nodes. If either is unbalanced, or if the difference between their depths is more than one, we set the `isBalanced` property of the returned object to false. We call this helper function from our main function and then call the `isBalanced` property of the object to get our result. This solution only needs to visit every node once, so it takes only `O(n)` time with `O(1)` extra space.



---------

## Hoisting

What is hoisting in JavaScript?  Give an example of how it might be used.

## `is_bst?`

Given a binary tree, write a function to check whether it’s a binary
search tree or not.

### Solution

```ruby
# O(n): must check every node (stops at first detected violation).
def is_bst?(node, min = nil, max = nil)
  return true if node.nil?

  # does this node violate constraints?
  if (min && (min > node.value)) || (max && (max < node.value))
    return false
  end

  # this node follows constraints; do its children, too?
  is_bst?(node.left, min, node.value) && is_bst?(node.right, node.value, max)
end
```

We can check to see if a tree is a BST recursively. We know that in a valid BST, all nodes to the left of a given node must have a lower value, and all nodes to the right of a given node have a greater value. With this in mind, as we traverse each node, we return `true` if a node is `nil` (we've reached the leaves of our tree), and return `false` if a node's left and right leaves do not satisfy the BST property. We then make our recursive call on the left and right children, passing in the min and max constraints that they must satisfy. The time complexity of this solution is `O(n)` since we need to visit each node once.

## `findCommonAncestor`

Find the lowest common ancestor of two nodes in a binary search
tree. Write the function in JS. Assume I give you both the root and
the two nodes.

### Solution

```js
// O(log(n))
function findCommonAncestor(root, nodeA, nodeB) {
  var currentNode = root;
  while true {
    if (currentNode == nodeA || currentNode == nodeB) {
      // one is the descendent of the other.
      return currentNode;
    }

    // is one of the nodes on the left, and the other on the right?
    var bothOnRight = ((currentNode.value < nodeA.value) &&
      (currentNode.value < nodeB.value));
    var bothOnLeft = ((currentNode.value > nodeA.value) &&
      (currentNode.value > nodeB.value));
    var onSameSide = bothOnRight || bothOnLeft;

    if (!onSameSide) {
      // the two nodes are on different sides.
      return currentNode;
    }

    currentNode = bothOnRight ? currentNode.right : currentNode.left;
  }
}
```

In this solution, we can simply use the BST property to find the lowest common ancestor in `O(log(n))` time. We know that for two nodes, if one of the nodes is on the left of the parent and one is on the right (or if one of the nodes is the parent), the parent must be the lowest common ancestor. Otherwise, if both nodes are on the left or right, there must be a lower common ancestor so we search that side. This solution takes `O(log(n))` where `n` is the number of nodes because in the worst case, we will have to traverse the height of the tree.



--------


## `rand7`

Write a method to generate a random integer `(0...7)`, given a method
that generates a random integer between `(0...5)`. The resulting rand7
distribution must be uniform.

### Solution

```ruby
def rand7
  while true
    # construct a random number (0...5**2)
    # (0, 5, 10, 15, 20) + (0, 1, 2, 3, 4)
    num = 5 * rand5 + rand5
    return (num % 7) if num < 21

    # we reject 21, 22, 23, 24; we'll choose another number in that
    # case.
  end
end
```

Let's walk through the above solution. First off, why can't we do something like this:

```ruby
def rand7
  sum = 0
  7.times do
    sum += rand5
  end

  sum / 7
end
```

We can't use the above code, because our distribution would not be even - we would see a bell curve where it would be much more likely to get values in the middle of the curve than values like 0. (Think of rolling two dice - 7 is a much more likely than a 2 or 12).

In the correct code, we generate a random number with even distribution between 0 and 24 with the line `num = 5 * rand5 + rand5`. Prove to yourself that this number is randomly distributed. We then reject the number and try again if it is > 21 (to ensure even distribution), or if it is <= 21, we return the number % 7 (this will return evenly distributed numbers in the range 0...7).

## Matchsticks

You have two sticks and a matchbox. Each stick takes exactly an hour
to burn from one end to the other.

The sticks are weird, in that they do not burn at a steady. If you
break a stick in half, it is not guaranteed that each half will take
30min to burn.

How would you measure exactly 45 minutes by burning these sticks?

### Solution

Take stick1, light it at both ends. At the same time, light stick2 at
one end.

When stick1 is extinguished, 30min have passed. Now, light stick2 at
the other end. The stick will take another 15min to finish burning.


------

## Design Principles

What are some important considerations when deciding how to design a new application or software development project?

## Sudoku

How would you write a program to solve Sudoku? (high level description)

1. Loop through all the empty cells, and for each cell generate a list of possible values. If a cell has only one possible value, fill it in.
2. Starting from the cells that have the shortest list of possible values, try the value, and recurse to see if the puzzle can be solved.

## Square Root

Implement a square root function that uses only addition, subtraction, multiplication and division in less than linear time. You may assume that input is always a perfect square.

Hint: One naive solution has a better time complexity than many people realize--iterating from 0 until the square root is going to be O(sqrt n), not O(n). However, we can do better!

### Solution

```ruby

def sqroot(num, candidates = nil)
  return num if num == 1
  candidates ||= (0..num / 2).to_a
  middle = candidates.length / 2
  case num <=> (candidates[middle] * candidates[middle])
  when -1
      sqroot(num, candidates.take(middle))
  when 0
      middle
  when 1
      sub_answer = sqroot(num, candidates.drop(middle + 1))
      (sub_answer.nil?) ? nil : (middle + 1) + sub_answer
  end
end
```

You know it won't be as fast as constant time, but it could be logarithmic.
What's our favorite logarithmic algorithm? Binary search! Simply bsearch the candidate options.


## Word Chains

Given a source word, target word and an English dictionary, transform
the source word to target by changing/adding/removing 1 character at a
time, while all intermediate words being valid English words. Return
the transformation chain which has the smallest number of intermediate
words.

### Solutions

[Word chain solutions from curriculum.](https://github.com/appacademy/curriculum/blob/master/ruby/projects/word_chains/solution/02_word_chains.rb)

```ruby
# I use Ruby's `Set` class for collections I need to call `#include?`
# on; `#include?` is much faster on a `Set` than an `Array`. Don't
# worry, Arrays would work fine, too, just more slowly.
require 'set'

=begin
  Man is born free, and everywhere he is in chains. -- Rousseau
=end

class WordChainer
  attr_reader :dictionary

  def initialize(dictionary_file_name)
    @dictionary = File.readlines(dictionary_file_name).map(&:chomp)
    @dictionary = Set.new(@dictionary)
  end

  def run(source, target)
    @current_words, @all_seen_words = [source], { source => nil }

    until @current_words.empty? || @all_seen_words.include?(target)
      explore_current_words
    end

    build_path(target)
  end

  def adjacent_words(word)
    # variable name *masks* (hides) method name; references inside
    # `adjacent_words` to `adjacent_words` will refer to the variable,
    # not the method. This is common, because side-effect free methods
    # are often named after what they return.
    adjacent_words = []

    # NB: I gained a big speedup by checking to see if small
    # modifications to the word were in the dictionary, vs checking
    # every word in the dictionary to see if it was "one away" from
    # the word. Can you think about why?
    word.each_char.with_index do |old_letter, i|
      ('a'..'z').each do |new_letter|
        # Otherwise we'll include the original word in the adjacent
        # word array
        next if old_letter == new_letter

        new_word = word.dup
        new_word[i] = new_letter

        adjacent_words << new_word if dictionary.include?(new_word)
      end
    end

    adjacent_words
  end

  def explore_current_words
    new_current_words = []
    @current_words.each do |current_word|
      adjacent_words(current_word).each do |adjacent_word|
        next if @all_seen_words.key?(adjacent_word)

        new_current_words << adjacent_word
        @all_seen_words[adjacent_word] = current_word
      end
    end

    @current_words = new_current_words
  end

  def build_path(target)
    path = []
    current_word = target
    until current_word.nil?
      path << current_word
      current_word = @all_seen_words[current_word]
    end

    path.reverse
  end
end

if $PROGRAM_NAME == __FILE__
  # provide file name on command line
  p WordChainer.new(ARGV.shift).run("duck", "ruby")
end
```



-------


## Reduxifying

Describe the Redux architecture and how Redux interacts with React.

## `print_spiral`

Given a square matrix in the form of a 2D array-of-arrays, return an
array consisting of the values of the array in "spiral order" (top row,
then right hand side, then bottom in reverse, then up, the back
again...).

### Solution

```ruby
def print_spiral(a)
  a = a.deep_dup(1)
  result = []

  while true
    break if a.length == 0 || a[0].length == 0

    # remove the first row
    result.concat(a.shift)
    break if a.length == 0 || a[0].length == 0

    # remove the right side
    a.each { |row| result << row.pop }
    break if a.length == 0 || a[0].length == 0

    # remove the bottom row
    result.concat(a.pop.reverse)
    break if a.length == 0 || a[0].length == 0

    # remove the left side
    a.reverse.each { |row| result << row.shift }
  end

  result
end
```

In this solution, we assume that the the array class has been monkey patched with a deep-dup function - we don't want to ruin our original array! From there, we proceed by removing the top, right, then bottom, then left in order. If at any point our array is empty, we break out of the loop. This solution takes `O(mn)` because we have a loop that must go through each element.



------


## Being Managed

Describe a time you disagreed with your manager and how you handled it.

**NB**: if you haven't been employed before, replace "manager" with another authority figure like a professor or teacher.

## `streaming_sample`

You know how to use `rand` to randomly sample an element from an
array.

Now, write a function that, given an input stream of objects, will
sample a value. The stream has limited length.

* Use only `O(1)` memory.
* Every value in the stream should have an equal probability of being
  sampled.

### Solution

```ruby
def streaming_sample(stream)
  sample = stream
  num_els = 1 #needs to set to the first stream because otherwise first one never gets picked

  while true
    next_value = stream.next_value
    break if next_value.nil?

    # keep sample with probability 1 / (num_els + 1)
    keep_prob = 1.fdiv(num_els + 1)
    sample = next_value if rand() < keep_prob

    num_els += 1
  end

  sample
end
```

Let's prove this works by **induction**. First, note that for `num_els
= 1`, this says we keep the previous sample (`nil`), with probability
`0`. So after 1 element, every element has an equal chance of being
sampled (the only element is selected with probability `1`).

Next, assume that we've iterated through `m` elements, and that the
streaming sample has selected an element (so far) with equal
probability `1/m`. Then the probability of keeping the current sampled
element after considering the `m + 1`th element is `1 / m * m / (m +
1) == 1 / (m + 1)`. Likewise, the probability of selecting the `m +
1`th element is `1 / (m + 1)`.


-------


## `filterLinkedList`

Write a double-ended `LinkedList` class in JavaScript.

* You should have a `Link` class
    * It should keep a reference to `next` and `prev`.
* You should have a `LinkedList` class
    * It should have `first` and `last` methods to return the
      first/last links in the list, or `undefined` if the list is empty.
    * It should have `push` and `pop` methods.
    * You should write a `remove` method that takes in a value and removes the first link found with that value.

Given a linked list of integers and an integer value, delete every
node of the linkedlist containing that value. Use JavaScript.

### Solution

```js
class Link {
  constructor(value) {
    this.next = null;
    this.prev = null;
    this.value = value;
  }
}

class LinkedList {
  constructor() {
    this.head = new Link();
    this.tail = new Link();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  isEmpty() {
    return this.head.next === this.tail;
  }

  first() {
    if (this.isEmpty()) return null;
    return this.head.next;
  }

  last() {
    if (this.isEmpty()) return null;
    return this.tail.prev;
  }

  find(val) {
    let link = this.first();
    while (link) {
      if (link.value === val) {
        return link;
      }

      link = link.next;
    }
  }

  remove(val) {
    let nodeToRemove = this.find(val);
    if (!nodeToRemove) return;
    let before = nodeToRemove.prev;
    let after = nodeToRemove.next;

    before.next = after;
    after.prev = before;
    nodeToRemove.prev = null;
    nodeToRemove.next = null;

    return nodeToRemove;
  }

  push(val) {
    const link = new Link(val);
    let last = this.tail.prev;
    last.next = link;
    link.prev = last;
    link.next = this.tail;
    this.tail.prev = link;
  }

  pop() {
    if (this.isEmpty()) return;
    const last = this.last();
    const newLast = last.prev;

    newLast.next = this.tail;
    this.tail.prev = newLast;
    last.next = null;
    last.prev = null;
    return last;
  }

  removeAll(val) {
    let link = this.head.next;

    while (link !== this.tail) {
      if (link.value === val) {
        let before = link.prev;
        let after = link.next;

        before.next = after;
        after.prev = before;
        link.prev = null;
        link.next = null;
        link = after;
      } else {
        link = link.next;
      }
    }
  }
}
```

Our `removeAll` function goes through the list and removes every link matching the value by connecting the nodes before and after the node to remove. It goes through the list once, so it uses `O(n)` time.

## `median`

Given two **sorted** arrays, find the median element amongst the two
arrays. That is, if both arrays were combined, find the median element
from the combined array. Assume that there is not enough memory to
actually combine both arrays. There exists an O(log n + log m)
solution.

### Solution

Since they are sorted, you can find the middle element of each to find
the medians of each list. The actual median is now somewhere in
between these two numbers. You can then discard the non-relevant
portions of each list. Repeat the process. When the middle elements
from both lists converge, you have now found the median element.


------


## The Big Why

Why should we hire you for Position X?

**NB**: this may change from company to company slightly, but you should be able to answer it somewhat generically.

## `duplicates` (from LeanData)

Write a method that takes an array and returns its duplicate values. Use less than O(n*n) time.

```ruby
 def duplicates(arr)
   values = Set.new
   copies = Set.new

   arr.each do |value|
    if values.include?(value)
     copies << value
    else
     values << value
    end
   end

   return copies
end
```

In this solution, we use sets. Because sets have `O(1)` lookup time, we solve the problem in a time complexity of `O(n)`.

## `choose_a_record` (also LeanData)

Write a method that takes a hash of symbol keys, for which the values are integers representing each key's weight. The method returns a key such that the chances of selecting a particular key are weighted by that key's value.

For the hash {:a => 1, :b => 2, :c => 3}, the chance of returning :c is 1/2, :b is 1/3, and :a is 1/6.

### Solution

```ruby
def key_chance(hash)
  total = hash.values.inject(&:+)
  selection = rand(total)

  sum = 0
  hash.each do |k, v|
    sum += v
    if selection < sum
      return k
    end
  end
end
```

In this solution, we start by finding the total of the hash's values. We can then generate a random number from (0...total). We then iterate back through our hash, keeping track of a sum along the way. If our selection falls below the sum at any point, we are in the portion of the hash and return the key.



--------


## Strengths and Weaknesses

What do you consider to be your biggest strength?  Biggest weakness?

## Connected Components

You are given a file which looks like so:

```
AA BB
DD FF
CC EE
EE DD
```

Each line of the file contains a pair of strings. Each string
represents is the name of a **vertex**. The line represents an
**edge** connecting two vertices.

Your task is to find the **connected components** of the graph. A
connected component is a subset of vertices all connected to each
other. In this example, the connected components are `[["AA", "BB"],
["CC", "DD", "EE", "FF"]]`.

You don't have to return the elements of the components in any
particular order.

### Solutions

```ruby
# Running time is linear in the number of edges.

lines = File.readlines(FILE_NAME)

matrix = {}
lines.each do |line|
  v1, v2 = line.split(" ")
  matrix[v1] ||= []
  matrix[v1] << v2
  matrix[v2] ||= []
  matrix[v2] << v1
end

components = []
until matrix.empty?
  component = []

  first_key = matrix.keys.first
  queue = [first_key]
  until queue.empty?
    key = queue.shift
    next unless matrix.has_key?(key)
    neighbors = matrix.delete(key)

    component << key
    queue.concat(neighbors)
  end

  components << component
end
```

In this solution, we start by reading in the file. We will represent our graph as a hash in which the keys represent each vertex, and the values are an array of their connections (the other vertices).

From there, we can generate a list of connected components by traversing our hash. We start by taking an arbitrary key from our hash and breadth first searching for connected vertices. We start a queue as well as an array representing our component. We search outwards, adding each key to the component and deleting it from the hash as we encounter it. We then add its neighbors to the queue. When our queue is empty, we've finished our current component, and check the next key in our hash to grab the next component.
