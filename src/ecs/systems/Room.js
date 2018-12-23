import System from './System';
import { Room } from "../util/Bridge";
import { Presence } from "../components";
import { logger } from '../util';

let logs = new logger("RoomSystem");
class RoomSystem extends System{
    update(dt, state) {
        //Move player to correct room
        if(state.events.moveTo)
            this.currRoom = this.moveTo(this.world.queryTag('player')[0], state.events.moveTo);

        return state;
    }


    moveTo(entity, roomName) {
        //If an entity does not have a presence component it cannot be moved
        if(!entity.hasComponent(Presence)) return false;

        //check if room exists
        let room = this.world.queryTag('room').filter(() => entity.name === roomName);

        if(room.length === 0)
            room = Room(this.world, roomName);

        entity.presence.room = room;

        return room;
    }
}

export default RoomSystem


