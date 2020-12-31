import utils from './utilities'

/* 

This function is called inside of a prop. 'this' in the function will always refer to the prop that's calling it. 

*/

export default function collisionFunction() {
  // Why not use a forEach? is it slower? scope?
  for (let i = 0; i < this.collisionCandidates.length; i++) {

    let coColliders = []

      // if there is a collision ...
      if (utils.rectIntersect(this.collisionCandidates[i], this) && this.collisionCandidates[i] != this) {

        // not even sure if this is working
        coColliders.push(this.collisionCandidates[i])
        

        if(this.collisionFunctions){
          this.collisionFunctions.forEach(cfunc => {
          let bcfunc = cfunc.bind(this);
          bcfunc(coColliders);
        })
      }


        
        if (this.solid) {

          // the logic that checks collision angle can probably be split into its own function that takes two props as parameters
          // and returns a string indicating the collision direction. then the code will be re-written like this
          // if (checkCollisionDirection(this, collisionCandidates[i]) === 'bottom'){
          //      //do the math for a bottom collision
          // }

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
            
            if(this.collisionCandidates[i].platform){ // the logic that handles collision for platforms

              // this line will have to be added to left and right collisions to prevent tunneling 
              this.position._y = this.collisionCandidates[i].position._y - this.height
              this.velocity._y = this.velocity._y * -1
              this.velocity._y *= 0.8

              
              if(Math.abs(this.velocity._y) < 6){ // if its y velocity is less than 6, make it zero. prevents endless jittering of stacked props.  
                this.velocity._y = 0
                this.position._y = this.collisionCandidates[i].position._y - this.height
                this.platform = true  
              }

              let _f = this.mass * (this.velocity._y * -1);
              this.collisionCandidates[i].velocity._y +=
              (_f / this.collisionCandidates[i].mass) * (this.elasticity * this.collisionCandidates[i].elasticity);    
            } 
            
            else { 
              // this is the regular collision funciton. can probably be split into its own function that takes a string as an arg
              // ('left', 'right', 'bottom', 'top') and applies the appropriate operations

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

        // telling the prop about its co-collider
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
