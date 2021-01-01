# Contents
1. What is propsjs?
2. Installation
3. Core concepts
4. API reference
5. Demos
6. Some fun ideas

# 1. What is propsjs?
Props.js is a lightweight library for developing games and interactive animations on HTML5 canvas. it provides: 

* a simple API for creating animated scenes and adding objects to them

* basic physics

* [Axis aligned bounding box (AABB)](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection "MDN: Collision detection") collision detection

* [broad phase collision detection](https://research.ncl.ac.uk/game/mastersdegree/gametechnologies/physicstutorials/6accelerationstructures/Physics%20-%20Spatial%20Acceleration%20Structures.pdf) through the use of a spatial partitioning grid

# 2. Installation 
## using npm:

```
npm install propsjs
```
```javascript
require('propsjs')
```

## in a script tag
```html
<script src="https://unpkg.com/propsjs/src/dist/props.js"></script>
```
# Core concepts

## Scenes
Props.js organizes your animations into **scenes** and **props**. Scenes handle all of the animation
logic and keep track of the **props** that are involved in the animation. 

You can create a new scene using the Scene constructor:

```javascript
const myScene = new Scene("canvas", window.innerWidth, window.innerHeight);
```
The scene constructor takes 3 arguments: the ID of the html ```<canvas>``` that you want to turn into an animated scene, and the width and height that you want your scene to have. In this example we've set it to have the same width and height as the window. 

To start running your scene, use the 
`startScene` function and pass in the scene you want to start, like this: 

```javascript
startScene(myScene)
```
This will start the animation loop. 

## Props
A **prop** is an object involved in your scene. It might be a player character, a block of terrain, an object, a projectile -- anything.


## Adding props to a scene
You can add a prop to a scene with the scene:

```javascript
myScene.add(myScene, {
    //options
})
```
This will add a new prop to the scene we created above