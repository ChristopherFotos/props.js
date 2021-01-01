# Contents
1. What is propsjs?
2. Installation
3. Core concepts
    * Scenes
    * Props
        * adding props to a scene
        * custom properties
        * custom functions
    * Collision 
        * changing and extending collision behavior
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
The scene constructor takes 3 arguments: the ID of the html `<canvas>` element that you want to turn into an animated scene, and the width and height that you want your scene to have. In the example above we've set it to have the same width and height as the window. 

To start running your scene, use the 
`startScene` function and pass in the scene you want to start, like this: 

```javascript
startScene(myScene)
```
This will start the animation loop. 

## Props
A **prop** is an object involved in your scene. It might be a player character, a block of terrain, an object, a projectile -- anything.


### Adding props to a scene
You can add a prop to a scene with the scene.add method:

```javascript
myScene.add(myScene, {
    shape: "rectangle",
    width: 60,
    height: 60,
    x: 0,
    y: 800,
    platform: true,
    strokeColor: "gray",
    fill: true,
    fillColor: 'blue'
})
```
The scene.add method takes two arguments: the scene you're adding the prop to, and an options object desribing the prop's desired appearance and behaviour. You can read more about the scene.add method and its options in the API reference section of these docs. 

The above will add a new prop to the scene that we created above. The prop will be a  bluerectanlge with with a height and width of 60 pixels and a gray outline. 

The scene.add function returns the prop that you've created, meaning that you can save it in a variable to manipulate its appearance and behavior later: 

```javascript
const myProp = myScene.add(myScene, {
    shape: "rectangle",
    width: 60,
    height: 60,
    x: 0,
    y: 800,
    platform: true,
    strokeColor: "gray",
    fill: true,
    fillColor: 'blue'
})
```

Later on in your code you can reference the prop by its variable name and make changes to it, like this: 

```javascript
myProp.width *= 2
```
the above code will double the prop's width. 

### Giving a prop custom properties 
you might want to attach some data to a prop that isn't accounted for in the options object. Props have an object called customProperties where you can store these. 

```javascript
myProp.customProperties.health = 100
// or with braket notation
myProp.customProperties[dynamicProperty] = 'someValue'
```

you can also set custom properties when you first create the prop, using the customProperties option:

``` javascript
myScene.add(myScene, {
    shape: "rectangle",
    width: 60,
    height: 60,
    customProperties: {
        health: 100
    }
})
```

you can now access this property like this:
```javascript
myProp.customProperties.health
```

## Collision
Propsjs comes with a simple default collision detection and response system. 

If you want to enable collision in your scene, you need to create a spatial partitioning grid:

```javascript
let grid = new Grid(myScene, myScene.width, scene.height, 20);
```

This constructor function takes 4 arguments: the scene you want to enable collision on, the height and width of the grid, and the size you want the grid's cells to be. In the above example we're applying the grid to the scene we created earlier, setting the grid's width and height to be the same as that of the scene, and giving it a cell size of 20 pixels. 

If you want an object to be collidable, you have to set its `solid` property to `true`. You can do this in the options object you oass in to the `scene.add` method like this: 

```javascript
    const mySolidProp = myScene.add(myScene, {
    solid: true,
    shape: "rectangle",
    width: 60,
    height: 60,
    x: 0,
    y: 800,
    strokeColor: "gray",
    fill: true,
    fillColor: 'blue'
})
```
or you can set it later like this:
```javascript
    mySolidProp.solid = true
```

Either way, setting a prop's `solid` property to true will tell the propsjs that it should enable collision **response** on this prop. **note that collision detection will still happen if collision is false, but the engine will not respond to it.**

### Changing and extending collision behavior
Propsjs provides a convenient API for modifying a prop's collision behavior. 

the options object for the ``Scene.add`` method accepts a property called `collisionFunctions`, which is an array of functions that will be called every time the prop you're creating is involved in a collision. 

Here's an example. Let's say you want a prop to shrink by 25% when it's involved in a collision. You could do acheive that like this: 

```javascript
    function shrink(){   
        this.width  *= 0.75
        this.height *= 0.75
    }

    const shrinkingProp = myScene.add(myScene, {
        solid: true,
        shape: "rectangle",
        width: 60,
        height: 60,
        x: 0,
        y: 800,
        fill: true,
        fillColor: 'blue'
        collisionFunctions: [
            shrink
        ]
    })
```
Now the `shrink` function will be called every time `shrinkingProp` is involved in a collision. When it's called it will be bound to `shrinkingProp`, meaning that `this` in the `shrink` function will refer to `shrinkingProp`. Remember that `collisionFunctions` option takes an array, even if you only want to add one function. This allows us to add multiple functions to be run when a prop is involved in a collision. 

collisionFunctions can be combined with customProperties to create useful and interesting behaviour. For example, we can have a customProperty called `health` and a collisionFunction called `hurt` that decrements the `health` property every time the object is involved in a collision: 

```javascript
function hurt() {
  this.customProperties.health -= 5;
}

const propWithHealth = myScene.add(myScene, {
    solid: true,
    shape: "rectangle",
    width: 60,
    height: 60,
    x: 0,
    y: 800,
    strokeColor: "gray",
    fill: true,
    fillColor: 'blue',
    customProperties: {
        health: 100
    }
    collisionFunctions:[
        hurt
    ]
})
```
Now this `propWithHealth` has a custom property called `health` that will decrease by 5 every time it's involved in a collision. 