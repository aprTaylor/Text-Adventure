import store from 'store'
import timm from 'timm'
import Manager from "./Manager";
import World from '..';
import isA from 'typeproof/core/isA';

const logger = require('logdown')('app:DataManager.js');

const scenePath = "data/scenes/";
const descriptionPath = "descriptions.js";
const roomPath = "room.js"

const loaded = {};
class DataManager extends Manager {
  async getScene(name) {
    //Only load once
    if(loaded[name]) return;

    let name_ = name+"/";
    const descriptions = (await import("../../"+scenePath+name_+descriptionPath)).default;
    const rooms = (await import("../../"+scenePath+name_+roomPath)).default;

    loaded[name] = {descriptions, rooms};

    return loaded[name];
  }

  async getItems() {
    if(loaded['items']) return;

    const descriptions = (await import("../../data/items/descriptions")).default;
    const items = (await import("../../data/items/index")).default;

    loaded['items'] = {descriptions, items};

    return loaded['items'];

  }

  getFrom(path, state) {
    if(isA.string(path)) path = path.split("/")
    if(state) path = timm.addLast(path, state);

    return timm.getIn(loaded, path);
  }

  get (path) {
   
  }

  save() {
    //Save world persist data
    store.set("persist", World.IO.getState().persist);
    store.set("entities", World.Entity.save());
  }

  load({persist, entities}) {
    return {
      persist: store.get('persist', persist),
      entities: store.get('entities', entities)
    }
  }
}



export default DataManager