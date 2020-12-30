import Cell from './Cell'

export default class Column {
  constructor(x, y, width, scene) {
    this.x = x;
    this.y = y;
    this.scene = scene;
    this.width = width;
    this.range = [this.x, this.x + this.width];
    this.cells = [];
    this.makeColumn();
  }

  addCell(x, y, size, scene) {
    this.cells.push(new Cell(x, y, size, scene));
  }

  makeColumn() {
    for (let i = 0; i < this.scene.height + (this.width + 1); i += this.width) {
      this.addCell(this.x, i, this.width, this.scene);
    }
  }
}
