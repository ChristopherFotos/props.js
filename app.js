const scene = new Scene("#c", window.innerWidth, window.innerHeight);
startScene(scene)

let grid = new Grid(scene, scene.width, 800, 20);
// grid.show = true

let colors = ["#E4572E", "#16BAC5", "#5FBFF9", "#FFEEDB", "#73FBD3"];

let _mx, _my;

const pikachuImg = new Image()
pikachuImg.src = 'Pikachu.jpg'

let scale = 1;

// setTimeout(gameLogic, 10000)

scene.add(scene, {
    shape: "rectangle",
    width: scene.width,
    height: 60,
    x: 0,
    y: 800,
    platform: true,
    strokeColor: "gray",
    fill: true,
    fillColor: colors[Math.floor(utils.randomRange(0, 4))],
    accelMag: 0,
    speed: 0,
    solid: true,
    direction: 0,
    movement: "default",
    friction: 0.965,
    collision: "edgeBounce",
    customFunctions: [
        function(){
        this.position._x = 0;
        this.position._y = 500
        }
    ],
    mass: 5,
    elasticity: 0.1
})


document.body.addEventListener("mousemove", e => {
  _mx = e.pageX;
  _my = e.pageY;
});

function dir(keyCode) {
  switch (keyCode) {
    case 65:
      return 3.14159;
      break;
    case 68:
      return 0;
      break;
    case 87:
      return 4.71;
      break;
    case 83:
      return 1.57;
  }
}

let ribbon = false;

document.body.addEventListener("keydown", e => {
  if (e.keyCode == 49) {
    ribbon = false;
  } else if (e.keyCode == 50) {
    ribbon = true;
  }
});

let control = false;

document.body.addEventListener("keydown", e => {
  if (e.keyCode === 51) {
    switch (control) {
      case true:
        control = false;
        break;
      case false:
        control = true;
        break;
    }
  }
});

document.body.addEventListener("keydown", e => {
  if (e.keyCode === 52) {
    control = false;
  }
});

document.body.addEventListener("keydown", e => {
  if (e.keyCode === 71) {
    switch (scene.gravity) {
      case true:
        scene.gravity = false;
        break;
      case false:
        scene.gravity = true;
        break;
    }
  }
});

function hurt() {
  this.customProperties.health -= 1;
  this.width *= 0.9;
  this.height *= 0.9;
}

function die() {
  if (this.customProperties.health < 0) {
    this.render = false;
    for (let i = 0; i < 4; i++) {
      let _width = this.width;
      let _height = this.height;
      let _x = this.position._x;
      let _y = this.position._y;
      scene.add(scene, {
        shape: "rectangle",
        width: _width * 0.3,
        height: _height * 0.3,
        x: _x,
        y: _y,
        strokeColor: "gray",
        fill: true,
        fillColor: colors[Math.floor(utils.randomRange(0, 4))],
        accelMag: 0,
        speed: 15,
        solid: true,
        direction: Math.random() * 100,
        movement: "default",
        friction: 0.965,
        collision: "edgeBounce",
        mass: this.width,
        elasticity: 1,
        nograv: true,
        customProperties: {
          health: 5
        },
        // customFunctions: [die],
        // collisionFunctions: [hurt]
      });
    }
  }
}

// /*====================== 
// shoot blocks from cursor  
// ========================*/





document.body.addEventListener("keydown", e => {
  if (!ribbon && !control) {
    scene.add(scene, {
      width: 60,
      height: 60,
    //   shape: 'rectangle',
      x: _mx,
      y: _my - 10,
      image: pikachuImg,
      strokeColor: "gray",
    //   fill: true,
    //   fillColor: colors[Math.floor(utils.randomRange(0, 4))],
      accelMag: 0.02,
      antiTunneling: {interval: 8, floor: 0.2},
      speed: 15,
      solid: true,
      stackable: true,
      direction: dir(e.keyCode),
      movement: "default",
      friction: 0.952,
      mass: 1,
      collision: "edgeBounce",
      elasticity: 0.6,
      customProperties: {
        health: 5
      },
      // customFunctions: [die, ()=>{if (!this.colliding){this.platform = false}}],
      // collisionFunctions: [function(coColliders){
      //   if(coColliders.filter(p => p.platform)){
      //     this.platform = true
      //   } else {
      //     this.platform = false 
      //   }
      // }]
    });
  }
});

function highlightCandidates(){
  let rect = {
    x: this.position._x,
    y: this.position._y,
    height: this.height,
    width: this.width
  }
 
  let intersect = (
    _mx > this.position._x &&
    _mx < this.position._x + this.width && 
    _my - 200 > this.position._y &&
    _my - 200 < this.position._y + this.height
  )

  if(intersect){
      this.collisionCandidates.forEach(p=>{
        p.fillColor = 'green'
      })
    }
}

document.body.addEventListener("mousemove", e => {
  if (ribbon) {
    for (let i = 0; i < 5; i++) {
      let square = Math.random() * 20;
      scene.add(scene, {
        shape: "rectangle",
        width: square,
        height: square,
        x: e.pageX,
        y: e.pageY - 250,
        strokeColor: "gray",
        fill: true,
        fillColor: colors[Math.floor(utils.randomRange(0, 4))],
        accelMag: 0.025,
        speed: 0.15,
        solid: true,
        direction: Math.random() * 100,
        movement: "default",
        friction: 0.965,
        collision: "edgeBounce",
        mass: 0.5,
        // customFunctions: [highlightCandidates],
        elasticity: 0.1
      });
    }
  }
});
    
document.body.addEventListener("keydown", e => {
  if (control) {
    keyCode = e.keyCode;
    switch (keyCode) {
      case 65:
        console.log(65);
        boi.acceleration.setAngle(15.75);
        boi.velocity.setAngle(15.75);
        boi.acceleration.setLength(0.07);

        break;
      case 68:
        console.log(68);
        boi.acceleration.setAngle(0);
        boi.velocity.setAngle(0);
        boi.acceleration.setLength(0.07);

        break;
      case 87:
        console.log(87);
        boi.acceleration.setAngle(4.7);
        boi.velocity.setAngle(4.7);
        boi.acceleration.setLength(0.07);

        break;
      case 83:
        console.log(83);
        boi.acceleration.setAngle(1.5);
        boi.velocity.setAngle(1.5);
        boi.acceleration.setLength(0.07);
    }
  }
});
