import { GET_DESC, UPDATE } from './types.js';
import World from '../../ecs';


export const update = (dt) => {
    World.update(dt);
    return {
        type: UPDATE,
        payload: World.getState()
    }
}
