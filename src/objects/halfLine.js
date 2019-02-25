class HalfLine {
  constructor(origin, direction) {
    this.origin = origin;
    this.direction = direction.normalize();
  }
}

export {
  HalfLine
};