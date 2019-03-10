import {
  vectorRenderer
} from "./vector";
import {
  halfLineRenderer
} from "./halfLine";
import {
  HalfLine,
  Point
} from "../objects";

function renderTree(ctx, scale, origin, points = [], angle = 0, opacity = 1) {

  if (points.length === 0) {
    return;
  }

  // ctx.scale(scale);
  ctx.strokeStyle = `hsla(${angle}, 50%,50%, ${opacity})`;
  ctx.lineWidth = 4;
  ctx.beginPath();
  points.forEach(
    p => {
      ctx.moveTo(origin.getX() * scale, origin.getY() * scale);
      ctx.lineTo(p.point.getX() * scale, -p.point.getY() * scale);
      ctx.stroke();
      if (p.intersections.length > 0) {
        console.log(p);
        renderTree(ctx, scale, p.point, ...p.intersections, (angle + 60), opacity - 0.4);
      }
    }
  )
}

const rayRenderer = (renderer) => {
  const {
    context: ctx,
    scale,
    origin
  } = renderer;
  const renderVector = vectorRenderer(renderer);
  const renderHalfLine = halfLineRenderer(renderer);

  return (ray, props = {}) => {
    ctx.save();
    ctx.translate(origin, origin);
    renderTree(ctx, scale, ray.origin, ray.intersections);
    ctx.restore();

    // renderHalfLine(new HalfLine(ray.origin, ray.direction), props);
    // ctx.save();
    // ctx.translate(
    //   origin + ray.origin.getX() * scale,
    //   origin - ray.origin.getY() * scale
    // );
    // ctx.scale(scale, scale);
    // ctx.beginPath();
    // ctx.moveTo(ray.origin.getX(), ray.origin.getY());

    // ray.intersections.forEach(
    //   i => {
    //     ctx.lineTo(i.point.getX(), -i.point.getY());

    //     if (i.intersections.length > 0) {
    //       i.intersections.forEach(
    //         j => {
    //           console.log(j);
    //           // ctx.lineTo(j.point.getX(), -j.point.getY());
    //         }
    //       )
    //     }
    //   }
    // )


    // ctx.restore();
    // ctx.strokeStyle = "green"
    // ctx.save();
    // ctx.lineWidth = 1
    // ctx.stroke();
    // ctx.restore();
    // renderVector(ray.direction, props);
  };
};

export {
  rayRenderer
};