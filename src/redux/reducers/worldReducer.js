import { UPDATE} from '../actions/types.js'

const initialState = {
     world: {
         description: ""
     }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE: return action.payload
        default: return state;                                                                                                                                                                        
    }
}