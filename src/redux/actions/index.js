import { UPDATE } from './types.js';
import World from '../../ecs';

const logger = require('logdown')('redux:actions.js');

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