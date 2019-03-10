import {
  Ray
} from './objects';

class Intersection {
  constructor(point, normal, direction) {
    this.name = "Intersection";

    this.point = point;

    this.normal = normal.normalize();
    this.normal.origin = this.point;

    this.direction = direction;

    this.bounce = this.normal.scale(2 * (this.direction.negate().dot(this.normal))).subtract(this.direction.negate())

    this.intersections = [];
  }
  spawn() {
    return new Ray(this.point, this.bounce);
  }
}

export {
  Intersection
};