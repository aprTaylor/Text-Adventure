import Manager from "./Manager";

const logger = require('logdown')('app:DataManager.js')

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
}



export default DataManager