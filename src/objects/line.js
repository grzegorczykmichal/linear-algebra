import uuidv4 from 'uuid/v4';

class Line {
  constructor(vector) {
    this.id = uuidv4();
    this.vector = vector;
  }

  getCoordinates(t) {
    const x = this.vector.origin.getX() + t * this.vector.direction.getX();
    const y = -(this.vector.origin.getY() + t * this.vector.direction.getY());
    return [x, y];
  }

  // intersect(line) {
  //   const a = this.position;
  //   const b = this.direction;

  //   const c = line.position;
  //   const d = line.direction;

  //   const parallelFactor = (d.getX() * b.getY() - d.getY() * b.getX());

  //   if (parallelFactor === 0) {
  //     return null;
  //   }

  //   return (b.getX() * (c.getY() - a.getY()) + b.getY() * (a.getX() - c.getX())) / parallelFactor;
  // }
}

export {
  Line
};