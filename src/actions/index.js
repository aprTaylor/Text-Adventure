export const CHANGE_ROOM = 'CHANGE_ROOM';
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
export const UPDATE_TICK = 'UPDATE_TICK';
export const ADD_ACTIONS = 'ADD_ACTIONS';
export const CLEAR_ACTIONS = 'CLEAR_ACTIONS'

export const changeRoom = newRoom => ({
    type: CHANGE_ROOM,
    room: newRoom,
});

export const changeDisplay = display => ({
    type: CHANGE_DISPLAY,
    display: display
});

export const clearActions = () => ({
    type: CLEAR_ACTIONS,
    actions: []
});

export const addActions = (actions, newActions) => ({
    type: ADD_ACTIONS,
    actions: actions.concat(newActions)
});

export const updateTick = (tick, tickAmnt = 1) => ({
    type: UPDATE_TICK,
    tick: tick+tickAmnt
});