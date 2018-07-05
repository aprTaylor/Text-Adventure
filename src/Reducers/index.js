import genExits from './genExits';
import * as actions from '../actions';
import { ROOMS, EXITS, DESCRIPTORS } from '../GameObjects';
import { Basic } from '../Displays/Basic'

export const initialState = {
  exits:  genExits(EXITS[ROOMS.LAVENDER_FIELD], {room: ROOMS.LAVENDER_FIELD}).exits,
  room: ROOMS.LAVENDER_FIELD,
  world: {tick: 0},
  display: DESCRIPTORS[ROOMS.LAVENDER_FIELD],
};
  
function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.CHANGE_ROOM:
      let newState = updateX("display", action.display, state);
      newState = updateX("room", action.room, newState);
      return genExits(newState, action);
    case actions.CHANGE_DISPLAY:
      return updateX("display", action.display, state);
    case actions.UPDATE_TICK:
      return updateX("world", {tick: action.tick}, state);
    default:
      return state;
    }
  }


const updateX = (key, value, state) => {
  return {...state, [key]: value};
}
/*
const updateRoom = (state, action) => {
  return {...state, room: action.display};

const updateDisplay = (state, action) => {
  return {...state, display: action.display};
}

const updateTick = (state, action) => {
  return {...state, world: {tick: action.tick}};
}*/
  
export default reducer;
  