import utils from './utilities'

export default function collisionFunction() {
  for (let i = 0; i < this.collisionCandidates.length; i++) {

    let coColliders = []

      if (utils.rectIntersect(this.collisionCandidates[i], this) && this.collisionCandidates[i] != this) {

        coColliders.push(this.collisionCandidates[i])
        
        // the co-colliders should be passed as an array to account for frames where more than one collision is happening. 
        // As far as terrain goes: its position can be fixed in customFunctions. We'll need a way for props to override the collision 
        // behaviour in this function. Terrain will override this behaviour and, when it deects a collision, it will set this.collisionCandidates[i]'s 
        // x or y velocity to 0, depending on whether the terrain is vertical or horizontal. 

        /*
          for collision response: let's try moving the blocks out of collision by simply adding or subtracting their penetration depth 
          from their position vector, then applying f = ma. moving them out of collision before applying f=ma should prevent the jelly-like
          collisions we were seeing when we used f=ma on its own. Using acceleration as opposed to penetration depth should (hopefully) prevent
          over-response to collisions
        */

        /* 
         How can this collision algorithm be made extensible? Think about how many times you've changed the collision behaviour so far. 
         How can we make it so that designers have that level of control, but don't ever have to mess with this long, unweildy function? 
        */

        if(this.collisionFunctions){
          this.collisionFunctions.forEach(cfunc => {
          let bcfunc = cfunc.bind(this);
          bcfunc(coColliders);
        })
      }

      // if(this.stackable){
      //   if(this.collisionCandidates[i].platform){
      //     this.platform = true;
      //   } else this.platform = false
      // }
        
        if (this.solid) {
          let player_bottom = this.position._y + this.height;
          let tiles_bottom =
            this.collisionCandidates[i].position._y + this.collisionCandidates[i].height;
          let player_right = this.position._x + this.width;
          let tiles_right =
            this.collisionCandidates[i].position._x + this.collisionCandidates[i].width;

          let b_collision = tiles_bottom - this.position._y;
          let t_collision = player_bottom - this.collisionCandidates[i].position._y;
          let l_collision = player_right - this.collisionCandidates[i].position._x;
          let r_collision = tiles_right - this.position._x;

          if ( // top collision
            t_collision < b_collision &&
            t_collision < l_collision &&
            t_collision < r_collision
          ) {
            
            if(this.collisionCandidates[i].platform){

              // this line will have to be added to left and right collisions to prevent tunneling 
              this.position._y = this.collisionCandidates[i].position._y - this.height
              this.velocity._y = this.velocity._y * -1
              this.velocity._y *= 0.8

              if(Math.abs(this.velocity._y) < 6){ // the 6 shouldn't be hard coded. perhaps it should be derrived from elasticity?
                this.velocity._y = 0
                this.position._y = this.collisionCandidates[i].position._y - this.height
                this.platform = true  
              }

              let _f = this.mass * (this.velocity._y * -1);
              this.collisionCandidates[i].velocity._y +=
              (_f / this.collisionCandidates[i].mass) * (this.elasticity * this.collisionCandidates[i].elasticity);    
            } 
            
            else {       
              this.platform = false      
              let _f = this.mass * this.velocity.getLength();
              this.collisionCandidates[i].velocity._y +=
              (_f / this.collisionCandidates[i].mass) *
              (this.elasticity * this.collisionCandidates[i].elasticity); }                        
            }

          if ( // bottom collision
            b_collision < t_collision &&
            b_collision < l_collision &&
            b_collision < r_collision
          ) {

            // this.collisionCandidates[i].position._y = this.position._y - this.collisionCandidates[i].height

            let _f = this.mass * this.velocity.getLength();
            this.collisionCandidates[i].velocity._y -=
              (_f / this.collisionCandidates[i].mass) *
              (this.elasticity * this.collisionCandidates[i].elasticity);
   
          }
          if ( // left collision
            l_collision < r_collision &&
            l_collision < t_collision &&
            l_collision < b_collision
          ) {          
            // this.collisionCandidates[i].position._x = this.position._x + this.width 

            let _f = this.mass * this.velocity.getLength();
            this.collisionCandidates[i].velocity._x +=
              (_f / this.collisionCandidates[i].mass) *
              (this.elasticity * this.collisionCandidates[i].elasticity);

                      
          }

          if ( // right collision
            r_collision < l_collision &&
            r_collision < t_collision &&
            r_collision < b_collision
          ) {
            
            // this.collisionCandidates[i].position._x = this.position._x - this.collisionCandidates[i].width 

            let _f = this.mass * this.velocity.getLength();
            this.collisionCandidates[i].velocity._x -=
              (_f / this.collisionCandidates[i].mass) *
              (this.elasticity * this.collisionCandidates[i].elasticity);

            
            
          }
        }

        this.colliding = {
          bool: true,
          coCollider: this.collisionCandidates[i]
        }
    } else {
      this.colliding = {
      bool: false,
      coCollider: {}
      };
    }
  }
}
