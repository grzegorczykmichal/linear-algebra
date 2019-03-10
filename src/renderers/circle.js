const circleRenderer = (renderer) => {
  const ctx = renderer.context;
  const scale = renderer.scale;
  const origin = renderer.origin;
  const size = renderer.origin;

  return (circle, props = {}) => {
    const size = props.size || 4;
    const color = props.color || "hsla(160, 70%, 50%, .2)";

    ctx.save();
    ctx.translate(origin + (circle.origin.getX() * scale), (origin - (circle.origin.getY() * scale)));
    ctx.beginPath();
    ctx.arc(0, 0, circle.radius * scale, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }
}

export {
  circleRenderer
};