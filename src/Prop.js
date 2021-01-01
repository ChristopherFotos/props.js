import collisionFunction from './collisionFunction'
import Vector from './Vector'

export default class Prop {
  constructor(
    scene,
    {
      shape,
      radius,
      width,
      stroke,
      fill,
      image,
      strokeColor,
      platform = false,
      fillColor,
      height,
      x,
      y,
      stackable = true,
      fixed,
      speed,
      direction,
      mass,
      solid,
      antiTunneling,
      accelMag,
      customProperties,
      customFunctions,
      collisionFunctions,
      friction,
      elasticity,
      minSpeed,
      collision,
      nograv,
      movement,
      movementArray,
      controls = [],
      bitmap
    } = {}

  ) {
    this.scene = scene;
    this.shape = shape;
    this.image = image;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.stroke = stroke;
    this.fill = fill;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.collision = collision;
    this.coCollider = {};
    this.platform = platform;
    this.bitmap = bitmap;
    this.position = new Vector(x, y);
    this.direction = direction;
    this.velocity = new Vector(0, 0);
    this.velocity.setLength(speed);
    this.velocity.setAngle(this.direction);
    this.stackable = stackable;
    this.mass = mass;
    this.solid = solid;
    this.acceleration = new Vector(0, 0);
    this.acceleration.setLength(accelMag);
    this.acceleration.setAngle(this.direction);
    this.movement = movement;
    this.movementArray = movementArray;
    this.friction = friction;
    this.elasticity = elasticity;
    this.minSpeed = minSpeed;
    this.controls = controls;
    this.nograv = nograv;
    this.fixed = fixed;
    this.antiTunneling = antiTunneling;
    this.customProperties = customProperties;
    this.customFunctions = customFunctions;
    this.collisionFunctions = collisionFunctions;
    this.colliding = {};
    this.collisionCandidates = [];
    this.checkedCollisionPairs = [];
    this.cells = [];
    this.render = true;
    this.initToRenderArray();
    // this.initAntiTunneling();
     if(this.antiTunneling){
        setInterval(() => {
        this.collide()
        if(this.velocity.getLength() < this.antiTunneling.floor){
          this.velocity.setLength(0)
        }
      }, this.antiTunneling.interval);
    }
    

  }

  initAntiTunneling(){
    

  }

  // resizeAround(corner){

  // }

  initToRenderArray() {
    this.scene.rectProps.unshift(this);
  }

  initToCollisionArray() {
    if ((this.shape = "rectangle")) {
      this.scene.rectProps.unshift;
    }
  }

  populateCollisionCandidates() {
    let candidates = [];
    this.cells.forEach(cell => {
      cell.props.forEach(prop => {
        if ((prop != this) && (!candidates.includes(prop))) {
          candidates.push(prop)
        }
      })
    });
    this.collisionCandidates = candidates
  }

  accel() {
    if (!this.fixed) {
      this.velocity.addTo(this.acceleration);
      this.position.addTo(this.velocity);
      this.velocity.multiplyBy(this.friction);
      this.acceleration.multiplyBy(this.friction);

      if (this.scene.gravity && !this.nograv) {
        if (this.position._y + this.height < this.scene.height - 0.0001) {
          this.velocity._y += this.mass;
        }
      }

      if ((this.movement = "default")) {
        let a = this.velocity.getAngle();
        this.acceleration.setAngle(a);
      }
    } else if (this.fixed) {
      this.velocity.setLength(1);
      this.acceleration.setLength(0);
    }
  }

  edgeBounce() {
    if (
      this.position._x < 0 ||
      this.position._x + this.width > this.scene.width
    ) {
      this.acceleration.multiplyBy(-1);
      this.velocity._x *= this.elasticity;
    }

    if (
      this.position._y < 0 ||
      this.position._y + this.height > this.scene.height
    ) {
      this.acceleration.multiplyBy(-1);
      this.velocity._y *= this.elasticity;
    }
  }

  collide() { // run this method inside of a set interval. but where will that interval go? 
    let boundCollision = collisionFunction.bind(this);
    boundCollision();
  }

  draw() {
    if ((this.shape = "rectangle")) {
      this.scene.context.beginPath();
      this.scene.context.rect(
        this.position._x,
        this.position._y,
        this.width,
        this.height
      );
      this.scene.context.strokeStyle = this.strokeColor;
      this.scene.context.fillStyle = this.fillColor;
      if (this.fill) {
        this.scene.context.fill();
      }
      if (this.stroke) {
        this.scene.context.stroke();
      }
      this.scene.context.closePath();
    }

    if(this.image){
      this.scene.context.drawImage(this.image, this.position._x, this.position._y, this.width, this.height)
    }
    
  }

  update() {
    if (this.render) {
      this.checkedCollisionPairs = []

      this.accel();

      if (this.solid && !this.antiTunneling) {
        this.collide();
      }

      if (this.collision === "edgeBounce") {
        this.edgeBounce();
      }

      if (this.fixedX) {
        console.log("fixedX");
        this.position._x = this.fixedX;
      }

      if (this.fixedY) {
        console.log("fixedY");
        this.position._y = fixedY;
      }

      if (this.customFunctions) {
        this.customFunctions.forEach(func => {
          let bfunc = func.bind(this);
          bfunc();
        });
      }

      this.populateCollisionCandidates()

      this.draw();
    } else {
      this.position = new Vector(undefined, undefined);
    }
  }
}

window.Prop = Prop