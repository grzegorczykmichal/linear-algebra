const renderPoint = (ctx, origin, scale) => point => (props = {}) => {

  const size = props.size || 4;
  const color = props.color || "hsl(80, 70%, 50%)";

  ctx.save();
  ctx.translate(origin + (point.getX() * scale), (origin - (point.getY() * scale)));
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

const renderBoundingBox = (ctx, origin, scale) => point => (props = {}) => {
  ctx.save();
  ctx.translate(origin + point.getX() * scale, origin - point.getY() * scale);
  ctx.beginPath();

  ctx.lineWidth = .75;
  ctx.setLineDash([3, 2]);
  ctx.strokeStyle = "#FFF";
  ctx.strokeRect(-8, -8, 16, 16);
  ctx.restore();
}

const pointRenderer = (renderer) => {
  const ctx = renderer.context;
  const scale = renderer.scale;
  const origin = renderer.origin;
  return (point, props = {}) => {
    renderPoint(ctx, origin, scale)(point)(props)
    if (props.drawBoundingBox) {
      renderBoundingBox(ctx, origin, scale)(point)(props)
    }
  };
}

export {
  pointRenderer
};