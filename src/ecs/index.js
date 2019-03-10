import { EntityComponentSystem, EntityPool} from 'entity-component-system'
import { map, forEach, forEachObjIndexed } from 'ramda'

import { systems as Systems, entities as Entities, managers as Managers, components} from './util/dataToLoad'
import { logger, bind_trailing_args } from './util';
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
    static Entity = new Entity(ecsPool);
    static IO = new IO(state);
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
        systems = forEach(sys => ecs.add(sys, _systems));
        forEachObjIndexed((comp, compName) => ecsPool.registerComponent(compName, comp), components);
        forEachObjIndexed((manager, key) => {
            World.managers[key] = new manager(World.managers, ecs);
        }, _managers)
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

//WORLD MODULES
class IO {
    /**
     * @param {String} action Name of action to take
     * @memberof IO
     */
    takeAction = (action) => {
        state.events.actions[action] = true;
    }

    /**
     * @param {String} event Name of event to trigger
     * @param {any=} data relevant event data
     * @memberof IO
     */
    triggerEvent = (event, data) => {
        state.events[event] = data;
    }

    getState() {
        return Object.assign({}, state);
    }
}


class Entity {
    constructor(ecsPool){
        this._ecsPool = ecsPool;
        this._lastCreatedEntity;
        this._lastCreatedEntityComponents;
    }
    create = () => {
        this._lastCreatedEntity = this._ecsPool.create(); 
        this._lastCreatedEntityComponents = [];
        return this;
    }

    /**
     * @param {object} component Component to add
     * @param {object=} props Optional table used to initialize component 
     * @param {String=} id Optional id of entity. Defaults to last created entity.
     * @memberof Entity
     */
    addComponent = (component, props, id) => {
        //props may be id argument
        const toId = (typeof props === "string")?props:(id || this._lastCreatedEntity);

        let comp = ecsPool.addComponent(toId, component.name);
        if(!id && typeof props !== String) 
            lastCreatedEntityComponents.push(component.name);
        if(typeof props === "object")
            forEachObjIndexed((key, value) => comp[key] = value, props);

        return this;
    }

    /**
     * @param {object} component Component to remove
     * @param {String} id
     * @memberof Entity
     */
    removeComponent = (component, id) => {
        this._ecsPool.removeComponent(id, component.name);
    }

    /**
     * Add searchable tag
     * @param {String} tagName
     * @param {String=} id Optional id of entity to add tag to. 
     * Default value is last entity created.
     * @memberof Entity
     */
    addTag = (tagName, id) => {
        //Id may be array of components
        //If id is specified get the component names of the entity
        const components = (Array.isArray(id))? id:
        (!id?lastCreatedEntityComponents:Object.keys(this._ecsPool.entities[id]));
        try{ this._ecsPool.registerSearch(tagName, components); }
        catch{/*ignore search already created error*/}
    }

    /**
     * Remove entity from game world
     * @param {String} id 
     * @memberof Entity
     */
    destroy = (id) => {
        this._ecsPool.destroy(id);
    }

    get = (id) => {
        return this._ecsPool.entities[id];
    }

    byTag = (tagName) => {
        return this._ecsPool.find(tagName);
    }
}


