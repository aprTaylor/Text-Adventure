import { EntityComponentSystem, EntityPool} from 'entity-component-system'
import { forEach, forEachObjIndexed } from 'ramda'

import _Entity from './engine/Entity'
import _IO from './engine/IO'

import { systems as Systems, entities as Entities, managers as Managers, components} from './util/dataToLoad'
import System from './systems/System'
import Manager from './managers/Manager'
import './util/typeDef'
import newGame from './newGame'

let i = 0;

const logger = require('logdown')('app:ecs/index.js')

//Initial State
let state = {
    events: {
        moveTo: "",
        actions: {}
    },
    world: {
        description: "",
        exitNames: []
    }
};

//private variables
let systems;
let ecs = new EntityComponentSystem();
let ecsPool =  new EntityPool();


class World {
    static managers = {};
    static Entity = new _Entity(ecsPool);
    static IO = new _IO(state);
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
        systems = forEach(sys => ecs.add(sys), _systems);
        forEachObjIndexed((comp, compName) => ecsPool.registerComponent(compName.toLowerCase(), comp), components);
        forEachObjIndexed((manager, key) => {
            World.managers[key] = new manager(World.managers, ecs);
        }, _managers)
    }

    static async startNewGame(entities = Entities) {
        await newGame();
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
        state.events = {actions: {}};
        i++;
    }
}

export default World

