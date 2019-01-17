import { forEach } from 'async'
import Manager from './Manager'
import { Room } from '../Assemblages';

let scene;
//TODO: fix scene manager
class SceneManager extends Manager{
  
  async loadScene(sceneName) {
    const scene = await this.managers
                            .DataManager
                            .get('scene', sceneName)

    //Load Rooms
    await forEach(await scene.rooms_, async (room, onErr) => {
      const desc = await room.description_;
      Room(this.world, room.name, desc.text.join(""));
    })

    return this;
  }
}

export default SceneManager