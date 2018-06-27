import { EXITS } from '../GameObjects'

let genExits = (state, action) => {
    console.log("gen Exits");
    if (!action.room) return state;

    let roomExits = EXITS[action.room];
    let exits = Object.keys(roomExits).reduce((exits, dir) => {
        return exits.push(roomExits[dir]);
    }, []);
    
    return {
        ...state,
        exits
    };
};

export default genExits