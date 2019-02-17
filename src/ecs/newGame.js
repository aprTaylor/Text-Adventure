import World from ".";
import {Room, Player} from './Assemblages'
import {forEachObjIndexed} from 'ramda'

export default function newGame() {
  let rooms =  World.managers.DataManager.getRooms();
  //Load rooms
  forEachObjIndexed((room, roomName) => Room(roomName, room.description), rooms);
  //load player
  Player();
}
