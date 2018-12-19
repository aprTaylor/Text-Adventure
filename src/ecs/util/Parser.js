let rooms = require('../../data/rooms.json');
let roomDesc = require('../../data/roomDesc.json');

function parseRooms(){
    this.rooms = rooms;
    this.desc = roomDesc;
}
export const RoomParser = new parseRooms();

