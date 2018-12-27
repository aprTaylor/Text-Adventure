import System from './System';
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
        //get room
        let room = this.world.queryTag('room').filter((room) => room.name.label === roomName);
        entity.presence.room = room[0];

        return room;
    }
}

export default RoomSystem


