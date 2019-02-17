import { EntityComponentSystem, EntityPool} from 'entity-component-system'
import { map, forEach, forEachObjIndexed } from 'ramda'

import { systems as Systems, entities as Entities, managers as Managers, components} from './util/dataToLoad'
import { logger, validate } from './util';
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
let ecs;
let ecsPool;

//entity creation
let lastCreatedEntity;
let lastCreatedEntityComponents;


class World {
    static managers = {};
    /**
     * Initialize world with either passed or standard parameters
     * @param {object} config
     * @param {function} config.callback
     * @param {[System]} config.systems 
     * @param {[Entity]} config.entities 
     * @param {[Manager]} config.managers
     */
    static init(_managers = Managers, _systems = Systems){

        //init
        ecs = new EntityComponentSystem();
        ecsPool =  new EntityPool();

        //Load 
        systems = forEach(sys => ecs.add(sys, _systems));
        forEachObjIndexed((comp, compName) => ecsPool.registerComponent(compName, comp), components);
        forEachObjIndexed((manager, key) => {
            World.managers[key] = new manager(World.managers, ecs);
        }, _managers)
    }

    static startNewGame(entities = Entities) {
        newGame();
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
        ecs.run(ecsPool, dt);
        //clean events
        state.events = {actions: {}};
    }

    static takeAction = (action) => {
        state.events.actions[action] = true;
    }

    static triggerEvent = (event, data) => {
        state.events[event] = data;
    }

    //Easy Entity Creation
    static createEntity = () => {
        lastCreatedEntity = ecsPool.create(); 
        lastCreatedEntityComponents = [];
        return this;
    }

    /** To last created component */
    static addComponent = (component, ...props) => {
        let comp = ecsPool.addComponent(lastCreatedEntity, component.name);
        lastCreatedEntityComponents.push(component.name);
        return this;
    }
    
    /** To last created component */
    static addTag = (tagName) => {
        try{ ecsPool.registerSearch(tagName, lastCreatedEntityComponents); }
        catch{/*ignore search already created error*/}
    }
}

export default World

