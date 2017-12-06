

```ruby
#  Given an array with arrays of arrays of times where people are busy
#  return all possible times they are all free to schedule a meeting

# input [ [[6,9],[9,10],[12,15]],[[5,7],[11,14],[17,18]],[[6,10],[16,19]] ]
# output [[0,5],[10,11],[15,16],[19,24]]

schedules = [ [[6,9],[9,10],[12,15]],
              [[5,7],[11,14],[17,18]],
              [[6,10],[16,19]] ]

def schedule_meeting(schedules)
  #start with entire day available
  available_times = []
  all_meetings = []
  #iterate thru each persons schedule, block that from being available
  schedules.each do |schedule|
    all_meetings += schedule
  end

  all_meetings.sort!

  (0...(all_meetings.length -  1)).each do |idx|
    if all_meetings[idx+1][0] <= all_meetings[idx][1]
      all_meetings[idx+1][0] = [all_meetings[idx][0], all_meetings[idx+1][0]].min
      all_meetings[idx+1][1] = [all_meetings[idx][1], all_meetings[idx+1][1]].max
      all_meetings[idx] = nil
    end
  end

  all_meetings.compact!
  available_times << [0, all_meetings[0][0]]
  (0...(all_meetings.length - 1)).each do |idx|
    available_times << [all_meetings[idx][1], all_meetings[idx + 1][0]]
  end
  available_times << [all_meetings[-1][1], 24]
  p available_times

end


schedule_meeting(schedules)

```



----------

### A Star


```python
import numpy
from heapq import *


def heuristic(a, b):
    return (b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2

def astar(array, start, goal):

    neighbors = [(0,1),(0,-1),(1,0),(-1,0),(1,1),(1,-1),(-1,1),(-1,-1)]

    close_set = set()
    came_from = {}
    gscore = {start:0}
    fscore = {start:heuristic(start, goal)}
    oheap = []

    heappush(oheap, (fscore[start], start))

    while oheap:

        current = heappop(oheap)[1]

        if current == goal:
            data = []
            while current in came_from:
                data.append(current)
                current = came_from[current]
            return data

        close_set.add(current)
        for i, j in neighbors:
            neighbor = current[0] + i, current[1] + j
            tentative_g_score = gscore[current] + heuristic(current, neighbor)
            if 0 <= neighbor[0] < array.shape[0]:
                if 0 <= neighbor[1] < array.shape[1]:
                    if array[neighbor[0]][neighbor[1]] == 1:
                        continue
                else:
                    # array bound y walls
                    continue
            else:
                # array bound x walls
                continue

            if neighbor in close_set and tentative_g_score >= gscore.get(neighbor, 0):
                continue

            if  tentative_g_score < gscore.get(neighbor, 0) or neighbor not in [i[1]for i in oheap]:
                came_from[neighbor] = current
                gscore[neighbor] = tentative_g_score
                fscore[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                heappush(oheap, (fscore[neighbor], neighbor))

    return False

'''Here is an example of using my algo with a numpy array,
   astar(array, start, destination)
   astar function returns a list of points (shortest path)'''

nmap = numpy.array([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0]])

print astar(nmap, (0,0), (10,13))
```
