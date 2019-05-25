import store from 'store'
import Manager from "./Manager";
import World from '..';

const logger = require('logdown')('app:DataManager.js');

const scenePath = "data/scenes/";
const descriptionPath = "descriptions.js";
const roomPath = "room.js"

class DataManager extends Manager {
  async getScene(name){
    name = name+"/";
    const descriptions = (await import("../../"+scenePath+name+descriptionPath)).default;
    const rooms = (await import("../../"+scenePath+name+roomPath)).default;

    return {descriptions, rooms}
  }

  save() {
    //Save world persist data
    store.set("persist", World.IO.getState().persist);
  }

  load({persist}) {
    return {
      persist: store.get('persist', persist)
    }
  }
}



export default DataManager