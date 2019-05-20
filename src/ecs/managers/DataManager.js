import Manager from "./Manager";

const scenePath = "../data/scenes/";
const descriptionPath = "descriptions.js";
const roomPath = "room.js"

class DataManager extends Manager {
  async getScene(name){
    const descriptions = await import(scenePath+name+descriptionPath);
    const rooms = await(scenePath+name+roomPath);

    return {descriptions, rooms}
  }
}



export default DataManager