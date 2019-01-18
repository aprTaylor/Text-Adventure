import nano from 'nano-ecs'
import { RxDatabase } from 'rxdb'
import { map, forEach, forEachObjIndexed } from 'ramda'

import { systems as Systems, entities as Entities, managers as Managers} from './util/dataToLoad'
import { logger, validate } from './util';
import System from './systems/System'
import Manager from './managers/Manager'
import './util/typeDef'

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


class World {
    static instance;
    /**
     * Initialize world with either passed or standard parameters
     * @param {object} config
     * @param {function} config.callback
     * @param {[System]} config.systems 
     * @param {[Entity]} config.entities 
     * @param {[Manager]} config.managers
     * @param {RxDatabase} config.database
     */
    constructor({database, callback, managers:_managers = Managers, systems:_systems = Systems, entities = Entities}){
        if(!validate(database)) throw new Error("Database must be defined");
    
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
        managers.SceneManager
                .loadScene('town_edge')
                .then(_ => typeof callback==='function'?callback():"");
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

