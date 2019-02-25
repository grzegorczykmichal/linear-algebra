import {
  vectorRenderer
} from "./../renderers/vector";

class DrawableVector {
  constructor(vector) {
    (this.vector = vector), (this.props = {});
  }

  setProps(
    props = {
      color: "hsla(50,50%,50%,1)"
    }
  ) {
    this.props = Object.assign({}, this.props, props);
  }

  render(renderer) {
    const render = vectorRenderer(renderer);
    render(this.vector, this.props);
  }
}

export {
  DrawableVector
};