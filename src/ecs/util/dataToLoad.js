//Managers
import DataManager from '../managers/DataManager'
import SceneManager from '../managers/SceneManager'
//Rooms
import { Player } from '../Assemblages'
//Components 
import * as Components from '../components'
//Systems
import DescriptionSystem from '../systems/Description'
import PlayerSystem from '../systems/Player';
import RoomSystem from '../systems/Room';
import SightSystem from '../systems/Sight';
import ExitSystem from '../systems/Exits'
import ActionSystem from '../systems/Action'
//util
import { bind_trailing_args } from '.';

/*** COMPONENTS */
export const components = Components;

/*** SYSTEMS ****************************************************************/

export const systems = [
    PlayerSystem, RoomSystem, ActionSystem, DescriptionSystem, SightSystem, ExitSystem
];

/*** Managers *****************************************************************/
export const managers = {
    DataManager, SceneManager
}

/***  ENTITIES ***********************************************************/

export const entities = [
];

