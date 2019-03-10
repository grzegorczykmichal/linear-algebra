import {
  Ray
} from "../ray";

import {
  Circle
} from "../circle";

import {
  Point
} from "../point";

import {
  Vector
} from "../vector";

test("ray intersect with circle", () => {

  const ray = new Ray(new Point(0, 0), new Vector([1, 1]));

  // console.log(ray.toEquation());

  const circle = new Circle(new Point(3, -5), 3)

  const [p1, p2] = ray.intersect(circle);

})

test("ray to equasion", () => {

  const ray = new Ray(new Point(0, 0), new Vector([-2, -1]));
  console.log(ray.toEquation());
})