/**
 * Allows for accessing and updating game state
 * Types of state:
 * * events: Used to send messages to states. Is reset every cycle.
 * * world: Used to send data to the UI and store session specific data.   
 * * persist: Used to represent data that will persist for the entire playthrough.
 *   Will be loaded from the save file.  
 */
import timm from 'timm'
import {forceArray} from '../util/index'
const logger = require('logdown')('app:engine/IO.js');

let state;

class IO {
  constructor(state_) {
    state = state_;
  }

  /**
   * @param {String} action Name of action to take
   * @memberof IO
   */
  takeAction = (action, data = true) => {
    logger.info("Action taken", action)
    state = timm.setIn(state, ['events', 'actions', action], data);
  }

  /**
   * @param {[string]|string} eventPath Adjustable updating of events
   * @param {any} data relevant event data
   * @memberof IO
   */
  triggerEvent = (eventPath, data) => {
    logger.info("Event triggered", eventPath, data)
    state = timm.setIn(state, ['events', ...forceArray(eventPath)], data);
  }

  /**
   * @param {[string]|string} idPath Adjustable updating of data
   * @param {any} data relevant data
   * @memberof IO
   */
  persist = (idPath, data) => {
    state = timm.setIn(state, ['persist', ...forceArray(idPath)], data);
  } 

  /**
   * Meant to be used 
   * @param {[string]|string} facetPath Adjustable updating of data
   * @param {any} data relevant data
   * @param {"push"} transform relevant data
   * @memberof IO
   */
  updateWorld = (facetPath, data, transform) => {
    switch(transform){
      case "push": data = timm.addLast(timm.getIn(state, ['world', ...forceArray(facetPath)]), data)
    }
    state = timm.setIn(state, ['world', ...forceArray(facetPath)], data);
  }

  getState() {
      return Object.assign({}, state);
  }

  /**
   * Resets ALL events. This is done automatically every game loop. 
   * No need to be used manually.
   */
  resetEvents () {
    state = timm.setIn(state, ['events', 'actions'], {actions: {}})
  }
}

export default IO



