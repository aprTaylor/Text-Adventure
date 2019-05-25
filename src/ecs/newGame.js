/**
 * Loads data
 */
import World from ".";
import {Room, Player} from './Assemblages'
import {forEachObjIndexed} from 'ramda'

export default async function newGame(loaded, state) {
  //load persisted 
  state.persist = loaded.persist

  //load player
  Player();

  //load starting scene
  await World.managers.SceneManager.loadScene("town");

  World.IO.triggerEvent('moveTo', 'Field')
}
