import {
  Vector
} from "./../vector";

test.each `
  a             | b               | dot
  ${[0,0]}      | ${[0,0]}        | ${0}
  ${[0,0]}      | ${[1,1]}        | ${0}
  ${[1,1]}      | ${[0,0]}        | ${0}
  ${[1,1]}      | ${[1,1]}        | ${2}
  ${[123,321]}  | ${[-123,-321]}  | ${-118170}
`("$a dot $b should give $dot", ({
  a,
  b,
  dot
}) => {
  const vectorA = new Vector(a);
  const vectorB = new Vector(b);
  expect(vectorA.dot(vectorB)).toEqual(dot);
})

test.each `
  a             | b               | subtract
  ${[0,0]}      | ${[0,0]}        | ${[0,0]}
  ${[3,4]}      | ${[5,-1]}        | ${[-2,5]}
`("$a subtract $b should give $subtract", ({
  a,
  b,
  subtract
}) => {
  const vectorA = new Vector(a);
  const vectorB = new Vector(b);
  expect(vectorA.subtract(vectorB).direction.coordinates).toEqual(subtract);
})

test.each `
  a             | expected
  ${[0,0]}      | ${[-0,-0]}  
  ${[1,1]}      | ${[-1,-1]}  
  ${[1,-1]}      | ${[-1,1]}  
  ${[123,321]}  | ${[-123,-321]}  
`("$a negeate is $expected", ({
  a,
  expected,
}) => {
  const vectorA = new Vector(a);
  expect(vectorA.negate().getX()).toEqual(expected[0]);
  expect(vectorA.negate().getY()).toEqual(expected[1]);
})