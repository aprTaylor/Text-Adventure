//Managers
import DataManager from '../managers/DataManager'
import SceneManager from '../managers/SceneManager'
//Rooms
import { Player } from '../Assemblages'
//Components 
import * as Components from '../components'
//Systems

//util
import { bind_trailing_args } from '.';

/*** COMPONENTS */
export const components = Components;

/*** SYSTEMS ****************************************************************/


/*** Managers *****************************************************************/
const managers = {
    DataManager, SceneManager
}

/***  ENTITIES ***********************************************************/

export default load = (ecs, ecsPool, managersFromWorld) => {
    const systemsForWorld = forEach(sys => ecs.add(sys), systems);
    forEachObjIndexed((comp, compName) => ecsPool.registerComponent(compName.toLowerCase(), comp), components);
    forEachObjIndexed((manager, key) => {
        managersFromWorld[key] = new manager(ecs);
    }, managers);
    return systemsForWorld;

}