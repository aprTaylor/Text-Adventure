import World from ".";
import {Room, Player} from './Assemblages'
import {forEachObjIndexed} from 'ramda'

export default function newGame() {
  //load starting scene
  World.managers.SceneManager.loadScene("town");
  //load player
  Player();
}
