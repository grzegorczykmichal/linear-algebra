import {
  pointRenderer
} from "./point";
import {
  vectorRenderer
} from "./vector";
import {
  lineRenderer
} from "./line";
import {
  halfLineRenderer
} from "./halfLine";
import {
  rayRenderer
} from "./ray";
import {
  circleRenderer
} from "./circle";
import {
  intersectionRenderer
} from "./intersection";

import {
  DrawableVector
} from "./../drawables";

import {
  Point,
  Vector,
  Line,
  HalfLine
} from "./../objects"

class Renderer {
  constructor(context, size, origin, scale) {

    this.size = size;
    this.origin = origin;
    this.size / 2;
    this.scale = scale;
    this.context = context;

    this.renderers = {
      [`Point`]: pointRenderer(this),
      [`Vector`]: (vector) => {
        new DrawableVector(vector).render(this);
      },
      [`Line`]: lineRenderer(this),
      [`HalfLine`]: halfLineRenderer(this),
      [`Ray`]: rayRenderer(this),
      [`Circle`]: circleRenderer(this),
      [`Intersection`]: intersectionRenderer(this),
    };
  }

  renderObject(object, props = {}) {
    const renderObject = this.renderers[object.name] || (() => {
      console.log(`No renderer found for ${object.name}.`)
    });


    renderObject(object, props);
  }

  render(scene) {
    this.context.clearRect(0, 0, this.size, this.size);
    scene.visit(this);
  }

  renderIntersection([x, y]) {
    this.context.save();
    this.context.translate(this.origin, this.origin);
    this.context.scale(this.scale, this.scale);
    this.context.beginPath();
    this.context.arc(x, y, 0.1, 0, 2 * Math.PI);
    this.context.fillStyle = "hsl(80, 70%, 50%)";
    this.context.fill();
    this.context.restore();
  }

  renderCamera(camera) {
    console.log(camera);

    const p = camera.vector.direction;

    this.context.fillStyle = "hsla(0, 0%, 100%)";
    this.context.save();
    this.context.translate(
      this.origin + p.getX() * this.scale,
      this.origin - p.getY() * this.scale
    );
    // this.context.scale(this.scale, this.scale);
    // this.context.fillRect(p.getX() - .1, -p.getY() - .1, .2, .2);

    this.context.beginPath();
    this.context.arc(0, 0, 10, 0, 2 * Math.PI);
    // this.context.fillStyle = "hsl(80, 70%, 50%)";
    this.context.fill();
    // this.context.rotate(Math.atan2(d.getY(), -d.getX()));

    this.context.restore();

    // this.context.save();

    this.renderVector(camera.vector.normalize());
    // this.context.translate(this.origin, this.origin);
    // this.context.scale(this.scale, this.scale);
    // this.context.rotate(Math.atan2(d.getY(), -d.getX()));
    // this.context.beginPath();
    // this.context.moveTo(p.getX(), -p.getY());
    // this.context.lineTo(p.getX() - .2, -p.getY() - .1);
    // this.context.lineTo(p.getX() - .2, -p.getY() + 0.1);
    // this.context.fill();
    // this.context.closePath();
    // this.context.restore();
  }

  renderSelectionPoint(selectionPoint = {}, objects) {


    if (selectionPoint === null) {
      return;
    }

    var point = new Point((selectionPoint.x - this.origin) / this.scale, -(selectionPoint.y - this.origin) / this.scale);

    objects.forEach(object => {



      if (!("contains" in object)) {
        return;
      }

      // console.log(object.contains(point));

      if (object.contains(point)) {
        // console.log("hmm", object);
        this.renderObject(object, {
          drawBoundingBox: true
        });
      }
    });

  }
}

export {
  Renderer
}