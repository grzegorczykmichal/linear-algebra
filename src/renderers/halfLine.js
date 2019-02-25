import {
  lineRenderer
} from "./line";

import {
  pointRenderer
} from "./point";

import {
  Line,
} from "./../objects";



const renderHalfLine = (ctx, origin, scale, size) => halfLine => (props = {}) => {
  const line = new Line(halfLine.direction);

  const color = props.color || "hsla(0, 0%, 100%, 0.5)";

  ctx.save();
  ctx.beginPath();
  ctx.translate(origin, origin);
  ctx.moveTo(halfLine.origin.getX() * scale, -halfLine.origin.getY() * scale);
  ctx.lineTo(...(line.getCoordinates(size).map(x => x * scale)));
  ctx.restore();
  ctx.strokeStyle = color;
  ctx.stroke();
}

const halfLineRenderer = (renderer) => {
  const ctx = renderer.context;
  const scale = renderer.scale;
  const origin = renderer.origin;
  const size = renderer.origin;
  const renderPoint = pointRenderer(renderer);
  return (halfLine, props = {}) => {
    renderPoint(halfLine.origin, Object.assign({}, {
        color: "blue",
        size: 2,
      },
      props.point
    ));
    renderHalfLine(ctx, origin, scale, size)(halfLine)(
      Object.assign({}, {
          color: "blue",
        },
        props.line
      )
    );
  };
}

export {
  halfLineRenderer
};