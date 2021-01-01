import utils from './utilities'
import collisionDirection from './collisionDirection'
import collisionResponse from './collisionResponse'

/* 

  This function handles collision detection. It is called inside of a prop's 

  update function and and bound to that prop, meaning that 'this' inside this

  function refers to the prop that's calling it. The comments in the 

*/

export default function collisionFunction() {

  /* empty the cocollider array and set colliding to false */
  this.colliding.coColliders = []
  this.colliding.bool = false

  /* cache length of collisionCandidates */
  let length = this.collisionCandidates.length
  
  /* loop through the collision candidates */
  for(let i = 0; i < length; i++) {
    /* check if the current collision candidate is colliding with this prop */
    if (utils.rectIntersect(this.collisionCandidates[i], this) && this.collisionCandidates[i] != this) {
  
      /* if it is, set the bool property of its colliding object to 
      'true' and push the cocollider into its co-colliding array */

      this.colliding.bool = true 
      this.colliding.coColliders.push(this.collisionCandidates[i])

      /* if the prop has custom collision functions, run them */
      if(this.collisionFunctions){
          this.collisionFunctions.forEach(cfunc => {
          let bcfunc = cfunc.bind(this);
          bcfunc(coColliders);
        })
      }

      /* if this prop AND the its coColider are both 
      solid, run the collision response logic -- either the
      developer's custom collision function or the default one.*/

      if (this.solid && this.collisionCandidates[i].solid) { 
          if(this.customCollisionResponse){
            this.customCollisionResponse(this, this.collisionCandidates[i], collisionDirection(this, this.collisionCandidates[i])) 
          } else {
            collisionResponse(this, this.collisionCandidates[i], collisionDirection(this, this.collisionCandidates[i]))
          }
      }
    } 
  }
}
