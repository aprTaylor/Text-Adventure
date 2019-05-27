import System from './System';
import World from '../'

const logger = require('logdown')('app:system/RoomSystem.js')

function RoomSystem (pool, dt)  {
    //Move player to correct room
    if(World.IO.getState().events.moveTo){
        const currRoom = System.moveTo(World.Entity.byTagGet('player')[0], World.IO.getState().events.moveTo);
        currRoom.visited.isTrue = true;
    }
}

export default RoomSystem


