import SceneManager from '../managers/SceneManger'
import DataManager from '../managers/DataManager'
//Rooms
import { Player } from '../Assemblages'
//Systems
import PlayerSystem from '../systems/Player';
import RoomSystem from '../systems/Room';
import SightSystem from '../systems/Sight';
//util
import { bind_trailing_args } from '.';

/***  ENTITIES ***********************************************************/

export const entities = [
    bind_trailing_args(Player)
];

/*** SYSTEMS ****************************************************************/

export const systems = [
    RoomSystem, SightSystem
];

/*** Managers *****************************************************************/
export const managers = {
    SceneManager, DataManager
}

