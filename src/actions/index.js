export const CHANGE_ROOM = 'CHANGE_ROOM';
export const UPDATE_TICK = 'UPDATE_TICK';

export const changeRoom = newRoom => ({
    type: CHANGE_ROOM,
    room: newRoom
});

export const updateTick = (tick) => ({
    type: UPDATE_TICK,
    tick: tick+1
});