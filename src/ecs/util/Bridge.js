/**
 * Provide a bridge between data querying and entity creation
 */

import { Room as RoomAsm } from '../Assemblages'
import { RoomParser } from "./Parser";
import { logger } from '.';

//TODO: Extend room data querying
let logs = new logger("Bridge");
export const Room = (world, roomName) => {
    let desc = RoomParser.desc[roomName];

    return RoomAsm(world, roomName, desc.standard.data[0]);
}