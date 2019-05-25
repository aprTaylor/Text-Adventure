import { UPDATE} from '../actions/types.js'
import World from '../../ecs/index.js';

const logger = require('logdown')("worldReducer.js")

const initialState = World.IO.getState().world

export default function(state = initialState, action) {
    logger.info("State", state);
    switch(action.type) {
        case UPDATE: return action.payload
        default: return state;                                                                                                                                                                        
    }
}