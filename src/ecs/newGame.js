/**
 * Loads data
 */
import {Room, Player} from './Assemblages'
import {forEachObjIndexed} from 'ramda'

export default async function newGame(lworld, oaded, state) {
  //load persisted 
  state.persist = loaded.persist

  //load entities
  if(!loaded.entities) await setUpNewGame();
  else world.Entity.load(loaded.entities);


}

const setUpNewGame = async () => {
  Player('Field');
  
  //load items
  await World.managers.DataManager.getItems();

  //load starting scene
  await World.managers.SceneManager.loadScene("town");
}

