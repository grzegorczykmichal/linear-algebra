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
  HalfLine
} from "./src/objects";

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

const a = new Vector([1, 1]);
const b = new Vector([-1, 2]);

const c = new Vector([1, 1], [1, 1]);

const d = b.subtract(a);
d.origin = a.direction;
const fov = 55;

const deg = fov / 2;
const deg2 = -deg;

const degInRad = (deg * Math.PI) / 180;
const deg2InRad = (deg2 * Math.PI) / 180;

const e = new Vector([Math.cos(degInRad), Math.sin(degInRad)]);
const f = new Vector([Math.cos(deg2InRad), Math.sin(deg2InRad)]);


const line1 = new Line(d);

const hl = new HalfLine(new Point(0.5, -1), new Vector([1, 2]));

// const line2 = new Line();
// const line3 = new Line(new Vector([0, 1]), new Vector([2, 2]));

// scene.addObject(a, b, c, line1, e);
scene.addObject(
  // Point.Zero(2),
  new Point(-2, 4),
  // new Point(1, 0),
  // new Point(-1, 0),
  // new Point(0, -1),
  hl,
  a,
  b,
  line1
  // a.add(b)
);

// scene.addCamera(new Camera({
//   vector: new Vector([1, 1], [1, 1]),
//   pov: 35
// }));


renderer.render(scene);
scene.onChanged((s) => {
  renderer.render(s);
})