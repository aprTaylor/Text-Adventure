import genExits from './genExits';
import genMap from './genMap'
import * as actions from '../actions';

import { ROOMS, EXITS, DESCRIPTORS } from '../GameObjects';
import { Basic } from '../Displays/Basic';

export const initialState = {
  exits:  genExits(EXITS[ROOMS.FIELD], {room: ROOMS.FIELD}).exits,
  room: ROOMS.FIELD,
  world: {tick: 0},
  display: DESCRIPTORS[ROOMS.FIELD],
  actions: [],

  mapHasRendered: false,
  mapOptions: {
    physics:false,
    edges: {
        "smooth": {
            "type": "discrete",
            //"forceDirection": "vertical",
            "roundness": 0
        }
    }
  },
  mapData: {
    nodes: [],
    edges: []
  }
};
  
function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.CHANGE_ROOM:
      let newState ={
        display: DESCRIPTORS[action.room],
        actions: [],
        room: action.room
      }
      return genExits(updateMany(newState, state), action);
    case actions.CHANGE_DISPLAY:
      return updateX("display", action.display, state);
    case actions.UPDATE_TICK:
      return updateX("world", {tick: action.tick}, state);
    case actions.CLEAR_ACTIONS:
    case actions.ADD_ACTIONS:
      return updateX("actions", action.actions, state);
    case actions.GENERATE_MAP: 
      return genMap(state, action);
    case actions.MAP_RENDERED:
      return updateX("mapRendered", true, state);
    default:
      return state;
    }
  }


export const updateX = (key, value, state) => {
  return {...state, [key]: value};
}

const updateMany = (updatedState, oldState) => {
  return {...oldState, ...updatedState};
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
  