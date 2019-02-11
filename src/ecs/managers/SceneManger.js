import { asyncForEach, filterWithKeys } from '../util'
import { forEach, forEachObjIndexed } from 'ramda'
import Manager from './Manager'
import { Room, Exit } from '../Assemblages';

let scene;
//TODO: fix scene manager
class SceneManager extends Manager{
  
  async loadScene(sceneName) {
    const scene = await this.managers
                            .DataManager
                            .get('scene', sceneName)

    //Load Rooms
    let roomMap = {};
    await asyncForEach(await scene.rooms_, async (room) => {
      const desc = await room.description_;
      roomMap[room.name] = {
        room: Room(this.world, room.name, desc.text.join("")),
        exits: filterWithKeys((_, exit) => exit !== undefined, room.exits)
      }
    })

    forEachObjIndexed((roomInfo, roomName) => {
      forEachObjIndexed((exit, dir) => {
         Exit(this.world, roomInfo.room, roomMap[exit].room, dir)
      }, roomInfo.exits)
    }, roomMap)
    
    return this;
  }
}

export default SceneManager