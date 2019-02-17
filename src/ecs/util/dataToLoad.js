//Managers
import DataManager from '../managers/DataManager'
//Rooms
import { Player } from '../Assemblages'
//Components 
import * as Components from '../components'
//Systems
import PlayerSystem from '../systems/Player';
import RoomSystem from '../systems/Room';
import SightSystem from '../systems/Sight';
import ExitSystem from '../systems/Exits'
//util
import { bind_trailing_args } from '.';

/*** COMPONENTS */
export const components = Components;

/*** SYSTEMS ****************************************************************/

export const systems = [
    RoomSystem, SightSystem, ExitSystem
];

/*** Managers *****************************************************************/
export const managers = {
    DataManager
}

/***  ENTITIES ***********************************************************/

export const entities = [
];

