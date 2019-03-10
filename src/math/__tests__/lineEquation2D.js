import {
  fromPoints
} from "../lineEquation2D";

test.each `
  p1         | p2        | slope    | yIntercept
  ${[1,0]}   | ${[2,1]}  | ${1}     | ${-1}
  ${[12,-4]} | ${[1,-3]} | ${-1/11} | ${-32/11}
`("For point $p1 and $p2 slope = $slope and y-intercept = $yIntercept", ({
  p1,
  p2,
  slope,
  yIntercept
}) => {
  const [m, b] = fromPoints(p1, p2);
  expect(m).toEqual(slope);
  expect(b).toEqual(yIntercept);
})