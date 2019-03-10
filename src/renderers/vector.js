import {
  Vector
} from "../objects/vector";

const renderLine = (ctx, origin, scale) => vector => (props = {}) => {
  ctx.save();
  ctx.translate(
    origin + vector.origin.getX() * scale,
    origin - vector.origin.getY() * scale
  );
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(vector.getX(), -vector.getY());
  ctx.restore();
  ctx.lineCap = "round";
  ctx.strokeStyle = props.color || "hsl(40.9, 58%, 68.2%)";
  ctx.save();
  ctx.setLineDash([1, 8]);
  ctx.lineWidth = props.width || 2;
  ctx.stroke();
  ctx.lineCap = "butt";
  ctx.restore();
};

const renderOrigin = (ctx, origin, scale) => vector => (props = {}) => {
  ctx.save();
  ctx.translate(
    origin + vector.origin.getX() * scale,
    origin - vector.origin.getY() * scale
  );
  ctx.beginPath();
  ctx.arc(0, 0, 3, 0, 2 * Math.PI);
  ctx.fillStyle = props.color || "hsl(220, 70%, 50%)";
  ctx.fill();
  ctx.restore();
};

const renderTip = (ctx, origin, scale) => vector => (props = {}) => {
  ctx.save();
  ctx.translate(
    origin + (vector.getX() + vector.origin.getX()) * scale,
    origin - (vector.getY() + vector.origin.getY()) * scale
  );
  ctx.rotate(-Math.atan2(vector.getY(), vector.getX()));
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.lineTo(0, 4);
  ctx.lineTo(10, 0);
  ctx.closePath();
  ctx.fillStyle = props.color || "hsl(40.9, 58%, 68.2%)";
  ctx.fill();
  ctx.restore();
};

const renderAngle = (ctx, origin, scale) => vector => (props = {}) => {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#FFF";
  ctx.save();
  ctx.translate(origin, origin);
  ctx.scale(scale, scale);
  ctx.beginPath();
  ctx.arc(0, 0, Math.atan2(vector.getY(), vector.getX()) / 5, 0, -Math.atan2(vector.getY(), vector.getX()), true);
  ctx.restore();
  ctx.stroke();

  ctx.save();
  ctx.translate(origin, origin);
  ctx.scale(scale, scale);
  ctx.moveTo(0, 0);
  ctx.lineWidth = 1;
  ctx.lineTo(1, 0);
  ctx.restore();
  ctx.stroke();
  ctx.restore();
};

const vectorRenderer = renderer => {
  const ctx = renderer.context;
  const scale = renderer.scale;
  const origin = renderer.origin;
  return (vector, props = {}) => {
    renderLine(ctx, origin, scale)(vector)(props);
    renderTip(ctx, origin, scale)(vector)(props);
    renderOrigin(ctx, origin, scale)(vector)(props);
  };
};

export {
  vectorRenderer
};