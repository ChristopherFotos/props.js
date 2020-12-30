import Prop from './Prop'
import Grid from './grid/Grid';

export default class Scene {
  constructor(canvasId, width, height, gravity = false, grid = true, updateArray = []) {

    console.log('CLASS CONSTRUCTOR CLASS CONSTRUCTOR')

    this.black = 'blue'
    this.canvas = document.querySelector(canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.updateArray = updateArray;
    this.controllers = [];
    this.gravity = gravity;
    this.context = this.canvas.getContext("2d");
    this.render = [];
    this.rectProps = [];
    this.grid = null;
  }

  // add getters and setters
  
  add(scene, options) {
    return new Prop(scene, options);
  }

  addGrid(cellSize) {
    this.grid = new Grid(this, this.width, this.height, cellSize);
  }

  update() {

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if(this.updateArray){this.updateArray.forEach((f)=>{f.bind(this)()})};

    this.controllers.forEach(c=> { c.runController() });

    if (this.grid) {
      this.grid.clearGrid()
      this.grid.insertPropArray()
      if (this.grid.show) {
        this.grid.showGrid()
      }
    };

    this.rectProps.forEach(body => {body.update();});
  }
}

window.Scene = Scene