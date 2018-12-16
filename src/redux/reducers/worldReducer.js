import { GET_DESC, UPDATE} from '../actions/types.js'

const initialState = {
    description: ""
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_DESC:
            return {
                ...state,
                description: action.payload,
            };
        case UPDATE:
        default: return state;                                                                                                                                                                        
    }
}