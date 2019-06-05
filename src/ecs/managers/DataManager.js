import store from 'store'
import timm from 'timm'
import Manager from "./Manager";
import World from '..';
import isA from 'typeproof/core/isA';
import Mustache from 'mustache'
import strTemplate from '../util/descriptionTemplate'

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
    const props = (await import("../../data/items/index")).default;

    loaded['items'] = {descriptions, props};

    return loaded['items'];

  }

  hasDescription(type, name) {
    switch(type){
      case "room":
        name = name.split(".");
        return loaded[name[0]] && loaded[[name[0]]].descriptions && loaded[[name[0]]].descriptions.hasOwnProperty(name);
      case "item":
      case "items":
        return loaded.items.descriptions.hasOwnProperty(name);
    }
  }

  templateStr(gottenStr, entity) {
    if(gottenStr.text) gottenStr = gottenStr.text; 
    gottenStr = Mustache.render(gottenStr, strTemplate(entity))

    return gottenStr;
  }

  getFrom(path = [], state, entity) {
    if(isA.string(path)) path = path.split("/")
    if(state) path = timm.addLast(path, state);

    let gotten = timm.getIn(loaded, path);

    //Template descriptions
    if(path.includes('descriptions')) gotten = this.templateStr(gotten, entity);

    return gotten;
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