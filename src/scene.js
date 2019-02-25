class Scene {
  constructor(context, canvas) {
    this.context = context;
    this.objects = [];
    this.cameras = [];
    this.activeCamera = null;
    this.callback = () => {};
    this.selectionPoint = null;

    canvas.addEventListener(
      "mousedown",
      ({
        x,
        y
      }) => {
        this.selectionPoint = {
          x,
          y
        };
        this.changed();
      },
      true
    );
  }

  addObject(...object) {
    this.objects = this.objects.concat(object);
  }

  addCamera(camera) {
    this.cameras = this.cameras.concat(camera);
  }

  changed() {
    this.callback(this);
  }

  onChanged(callback) {
    this.callback = callback;
  }

  visit(renderer) {
    renderer.renderSelectionPoint(this.selectionPoint, this.objects);

    this.objects.forEach(object => {
      // if (object.contains(this.selectionPoint));
      renderer.renderObject(object);
    });

    // this.cameras.forEach(camera => {
    //   renderer.renderCamera(camera);
    // });

    // const ints = this.objects.filter(o => intersectables.includes(o.constructor.name));
    // let l = ints.pop();
    // const intersections = [];
    // while (ints.length > 0) {
    //   ints.forEach((line, i) => {
    //     const t = l.intersect(line);
    //     console.log({
    //       t
    //     });
    //     if (t !== null) {
    //       console.log(`line ${l.id} intersec with ${line.id}`)
    //       intersections.push(line.getCoordinates(t));
    //     }
    //   });
    //   l = ints.pop();
    // }

    // intersections.forEach(intersection => {
    //   renderer.renderIntersection(intersection);
    // });
  }
}

export {
  Scene
};