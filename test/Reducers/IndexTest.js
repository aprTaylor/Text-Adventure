import { assert } from 'chai'
import reducer, { initialState } from '../../src/Reducers/index'
import { ROOMS, EXITS } from '../../src/GameObjects'
import * as actions from '../../src/actions/index'

describe("Reducer", () => {
    it('should return initial state when state is not specified', () => {
        assert.equal(reducer(), initialState);
    });
    it('changeRoom action should store room info', () => {
        let action = {type: actions.CHANGE_ROOM, room: ROOMS.TEST, display: "display", }
        let exits = ["north", "south", "east", "west"]
        assert.deepEqual(reducer(initialState, action), {...initialState, 
            room: ROOMS.TEST, display: "display", exits});
    });
    it('changeDisplay action should store display info', () => {
        let action = {type: actions.CHANGE_DISPLAY, display: "display", }
        assert.deepEqual(reducer(initialState, action), {...initialState, 
        display: "display"});
    });
    it('updateTick action should store new tick in world state', () => {
        let action = {type: actions.UPDATE_TICK, tick: 10, }
        assert.deepEqual(reducer(initialState, action), {...initialState, 
        world: {...initialState.world, tick: 10}});
    });
});