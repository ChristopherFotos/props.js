import Column from "./Column";
import Cell from './Cell'

export default class Grid {
  constructor(scene, width, height, cellSize) {
    this.scene      = scene;
    this.width      = width;
    this.height     = height;
    this.cellSize   = cellSize;
    this.columns    = [];
    this.scene.grid = this;
    this.createGrid();
    this.show = false;
  }

  addColumn(x, y, width, scene) {
    this.columns.push(new Column(x, y, width, scene));
  }

  createGrid() {
    for (
      let i = 0;
      i < this.scene.width + (this.cellSize + 1);
      i += this.cellSize
    ) {
      this.addColumn(i, 0, this.cellSize, this.scene);
    }
  }

  findColumns(prop){
    const columns = [];
    this.columns.forEach(column => {
      if (
        utils.rangeIntersect(
          column.x,
          column.x + column.width,
          prop.position._x,
          prop.position._x + prop.width
        )
      ) {
        columns.push(column)
      }
    })
    return columns
  }

  findCells(prop, column){
    let propCells = []
    column.cells.forEach(cell => {
      if (
        utils.rangeIntersect(
          cell.y,
          cell.y + cell.size,
          prop.position._y,
          prop.position._y + prop.height
        )
      ) {
        propCells.push(cell);
      } 
    })
    return propCells;
  }

  insertProp(prop) {

    prop.cells = []
    let columns = this.findColumns(prop)
 
    columns.forEach(column => {
      let cellArray = this.findCells(prop, column)
      cellArray.forEach(c => {
        c.props.push(prop)

        prop.cells = prop.cells.concat(cellArray)

      })
    });
    
  }

  insertPropArray(){
    this.scene.rectProps.forEach(prop => {
      this.insertProp(prop)
    })
  }

  clearGrid(){
    this.columns.forEach(col => {
      col.cells.forEach(cell => {
        cell.props.length = 0;
      })
    })
  }

  showGrid(){
      this.columns.forEach(col => {
        col.cells.forEach(cell =>{
        cell.draw() 
       })
     })
  }
}

window.Grid = Grid
