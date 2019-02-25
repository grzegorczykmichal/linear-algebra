class Point {
  static Zero(dimention = 1) {
    return new Point(...(new Array(dimention).fill(0, 0, dimention)));
  }

  constructor(...coordinates) {
    this.coordinates = coordinates;
  }

  getX() {
    return this.getN(1);
  };

  getY() {
    return this.getN(2);
  };

  getZ() {
    return this.getN(3);
  };

  getN(n) {
    if (this.coordinates.length < n) {
      throw new Error(`Cannot get ${n}-th dimention from ${this.coordinates.length}D point.`);
    }
    return this.coordinates[n - 1];
  }

  contains(point) {

    console.log("Does point contains point", this, point);

    if (point.getX() >= this.getX() - 0.5 && point.getX() <= this.getX() + 0.5 && point.getY() >= this.getY() - 0.5 && point.getY() <= this.getY() + 0.5) {
      return true;
    }

    return false;
  }

}

export {
  Point
};