let updateTick = (state, action) => {
    //if (!action.tick) return state;
    console.log({world: {tick: action.tick}, ...state})
    return {world: {tick: action.tick}, ...state}
    //state.world.tick = state.world.tick++ //+ action.tickChange;   
    //return state;
};

export default updateTick