import { UPDATE } from './types.js';
import World from '../../ecs';


export const update = (dt) => {
    World.update(dt);
    return {
        type: UPDATE,
        payload: World.getState().world
    }
}

export const Action = {
    exitToRoom: (roomName) => {
        World.triggerEvent('moveTo', roomName);
        World.takeAction('look');
    }
}