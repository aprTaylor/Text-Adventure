import genExits from './genExits';
import addActions from './addActions';
import * as actions from '../actions';

import { ROOMS, EXITS, DESCRIPTORS } from '../GameObjects';
import { Basic } from '../Displays/Basic';

export const initialState = {
  exits:  genExits(EXITS[ROOMS.FIELD], {room: ROOMS.FIELD}).exits,
  room: ROOMS.FIELD,
  world: {tick: 0},
  display: DESCRIPTORS[ROOMS.FIELD],
  actions: []
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
    case actions.CLEAR_ACTIONS:
    case actions.ADD_ACTIONS:
      return updateX("actions", action.actions, state);
    default:
      return state;
    }
  }


export const updateX = (key, value, state) => {
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
  