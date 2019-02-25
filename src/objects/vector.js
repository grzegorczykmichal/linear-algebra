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

  constructor(direction, origin) {
    this.id = uuidv4();
    this.direction = new Point(...direction);
    this.origin = origin ? new Point(...origin) : Point.Zero(direction.length);
  }

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

  dot(vector) {
    return multiplyCoordinates(this.direction.coordinates, vector.direction.coordinates).reduce((a, b) => a + b, 0);
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