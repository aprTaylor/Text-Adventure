import System from './System';
import World from '../'

const logger = require('logdown')('app:system/RoomSystem.js')

function RoomSystem (pool, dt)  {
    //Move player to correct room
    if(World.IO.getState().events.moveTo){
        const currRoom = moveTo(World.Entity.byTagGet('player')[0], World.IO.getState().events.moveTo);
        World.IO.persist(['visited', currRoom.name.label], true)
    }
}


const moveTo = (entity, roomName) => {
    //If an entity does not have a presence component it cannot be moved
    if(!entity.presence) return false;

    //get room
    let room = World.Entity.byTagGet('room').filter((room) => {
        return room.name.label === roomName
    });
    entity.presence.room = room[0];

    return room[0];
}

export default RoomSystem


