import {
  vectorRenderer
} from "./vector"

const lineRenderer = (renderer) => {
  const ctx = renderer.context;
  const scale = renderer.scale;
  const origin = renderer.origin;
  const size = renderer.origin;
  const renderVector = vectorRenderer(renderer);
  return (line, props = {}) => {
    ctx.save();
    ctx.beginPath();
    ctx.translate(origin, origin);
    const t1 = props.t1 || -size;
    const t2 = props.t2 || size;
    ctx.lineTo(...(line.getCoordinates(t1).map(x => x * scale)));
    ctx.lineTo(...(line.getCoordinates(t2).map(x => x * scale)));
    ctx.restore();
    ctx.strokeStyle = "hsla(0, 0%, 100%, 0.5)";
    ctx.stroke();
    renderVector(line.vector.normalize(), {
      color: "white"
    });
  }
}

export {
  lineRenderer
};