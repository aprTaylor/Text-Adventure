import genExits from './genExits';
import * as actions from '../actions';
import { ROOMS, EXITS } from '../GameObjects';
import { Basic } from '../Displays/Basic'

const initialState = {
  exits:  EXITS[ROOMS.LAVENDER_FIELD],
  room: ROOMS.LAVENDER_FIELD,
  world: {tick: 0},
  display: new Basic("The wind blew gently on the lavender fields")
};
  
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CHANGE_ROOM:
      let newState = updateX("display", action.display, state);
      newState = updateX("room", action.room, newState);
      return updateX("exits", EXITS[action.room], newState);
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
  