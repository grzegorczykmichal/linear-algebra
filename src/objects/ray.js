import {
  Point
} from "./point";

import {
  fromPoints
} from "./../math/lineEquation2D";

import {
  Vector
} from "./vector";

import {
  Intersection
} from "../intersection";

import {
  concat
} from "lodash";

class Ray {
  constructor(origin, direction, destination, maxBounce = 2) {
    this.name = "Ray";
    this.origin = origin;
    this.direction = direction;
    this.destination = destination;
    this.intersections = [];
    this.bouncedRays = [];
    this.maxBounce = maxBounce;
  }

  getPoint(t) {
    return new Point(
      this.origin.getX() + t * this.direction.getX(),
      this.origin.getY() + t * this.direction.getY(),
    );
  }

  toEquation() {
    return fromPoints(this.getPoint(0).coordinates, this.getPoint(1).coordinates)
  }

  toString() {
    return `Ray ${this.origin.toString()} -> ${this.direction.toString()}`;
  }

  cast(objects = [], depth = 1) {
    const ints = concat(...objects.map(o => this.intersect(o)).filter(i => i.length > 0));
    this.intersections.push(...ints);

    if (depth - 1 <= 0) {
      return;
    }

    const newRays = concat(...ints.map(i => i.spawn()).map(r => {
      r.cast(objects, depth - 1);
      return r.intersections;
    }));
    this.intersections.push(...newRays);


    // this.intersections.forEach(i => {
    //   const ray = i.spawn();
    //   ray.cast(objects, depth - 1);
    //   i.intersections.push(ray.intersections);
    // });

    // scene.objects.forEach(
    //   obj => {
    //     const ints = this.intersect(obj);
    //     if (ints.length === 0) {
    //       return;
    //     }




    //     const bncdRays = concat(...ints
    //       .map(i => i.spawn())
    //       .map(r => {
    //         r.cast(scene, depth - 1);
    //         return r.intersections;
    //       }));

    //     console.log({
    //       bncdRays
    //     })

    //   }
    // )
  }

  intersect(object) {
    if (object.name !== "Circle") {
      return [];
    }
    const [m, d] = this.toEquation();
    const [a, b] = object.origin.coordinates;
    const r = object.radius

    const delta = (r * r) * (1 + (m * m)) - ((b - (m * a) - d) * (b - (m * a) - d));

    if (delta < 0) {
      console.log("No intersections");
      return []
    }

    if (delta === 0) {
      console.log("Tangent");
      return []
    }

    const x1 = (a + b * m - d * m + Math.sqrt(delta)) / (1 + m * m);
    const x2 = (a + b * m - d * m - Math.sqrt(delta)) / (1 + m * m);

    const y1 = (d + a * m + b * (m * m) + m * Math.sqrt(delta)) / (1 + m * m);
    const y2 = (d + a * m + b * (m * m) - m * Math.sqrt(delta)) / (1 + m * m);

    const cx = new Vector([a, b]);

    const p1 = new Point(x1, y1);
    const p2 = new Point(x2, y2);

    const v1 = Vector.FromPoint(p1);
    const v2 = Vector.FromPoint(p2);

    const n1 = v1.subtract(cx).normalize();
    const n2 = v2.subtract(cx).normalize();

    const i1 = new Intersection(p1, n1, this.direction);
    const i2 = new Intersection(p2, n2, this.direction);

    return [
      i1,
      i2,
    ];
  }
}
export {
  Ray
};