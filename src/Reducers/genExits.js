import { EXITS } from '../GameObjects'

let genExits = (state, action) => {
    if (!action.room) return state;

    let roomExits = EXITS[action.room];
    let exits = Object.keys(roomExits).map((dir, index) => {
        return roomExits[dir];
    });
    return {
        ...state,
        exits: exits
    };
};

export default genExits;