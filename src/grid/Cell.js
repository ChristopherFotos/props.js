export default class Cell {
  constructor(x, y, size, scene) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.scene = scene;
    this.props = [];
  }

  addProp(prop) {
    //add a prop to the cell
    this.props.push(prop);
  }

  removeProp(prop) {
    this.props.pop(prop);
  }

  draw() {
    this.scene.context.beginPath();
    this.scene.context.rect(this.x, this.y, this.size, this.size);
    this.scene.context.strokeStyle = 'black';
    this.scene.context.stroke()
  }
}
