export default function collisionDirection (player, collider){
    let player_bottom = player.position._y + player.height;
    let tiles_bottom  = collider.position._y + collider.height;
    let player_right  = player.position._x + player.width;
    let tiles_right   = collider.position._x + collider.width;
    
    let b_collision   = tiles_bottom - player.position._y;
    let t_collision   = player_bottom - collider.position._y;
    let l_collision   = player_right - collider.position._x;
    let r_collision   = tiles_right - player.position._x;

    if ( // top collision
    t_collision < b_collision &&
    t_collision < l_collision &&
    t_collision < r_collision
    ) { return 'top' }

    if ( // bottom collision
    b_collision < t_collision &&
    b_collision < l_collision &&
    b_collision < r_collision
    ) { return 'bottom' }

    if ( // left collision
    l_collision < r_collision &&
    l_collision < t_collision &&
    l_collision < b_collision
    ) { return 'left' }

    if ( // right collision
    r_collision < l_collision &&
    r_collision < t_collision &&
    r_collision < b_collision
    ) { return 'right' }
}
