/***  ENTITIES ***********************************************************/
//Rooms
import { Room } from './Assembleges'
import { RoomParser } from './Parser'
const Rooms = (world) => {
    RoomParser.rooms.forEach(room => {
        Room(world, room, RoomParser.desc[room.name]);
    })
}


export const entities = [
    Rooms
];

/*** SYSTEMS ****************************************************************/
export const systems = [

];

