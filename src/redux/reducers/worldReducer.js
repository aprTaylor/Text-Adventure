import { UPDATE} from '../actions/types.js'
import World from '../../ecs/index.js';

const initialState = World.IO.getState().world

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE: return action.payload
        default: return state;                                                                                                                                                                        
    }
}