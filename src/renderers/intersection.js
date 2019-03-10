import {
  pointRenderer
} from "./point";
import {
  vectorRenderer
} from "./vector";
import {
  Vector
} from "../objects";

const renderNormalLine = (ctx, origin, scale) => vector => (props = {}) => {
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
  ctx.strokeStyle = "red"
  ctx.save();
  ctx.lineWidth = 1
  ctx.stroke();
  ctx.restore();
};

const intersectionRenderer = (renderer) => {
  const renderPoint = pointRenderer(renderer);
  const rectorVector = vectorRenderer(renderer);

  const {
    context,
    origin,
    scale
  } = renderer;

  return (intersection, props = {}) => {
    renderPoint(intersection.point, props);

    const normalVector = new Vector(intersection.normal.direction.coordinates);
    normalVector.origin = intersection.point
    renderNormalLine(context, origin, scale)(normalVector)(props);
    rectorVector(new Vector(intersection.direction.direction.coordinates).normalize(), {
      color: "blue"
    });
    rectorVector(new Vector(intersection.bounce.direction.coordinates, intersection.point.coordinates));
  };
};

export {
  intersectionRenderer
};