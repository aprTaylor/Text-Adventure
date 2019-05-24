import System from './System';
import World from '../'
import { Presence, Name } from "../components";
import { logger } from '../util';

function RoomSystem (pool, dt)  {
    //Move player to correct room
    this.currRoom = moveTo(World.Entity.byTag('player')[0], World.IO.state.events.moveTo);
}


const moveTo = (entity, roomName) => {
    //If an entity does not have a presence component it cannot be moved
    if(!entity.presence) return false;

    //get room
    let room = this.world.queryTag('room').filter((room) => room.name.label === roomName);
    entity.presence.room = room[0];

    return room;
}

export default RoomSystem


