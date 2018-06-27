import genExits from './genExits';
import updateTick from './updateTick'
import * as actions from '../actions';
import { ROOMS } from '../GameObjects'

const initialState = {
  exits:  [ROOMS.HOME, ROOMS.FOREST],
  world: {tick: 0}
};
  
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_ROOM:
      return genExits(state, action);
    case actions.UPDATE_TICK:
      //console.log("reducer is called");
      //console.log(updateTick(state, action))//, //({world: {tick: count++}, ...state}));
      //return updateTick(state, action);
      //let tickc = state.world.tick++//+ action.tickChange
      //console.log(state.world.tick, action, state.world.tick+action.tickChange);
    return updateTick(state, action)//{world: {tick: (tickc)}, ...state}//(updateTick(state, action));
    default:
      return state;
    }
  }
  
export default reducer;
  