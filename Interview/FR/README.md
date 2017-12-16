

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

-------
### Dijsktra algorithm

```python
import sys;
import heapq;

class Edge(object):

  def __init__(self, weight, startVertex, targetVertex):
    self.weight = weight;
    self.startVertex = startVertex;
    self.targetVertex = targetVertex;

class Node(object):
  def __init__(self, name):
    self.name = name;
    self.visited = False;
    self.predecessor = None;
    self.adjacenciesList = [];
    self.minDistance = sys.maxsize;

  def __cmp__(self, otherVertex):
    return self.cmp(self.minDistance, otherVertex.minDistance);

  # less than method since we are using the min heap
  def __lt__(self, other):
    selfPriority = self.minDistance;
    otherPriority = other.minDistance;
    return selfPriority < otherPriority;



class Algorithm(object):

  def calculateShortestPath(self, vertexList, startVertex):
    q = [];
    startVertex.minDistance = 0;
    heapq.heappush(q, startVertex); # turn q into the prority queue (min heap)

    while len(q) > 0:
      actualVertex = heapq.heappop(q);

      for edge in actualVertex.adjacenciesList:
        u = edge.startVertex;
        v = edge.targetVertex;
        newDistance = u.minDistance + edge.weight;

        if newDistance < v.minDistance:
          v.predecessor = u;
          v.minDistance = newDistance;
          heapq.heappush(q, v);

  def getShortestPathTo(self, targetVertex):
    print("Shortest path to vertex is: ", targetVertex.minDistance);

    node = targetVertex;

    while node is not None:
      print("%s " % node.name);
      node = node.predecessor;
```
----------

### Bellman Ford


```python
import sys;

class Node(object):
  def __init__(self, name):
    self.name = name;
    self.visited = False;
    self.predecessor = None;
    self.adjacenciesList = [];
    self.minDistance = sys.maxsize;

class Edge(object):

  def __init__(self, weight, startVertex, targetVertex):
    self.weight = weight;
    self.startVertex = startVertex;
    self.targetVertex = targetVertex;


class BellmanFord(object):
  HAS_CYCLE = False;

  def calculateShortestPath(self, vertexList, edgeList, startVertex):
    startVertex.minDistance = 0;

    for i in range(0, len(vertexList)-1):
      for edge in edgeList:

        u = edge.startVertex;
        v = edge.targetVertex;

        newDistance = u.minDistance + edge.weight;

        if newDistance < v.minDistance:
          v.minDistance = newDistance;
          v.predecessor = u;

    for edge in edgeList:
      if self.hasCycle(edge):
        print("Negative cycle detected...");
        BellmanFord.Has_CYCLE = True;
        return;

  def hasCycle(self, edge):
    if (edge.startVertex.minDistance + edge.weight) < edge.targetVertex.minDistance:
      return True;
    else:
      return False;

  def getShortestPathTo(self, targetVertex):

    if not BellmanFord.HAS_CYCLE:
      print("Shortest path exists with value: ", targetVertex.minDistance);

      node = targetVertex;

      while node is not None:
        print("%s " % node.name)
        node = node.predecessor;
    else:
      print("Negative cycle detected...")
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



---------


```java
package com.interview.dynamic;

import java.util.Arrays;
import java.util.Comparator;

class Job{
    int start;
    int end;
    int profit;
    Job(int start,int end,int profit){
        this.start= start;
        this.end = end;
        this.profit= profit;
    }
}

class FinishTimeComparator implements Comparator<Job>{

    @Override
    public int compare(Job arg0, Job arg1) {
        if(arg0.end <= arg1.end){
            return -1;
        }else{
            return 1;
        }
    }

}

/**
 * http://www.cs.princeton.edu/courses/archive/spr05/cos423/lectures/06dynamic-programming.pdf
 * Given set of jobs with start and end interval and profit, how to maximize profit such that
 * jobs in subset do not overlap.
 */
public class WeightedJobSchedulingMaximumProfit {

    /**
     * Sort the jobs by finish time.
     * For every job find the first job which does not overlap with this job
     * and see if this job profit plus profit till last non overlapping job is greater
     * than profit till last job.
     * @param jobs
     * @return
     */
    public int maximum(Job[] jobs){
        int T[] = new int[jobs.length];
        FinishTimeComparator comparator = new FinishTimeComparator();
        Arrays.sort(jobs, comparator);

        T[0] = jobs[0].profit;
        for(int i=1; i < jobs.length; i++){
            T[i] = Math.max(jobs[i].profit, T[i-1]);
            for(int j=i-1; j >=0; j--){
                if(jobs[j].end <= jobs[i].start){
                    T[i] = Math.max(T[i], jobs[i].profit + T[j]);
                    break;
                }
            }
        }
        int maxVal = Integer.MIN_VALUE;
        for (int val : T) {
            if (maxVal < val) {
                maxVal = val;
            }
        }
        return maxVal;
    }

    public static void main(String args[]){
        Job jobs[] = new Job[6];
        jobs[0] = new Job(1,3,5);
        jobs[1] = new Job(2,5,6);
        jobs[2] = new Job(4,6,5);
        jobs[3] = new Job(6,7,4);
        jobs[4] = new Job(5,8,11);
        jobs[5] = new Job(7,9,2);
        WeightedJobSchedulingMaximumProfit mp = new WeightedJobSchedulingMaximumProfit();
        System.out.println(mp.maximum(jobs));
    }
}
```
