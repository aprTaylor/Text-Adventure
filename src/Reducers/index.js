import genExits from './genExits';
import genMap from './genMap'
import updateInventory from './updateInventory'
import * as action from '../actions';
import * as names from '../actions/names';

import { ROOMS, EXITS, DESCRIPTORS } from '../GameObjects';
import { Basic } from '../Displays/Basic';

export const initialState = {
  exits:  genExits(EXITS[ROOMS.FIELD], {room: ROOMS.FIELD}).exits,
  room: ROOMS.FIELD,
  world: {tick: 0, inventory: {}},
  display: DESCRIPTORS[ROOMS.FIELD],
  actions: [],

  mapHasRendered: false,
  mapOptions: {
    autoResize: true,   
    physics:false,
    edges: {
        "smooth": {
            "type": "discrete",
            //"forceDirection": "vertical",
            "roundness": 0
        }
    },
    interaction: {
      dragView: false,
      selectable: false
    },
    nodes:{
      shape: "square"
    }
  },

  mapData: {
    nodes: [],
    edges: []
  }
};
  
function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case names.CHANGE_ROOM:
      let newState ={
        display: DESCRIPTORS[action.room],
        actions: [],
        room: action.room
      }
      return genExits(updateMany(newState, state), action);
    case names.CHANGE_DISPLAY:
      return updateX("display", action.display, state);
    case names.UPDATE_TICK:
      return updateX("world", {tick: action.tick}, state);
    case names.CLEAR_ACTIONS:
      return updateX("actions", action.actions, state);
    case names.GENERATE_MAP: 
      return genMap(state, action);
    case names.MAP_RENDERED:
      return updateX("mapRendered", true, state);
    case names.ADD_TO_INVENTORY:
    case names.REMOVE_FROM_INVENTORY:
      return updateInventory(action, state);
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
  