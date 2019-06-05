/**
 * Loads data
 */
import World from ".";
import {Room, Player} from './Assemblages'
import {forEachObjIndexed} from 'ramda'

export default async function newGame(loaded, state) {
  //load persisted 
  state.persist = loaded.persist

  //load entities
  if(!loaded.entities) await setUpNewGame();
  else World.Entity.load(loaded.entities);


}

const setUpNewGame = async () => {
  Player('Field');
  
  //load items
  await World.managers.DataManager.getItems();

  //load starting scene
  await World.managers.SceneManager.loadScene("town");
}

