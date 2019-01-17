import nano from 'nano-ecs'
import { RxDatabase } from 'rxdb'
import { map, forEach, forEachObjIndexed } from 'ramda'

import { systems as Systems, entities as Entities, managers as Managers} from './util/dataToLoad'
import { logger } from './util';
import System from './systems/System'

//Initial State
let state = {
    events: {
        moveTo: "Home",
        actions: {look: true}
    },
    world: {
        description: "",
        exitNames: []
    }
};
let systems;
let managers = {};
let ces;

/**
 * Point of access for game logic
 * @param {RxDatabase} database
 * @param {[System]} _systems 
 * @param {[Entity]} entities 
 */
class World {
    static instance;
    constructor(database, _managers, _systems, entities = []){
        if(World.instance){
            return World.instance;
        }
        //init
        ces = nano();
        World.instance = this;

        //Load 
        forEachObjIndexed((manager, key) => {
            managers[key] = new manager(managers, database, ces);
        }, _managers)
        systems = map(sys => new sys(managers, ces), _systems);
        entities = forEach(e => e(ces), entities);

        //Load Scene
        this.isLoading = true;
        managers.SceneManager.loadScene('town_edge').then(val => this.isLoading = false);
    }


    static getState() {
        return Object.assign({}, state);
    }

    /**
     * Runs the update method of all the systems.
     *
     * @memberof World
     * @param {number} dt The time since last update
     */
    static update = (dt) => {
        systems.forEach(sys => state = sys.update(dt, state));
        //clean events
        state.events = {actions: {}};
    }

    static takeAction = (action, ...data) => {
        state.events.actions[action] = data;
    }

    static triggerEvent = (event, ...data) => {
        state.events[event] = data;
    }
}

export default World

/**
 * Initialize world with either passed or standard parameters
 * @param {RxDatabase} database
 * @param {[System]} systems 
 * @param {[Entity]} entities 
 */
export const loadWorld = (database, managers = Managers, systems = Systems, entities = Entities) => 
                            new World(database, managers, systems, entities);
