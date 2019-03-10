function fromPoints(p1, p2) {
  const [x1, y1] = p1;
  const [x2, y2] = p2;

  const divisor = x2 - x1;

  if (divisor === 0) {
    throw (new Error(`Divisor cannot be zero. ${x2} - (${x1}) = ${divisor}`));
  }

  const dividend = y2 - y1;

  const m = dividend / divisor;
  const b = -((x1 * m) - y1);

  return [m, b];
}

export {
  fromPoints
}