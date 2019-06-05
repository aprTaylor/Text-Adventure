import { asyncForEach, filterWithKeys } from '../util'
import isA from 'typeproof/core/isA'
import { forEachObjIndexed } from 'ramda'
import World from '..'
import Manager from './Manager'
import { Room, Exit } from '../Assemblages';

const logger = require('logdown')('app:manager/SceneManager.js')

let scene;
//TODO: fix scene manager
class SceneManager extends Manager{
  
  //Will only load unloaded scenes
  async loadScene(sceneName) {
    logger.info("Loading Scene", '"'+sceneName+'"', "...");

    const scene = await this.managers
                            .DataManager
                            .getScene(sceneName);
    //Already loaded
    if(!scene) return;

    //Load Rooms
    let roomMap = {};
    let entry = scene.rooms.Entry;
    //Load each room in the scene
    forEachObjIndexed((val, key) => {

      //Skip the entry key
      if(key === 'Entry') return;

      //Load room
      Room(sceneName, key, scene.descriptions[key].intro?'intro':'standard');
      //alias entity id
      const id = World.Entity._lastCreatedEntity; //Not good async solution
      //store refs for creating exits
      roomMap[key] = {
        name: key,
        id,
        exits: filterWithKeys((_, exit) => exit !== undefined, val.exits)
      }

      //load items in the scene
      if(isA.array(val.items)){
        val.items.forEach(item => {
          let name = item;
          if(isA.object(item)) name = item.name;

          World.Entity.constructItem(name, id);
        })
      }

      //Set player location to the scene entry point (Subject to change)
      //if(key === entry) 
      //  World.Entity.getFirstFromTag('player').presence = id;
    }, scene.rooms)

    forEachObjIndexed((roomInfo, roomName) => {
      forEachObjIndexed((exit, dir) => {
         Exit(roomMap[exit].name, roomInfo.id, roomMap[exit].id, dir)
      }, roomInfo.exits)
    }, roomMap)

    logger.info("Done loading scene", '"'+sceneName+'"', "");
    return this;
  }
}

export default SceneManager