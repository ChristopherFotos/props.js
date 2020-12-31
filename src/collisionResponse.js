// parameters: player (this), coCollider (this.collisionCandidates[i].elasticity), direction

export default function collisionResponse(player, coCollider, direction) {
    // top
    if(direction === 'top'){
        let _f = player.mass * (player.velocity._y * -1);
        coCollider.velocity._y +=
        (_f / coCollider.mass) * (player.elasticity * coCollider.elasticity);
    } 

    // bottom
    if(direction === 'bottom'){
        let _f = player.mass * player.velocity.getLength();
        coCollider.velocity._y -=
        (_f / coCollider.mass) *
        (player.elasticity * coCollider.elasticity);
    }

    // left
    if(direction === 'left'){
        let _f = player.mass * player.velocity.getLength();
        coCollider.velocity._x +=
        (_f / coCollider.mass) *
        (player.elasticity * coCollider.elasticity);
    }

    // right
    if(direction === 'right'){
        let _f = player.mass * player.velocity.getLength();
        coCollider.velocity._x -=
        (_f / coCollider.mass) * (player.elasticity * coCollider.elasticity);   
    }
}

