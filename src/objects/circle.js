class Circle {
  constructor(origin, radius) {
    this.name = "Circle"
    this.origin = origin;
    this.radius = radius;
  }

  toString() {
    return `Circle ${this.origin.toString()} Radius ${this.radius}`;
  }

}

export {
  Circle
};