import { UPDATE } from './types.js';
import World from '../../ecs';


export const update = (dt) => {
    World.update(dt);
    return {
        type: UPDATE,
        payload: World.IO.getState().world
    } 
}

export const Action = {
    exitToRoom: (roomName) => {
        World.IO.triggerEvent('moveTo', roomName);
        World.IO.takeAction('look');
    }
}