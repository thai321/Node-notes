require 'byebug'
require 'benchmark'

points = [
  { id: 0, x: 0, y: 0 },
  { id: 1, x: 3, y: 4 },
  { id: 2, x: 4, y: 5 },
  { id: 3, x: 6, y: 2 },
  { id: 4, x: 3, y: 7 },
  { id: 5, x: 12, y: 10 },
  { id: 6, x: 43, y: 22 },
  { id: 7, x: 42, y: 28 },
  { id: 8, x: 123, y: 99 },
  { id: 9, x: 55, y: 63 },
  { id: 10, x: 555, y: 603 }
];

def TSM(startId, points)
  startPoint = points.find { |point| point[:id] == startId}
  otherPoints = points.reject { |point| point[:id] == startId }

  combination = permutations(otherPoints)
  routes = []
  combination.each do |route|
    total = 0;
    current = startPoint
    route.each do |p|
      total += dist(current, p)
      current = p
    end
    routes.push({ route: [startPoint] + route , cost: total })

  end
  routes.sort_by! { |route| route[:cost]}

  return {
    bestPath: routes.first[:route],
    bestCost: routes.first[:cost],
    worsePath: routes.last[:route],
    worseCost: routes.last[:cost]
  }
end

def permutations(points)
  return [points] if points.length == 1

  result = []
  points.each_index do |i|
    subArrays = permutations(points[0...i] + points[(i + 1)..-1])
    result += subArrays.map { |subArr| [points[i]] + subArr  }
  end
  result
end

def dist(p1, p2)
  xDiff = (p1[:x] - p2[:x]).abs
  yDiff = (p1[:y] - p2[:y]).abs
  return Math.sqrt(xDiff**2 + yDiff**2);
end

# p permutations(points)
# p dist(points[0], points[1])
time = Benchmark.measure {

  p TSM(0, points)
}
puts time
