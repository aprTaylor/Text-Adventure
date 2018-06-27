import { EXITS } from '../GameObjects'

let genExits = (state, action) => {
    console.log("gen Exits");
    if (!action.room) return state;

    let roomExits = EXITS[action.room];
    let exits = Object.keys(roomExits).map((exits, dir) => {
        return exits.push(roomExits[dir]);
    }, []);
    
    return {
        ...state,
        exits
    };
};

export default genExits