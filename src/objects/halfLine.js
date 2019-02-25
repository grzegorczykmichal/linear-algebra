class HalfLine {
  constructor(origin, direction) {
    this.name = "HalfLine";
    this.origin = origin;
    this.direction = direction.normalize();
  }
}

export {
  HalfLine
};