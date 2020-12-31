import utils from './utilities'
import collisionDirection from './collisionDirection'
import collisionResponse from './collisionResponse'


export default function collisionFunction() {

  this.colliding.bool = false
  this.colliding.coColliders = []
  let length = this.collisionCandidates.length
  
  for(let i = 0; i < length; i++) {
    if (utils.rectIntersect(this.collisionCandidates[i], this) && this.collisionCandidates[i] != this) {
      this.colliding.bool = true 
      this.colliding.coColliders.push(this.collisionCandidates[i])
       
      if(this.collisionFunctions){
          this.collisionFunctions.forEach(cfunc => {
          let bcfunc = cfunc.bind(this);
          bcfunc(coColliders);
        })
      }

      if (this.solid && this.collisionCandidates[i].solid) { 
        collisionResponse(this, this.collisionCandidates[i], collisionDirection(this, this.collisionCandidates[i]))
      }
    } 
  }
}
