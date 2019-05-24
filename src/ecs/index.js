import { EntityComponentSystem, EntityPool} from 'entity-component-system'
import { forEach, forEachObjIndexed } from 'ramda'

import _Entity from './engine/Entity'
import _IO from './engine/IO'

import { systems as Systems, entities as Entities, managers as Managers, components} from './util/dataToLoad'
import { logger } from './util';
import System from './systems/System'
import Manager from './managers/Manager'
import './util/typeDef'
import newGame from './newGame'

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

        console.log("ECS", ecs)
    }

    static startNewGame(entities = Entities) {
        newGame();
    }

    /**
     * Runs the update method of all the systems.
     *
     * @memberof World
     * @param {number} dt The time since last update
     */
    static update = (dt) => {
        ecs.run(ecsPool, dt);
        //clean events
        state.events = {actions: {}};
    }
}

export default World

