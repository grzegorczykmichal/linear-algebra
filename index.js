import {
  Renderer
} from "./src/renderers";

import {
  Scene
} from "./src/scene";

import {
  Vector,
  Point,
  Line,
  HalfLine,
  Ray,
  Circle
} from "./src/objects";

import {
  zip,
  concat
} from "lodash";
import {
  Intersection
} from "./src/intersection";

const intersectables = ["Line"];



class Camera {
  constructor({
    vector,
    pov
  } = {
    vector: Vector.Origin(2),
    pov: 55
  }) {
    this.vector = vector;
    this.pov = pov;
  }
}

const canvas = document.querySelector("canvas");

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const SIZE = Math.min(WIDTH, HEIGHT);

canvas.setAttribute("width", SIZE);
canvas.setAttribute("height", SIZE);

const ORIGIN = SIZE / 2;

const SCALE = 80;

const CONTEXT = canvas.getContext("2d");

const scene = new Scene(CONTEXT, canvas);
const renderer = new Renderer(CONTEXT, SIZE, ORIGIN, SCALE);




let vs = [];

for (let x = -5; x <= 5; x++) {
  for (let y = -5; y <= 5; y++) {
    vs.push(new Point(x + Math.random(), y + Math.random()));
  }
}
/*
const a = new Vector([1, 1]);
const b = new Vector([-1, 2]);

const c = new Vector([-1, 1], [3, 3]);

const d = b.subtract(a);
d.origin = a.direction;
const fov = 55;

const deg = fov / 2;
const deg2 = -deg;

const degInRad = (deg * Math.PI) / 180;
const deg2InRad = (deg2 * Math.PI) / 180;

const e = new HalfLine(
  new Point(0, 1),
  new Vector([Math.cos(degInRad), Math.sin(degInRad)])
);
const f = new HalfLine(
  new Point(0, 1),
  new Vector([Math.cos(deg2InRad), Math.sin(deg2InRad)])
);

const line1 = new Line(d);

const hl = new HalfLine(new Point(0.5, -1), new Vector([1, 2]));

//const line2 = new Line();
const line3 = new Line(new Vector([0, 1]));

const origin = new Point(0, 0);
// const direction = new Vector([1, 2]);

// const ray = new Ray(origin, direction);

// const start = -3;
// const step = 0.5
// const points = [...Array(12).keys()].map(i => {
//   return ray.getPoint(start + i * step);

// })
// const vectors = points.map(p => new Vector([-1, 0], [p.getX(), p.getY()]))

const direction = new Vector([1, -.2]);
// const ray = new Ray(new Point(0, 0), direction);
const ray = new Ray(new Point(3.908568330833991, -0.7817136661667984), new Vector([0.4253709329334394, 0.9268546646671934]));
const intercections = ray.intersect(circle);
// const intercections2 = ray2.intersect(circle);



// const cx = new Vector([3, 1]);

// const veeee = intercections.map(p => Vector.FromPoint(p));
// const ns = veeee.map(v => new Vector(v.subtract(cx).direction.coordinates, [3, 1]).normalize())
// const norms = zip(intercections, ns).map(([p, v]) => {
  //   v.origin = p;
  //   return v;
  // });
  
  // const n1 = norms[0];
  // const n2 = norms[1];
  
  
  // const ref2 = n2.scale(2 * (direction.negate().dot(n2))).subtract(direction.negate());
  // ref2.origin = intercections[1];
  
  
  // const point = new Point(0, 2);
  // const normal = new Vector([1, -1], [0, 2]);
  // const direction2 = new Vector([1, 1]);
  // const intersection = new Intersection(point, normal, direction2);
  */
// scene.addObject(a, b, c, line1, e);
const circle1 = new Circle(new Point(1, 2), 1);
const circle2 = new Circle(new Point(4, -5), 3);
// const circle3 = new Circle(new Point(-5, 0), 1.2);
const ray = new Ray(new Point(0, 0), new Vector([1, -1]), 0);
// const intercections = ray.intersect(circle);
// const secondRays = intercections.map(i => i.spawn());
// const secondIntercections = concat(...secondRays.map(r => r.intersect(circle)));

