import Manager from './Manager'
import { Room } from '../Assemblages';

let scene;
class SceneManager extends Manager {
  
  loadScene(sceneName) {
    scene = require(`../../data/${sceneName}.json`);

    //Load Rooms
    Object.keys(scene.rooms).forEach(roomName => {
      let roomDescs = scene.roomDesc[roomName];
      let desc = roomDescs.intro || roomDescs.standard;
      Room(this.world, roomName, desc.data.join(""));
    });

    return this;
  }
}

export default SceneManager