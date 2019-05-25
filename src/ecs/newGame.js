import World from ".";
import {Room, Player} from './Assemblages'
import {forEachObjIndexed} from 'ramda'

export default async function newGame() {
  //load player
  Player();

  //load starting scene
  await World.managers.SceneManager.loadScene("town");

  World.IO.triggerEvent('moveTo', 'Field')
}
