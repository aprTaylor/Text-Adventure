import { EntityComponentSystem, EntityPool} from 'entity-component-system'
import { forEach, forEachObjIndexed } from 'ramda'

import _Entity from './engine/Entity'
import _IO from './engine/IO'

//import load from './util/dataToLoad'
import System from '../systems/System'
import Manager from './managers/Manager'
import './util/typeDef'
import newGame from './newGame'

const logger = require('logdown')('app:ecs/index.js')

//Initial State
let state = {
    events: {
        moveTo: "",
        actions: {}
    },
    world: {
        description: "",
        exitNames: [],
        availableActions: [],
        inventory: []
    },
    persist: {}
};

//private variables
let systems;
let ecs = new EntityComponentSystem();
let ecsPool =  new EntityPool();


class World {
    static managers = {};
    static Entity = new _Entity(ecsPool, World);
    static IO = new _IO(state, World);
    /**
     * Initialize world with either passed or standard parameters
     * @param {object} config
     * @param {function} config.callback
     * @param {[System]} config.systems 
     * @param {[Entity]} config.entities 
     * @param {[Manager]} config.managers
     */
    static init(_managers = Managers, _systems = Systems){
        //Load 
        //systems = load(ecs, ecsPool, World.managers);
        /*
        systems = forEach(sys => ecs.add(sys), _systems);
        forEachObjIndexed((comp, compName) => ecsPool.registerComponent(compName.toLowerCase(), comp), components);
        forEachObjIndexed((manager, key) => {
            World.managers[key] = new manager(ecs);
        }, _managers)*/
    }

    static async startNewGame(entities = Entities) {
        //Give defaults to load
        const loaded = World.managers.DataManager.load({
            persist: {visited: {}}
        })
        await newGame(World, loaded, state);
    }

    /**
     * Represents UI state (ex: description, roomName, exitNames)
     *
     * @readonly
     * @static
     * @memberof IO
     */
    static get get() {
        return Object.assign({}, World.IO.getState().world);
    } 

    /**
     * Runs the update method of all the systems.
     *
     * @memberof World
     * @param {number} dt The time since last update
     */
    
    static update = (dt) => {
        //if(i == 0) logger.trace("Update", dt)
        ecs.run(ecsPool, dt);
        //clean events
        World.IO.resetEvents();
    }
}

export default World

