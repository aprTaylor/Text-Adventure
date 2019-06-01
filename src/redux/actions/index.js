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

/** Does not effect UI data so does not need to be dispatched */
export const Action = {
    exitToRoom: (roomName) => {
        World.IO.triggerEvent('moveTo', roomName);
        World.IO.takeAction('look');
    },
    takeAction: (action, data) => {
        World.IO.takeAction(action, data);
    }
}