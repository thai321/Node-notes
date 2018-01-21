// Point = {
//   id: 'A' // UNIQUE
//   x: 5
//   y: 7
// }
//
// function(originId, [Point, Point]) {
//
//   return {
//     bestPath: [Point,Point,Point],
//     bestCost: decimal,
//     worsePath: [Point,Point,Point],
//     worseCost: decimal
//   }
// }
//
// function dist() {
//
// }
const points = [
  { id: 0, x: 0, y: 0 },
  { id: 1, x: 2, y: 1 },
  { id: 2, x: 4, y: 5 }
  // {id: 3, x: 6, y: 2 },
  // {id: 4, x: 3, y: 7 },
];

function TSM(startId, points, result = { path: [], cost: 0 }) {
  const startPoint = points.find(p => p.id === startId);
  const combination = [];

  points.forEach(point => {});

  return startPoint;
}

function permuations(points) {
  if (points.length === 1) return [points];

  const result = [];

  for (let i = 0; i < points.length; i++) {
    const subPoints = permuations([
      ...points.slice(0, i),
      ...points.slice(i + 1)
    ]);
    const subResult = subPoints.map(point => [points[i], ...subPoints]);
    console.log(subResult);
    result.concat(subResult);
  }

  return result;
}

console.log(permuations([2, 3]));

function dist(p1, p2) {
  const xDiff = Math.abs(p1.x - p2.x);
  const yDiff = Math.abs(p1.y - p2.y);
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

// console.log(TSM(2, points));

// const p1 = { x: 2, y: 1 };
// const p2 = { x: 4, y: 5 };
//
// console.log(dist(p1, p2));
