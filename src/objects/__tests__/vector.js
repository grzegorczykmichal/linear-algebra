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