import { EXITS } from '../GameObjects'

const genExits = (state, action) => {
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