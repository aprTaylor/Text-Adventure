import { GET_DESC, UPDATE } from './types.js';
import World from '../../ecs';

export const getDesc = () => (
    {
        type: GET_DESC,
        payload: world.getState().description
    }
);

export const update = (dt) => {
    World.update(dt);
    return {type: UPDATE}
}
