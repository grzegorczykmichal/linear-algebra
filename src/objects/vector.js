import {
  add,
  subtract,
  multiply,
  zipWith,
  curry
} from 'ramda';

import {
  Point
} from './point';

import uuidv4 from 'uuid/v4';

const addCoordinates = curry(zipWith(add));
const subtractCoordinates = curry(zipWith(subtract));
const multiplyCoordinates = curry(zipWith(multiply));

class Vector {

  static Origin(dimention = 1) {
    return new Vector(new Array(dimention).fill(0, 0, dimention));
  }

  static Unit(dimention = 1) {
    return new Vector(new Array(dimention).fill(1, 0, dimention));
  }

  static Normal(vector) {
    return vector.normalize();
  }

  static FromPoint(point) {
    return new Vector(point.coordinates);
  }

  constructor(direction, origin) {
    this.name = "Vector";
    this.id = uuidv4();
    this.direction = new Point(...direction);
    this.origin = origin ? new Point(...origin) : Point.Zero(direction.length);
  }

  getDimention() {
    return this.direction.length;
  };


  getX() {
    return this.direction.getN(1);
  };

  getY() {
    return this.direction.getN(2);
  };

  getZ() {
    return this.direction.getN(3);
  };

  getN(n) {
    this.direction.getN(n);
  }

  add(vector) {
    return new Vector(addCoordinates(this.direction.coordinates, vector.direction.coordinates));
  }

  subtract(vector) {
    return new Vector(subtractCoordinates(this.direction.coordinates, vector.direction.coordinates));
  }

  multiply(vector) {
    return new Vector(multiplyCoordinates(this.direction.coordinates, vector.direction.coordinates));
  }

  negate() {
    return new Vector(this.direction.coordinates.map(x => -x));
  }

  dot(vector) {
    return this.multiply(vector).direction.coordinates.reduce((a, b) => a + b, 0);
  }

  cross(vector) {

    if (this.getDimention() !== 3 && vector.getDimention() !== 3) {
      throw (new Error("Cross product allowed only in R\u00b3"))
    }

    const x = this.getY() * vector.getZ() - this.getZ() * vector.getY();
    const y = this.getZ() * vector.getX() - this.getX() * vector.getZ();
    const z = this.getX() * vector.getY() - this.getY() * vector.getX();

    return new Vector(x, y, z);
  }

  scale(scalar) {
    return new Vector(this.direction.coordinates.map(a => a * scalar));
  }

  normalize() {
    return this.scale(1 / this.length());
  }

  length() {
    return Math.sqrt(
      this.direction.coordinates
      .map(a => a * a)
      .reduce((a, c) => {
        a += c;
        return a;
      }, 0)
    );
  }

  toString() {
    return `Vector <${this.origin.coordinates}> \u2192 <${this.direction.coordinates}>`;
  }
}

export {
  Vector
};