scene.addObject(
  new Vector([1, -1]),
  circle1,
  circle2,
  // circle3,
  // ray,
  // ray2,
  // ...secondRays,
  // ...intercections,
  // ...secondRays,
  // ...intercections2
  // ...secondIntercections,
  // point,
  // direction2,
  // normal,
  // bounce,
  // intersection
  // bounce,
  // new Point(0, 0),
  // new Point(1, 1),
  // new Point(1, 0),
  // new Point(0, 1),
  // new Point(0, -1),
  // new Point(-1, -1),
  // new Point(-1, 0),
  // new Point(-1, 1),
  // new Point(1, -1),
  // new Vector([3, 1]),
  // intersection,
  // ray,
  // circle,
  // ...intercections,
  // ...norms,
  // new Ray(intercections[1], ref2)
  // direction,
  // direction,
  // new Vector([-1, 0], ray.getPoint(3)),
  // p1,
  // ...vectors,
  // ray,
  // new Circle(Point.Zero(2), 1)
  // ray.getPoint(-2),
  // ray.getPoint(1),
  // ray.getPoint(-1),
  // ray.getPoint(0),
  // ray.getPoint(-3),
  // Point.Zero(2),
  // new Point(-2, 4),
  // new Point(1, 0),
  // new Point(-1, 0),
  // new Point(0, -1),
  // ...vs,
  // e,
  // f
  // hl,
  // a,
  // line1,
  // line3,
  // b,
  // e, f, c,
  // a.add(b)
);
const objects = scene.objects.filter(n => n.name === "Circle");

ray.cast(objects, 3);

let ints = ray.intersections;

console.log(ints);

// ints = ints.concat(...ints.map(i => concat(...i.intersections).map(j => concat(...j.intersections))));

// console.log({
//   ints
// });


scene.addObject(...ints, ray);

// const intercections = concat(...scene.castRay(ray));

// const scdnIntercections = concat(...concat(...intercections.map(i => i.spawn()).map(r => scene.castRay(r))));
// const thrdIntercections = concat(...scdnIntercections.map(i => i.spawn()).map(r => scene.castRay(r)));

// const allIntersections = concat(...thrdIntercections, ...scdnIntercections, ...intercections);
// scene.addObject(
//   ...allIntersections
// )
// // scene.print();

// scene.addCamera(new Camera({
//   vector: new Vector([1, 1], [1, 1]),
//   pov: 35
// }));

renderer.render(scene);

CONTEXT.save();
CONTEXT.strokeStyle = "rgba(255, 2555, 255, 0.5)";
// CONTEXT.scale(SCALE); // Start a new path
CONTEXT.translate(ORIGIN, ORIGIN); // Start a new path
CONTEXT.beginPath(); // Start a new path
CONTEXT.moveTo(0, 0); // Move the pen to (30, 50)
CONTEXT.lineTo(0.5 * SCALE, 0); // Draw a line to (150, 100)
CONTEXT.stroke(); // Render the path
CONTEXT.beginPath(); // Start a new path
CONTEXT.moveTo(0, 0); // Move the pen to (30, 50)
CONTEXT.lineTo(0, -0.5 * SCALE); // Draw a line to (150, 100)
CONTEXT.stroke(); // Render the path
CONTEXT.restore();

// setInterval(() => {
//   vs = [];
//   for (let x = -5; x <= 5; x++) {
//     for (let y = -5; y <= 5; y++) {
//       vs.push(new Line(new Vector([x + Math.random(), y + Math.random()])));
//     }
//   }
//   scene.replaceObject(
//     ...vs,
//   );
//   renderer.render(scene);
// }, 100)

// scene.onChanged((s) => {
//   renderer.render(s);

// })
// CONTEXT.translate(ORIGIN, ORIGIN);