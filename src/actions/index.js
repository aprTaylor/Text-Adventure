export const CHANGE_ROOM = 'CHANGE_ROOM';
export const CHANGE_DISPLAY = 'CHANGE_ROOM_DISPLAY';
export const UPDATE_TICK = 'UPDATE_TICK';

//TODO: Implement room state system for room displays
export const changeRoom = newRoom => ({
    type: CHANGE_ROOM,
    room: newRoom
});

export const changeDisplay = display => ({
    type: CHANGE_DISPLAY,
    display: display
});

export const updateTick = (tick, tickAmnt = 1) => ({
    type: UPDATE_TICK,
    tick: tick+tickAmnt
});