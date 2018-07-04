import { assert } from 'chai'
import genExits from '../../src/Reducers/genExits'
import { ROOMS, EXITS } from '../../src/GameObjects'
import * as actions from '../../src/actions/index'

describe("genExits", () => {
    it('should return unchanged state if room is not specified in the action', () => {
        let state = {key: "value", exits: undefined}
        assert.equal(genExits(state, {}), state);
    });
    it('should convert room object values to array', () => {
        let state = {key: "value", exits: undefined} 
        assert.deepEqual(genExits(state, {room: ROOMS.TEST}), 
        {...state, exits: ["north", "south", "east", "west"]});
    });
});