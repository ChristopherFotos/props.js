import Cell from './grid/Cell'
import Column from './grid/Column'
import Grid from './grid/Grid'
import Vector from  './Vector'
import utils from './utilities'
import Scene from './Scene'
import Prop from './Prop'
import startScene from './functions'

console.log('ENTRY POINT', Scene)

export {
    Vector,
    utils,
    Cell,
    Column,
    Grid,
    Scene,
    Prop,
    startScene,
}

window.Scene = Scene

