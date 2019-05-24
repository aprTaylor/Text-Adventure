import Manager from "./Manager";
import {logger} from '../util'

const scenePath = "data/scenes/";
const descriptionPath = "descriptions.js";
const roomPath = "room.js"

class DataManager extends Manager {
  async getScene(name){
    name = name+"/";
    const descriptions = await import("../../"+scenePath+name+descriptionPath);
    const rooms = await import("../../"+scenePath+name+roomPath);

    return {descriptions, rooms}
  }
}



export default DataManager