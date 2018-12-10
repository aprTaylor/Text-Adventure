//Modified from qiaos/ces
//MIT License
//Copyright 2013 Xueqiao Xu <xueqiaoxu@gmail.com>

import Family from './Family';
import EntityList from './EntityList';

/**
 * The world is the container of all the entities and systems.
 */
class World {
    constructor(){
        this._families = {};
        this._systems = [];
        this._entities = new EntityList();
    }

    /**
     * Add a system to this world.
     * @param {System} system
     */
    addSystem(system) {
        this._systems.push(system);
        system.addedToWorld(this);
        return this;
    }

    /**
     * Remove a system from this world.
     * @param {System} system
     */
    removeSystem(system) {
        let systems, i, len;

        systems = this._systems;
        for (i = 0, len = systems.length; i < len; ++i) {
            if (systems[i] === system) {
                systems.splice(i, 1);
                system.removedFromWorld();
            }
        }
    }

    /**
     * Add an entity to this world.
     * @param {Entity} entity
     */
    addEntity(entity) {
        var families, familyId, self;
        // try to add the entity into each family
        families = this._families;
        for (familyId in families) {
            families[familyId].addEntityIfMatch(entity);
        }
        // update the entity-family relationship whenever components are
        // added to or removed from the entities
        entity.onComponentAdded.add((entity, componentName, component) => {
            this._onComponentAdded(entity, componentName, component);
        });
        entity.onComponentRemoved.add((entity, componentName, component) => {
            this._onComponentRemoved(entity, componentName, component);
        });
        
        this._entities.add(entity);
    }

    /**
     * Remove and entity from this world.
     * @param {Entity} entity
     */
    removeEntity(entity) {
        var families, familyId;

        // try to remove the entity from each family
        families = this._families;
        for (familyId in families) {
            families[familyId].removeEntity(entity);
        }

        this._entities.remove(entity);
    }

    /**
     * Get the entities having all the specified componets.
     * @param {...String} componentNames
     * @return {Array} an array of entities.
     */
    getEntities(...componentNames) {
        let familyId, families;

        familyId = World._getFamilyId(componentNames);
        this._ensureFamilyExists(componentNames);
        return this._families[familyId].getEntities();
    }

    /**
     * For each system in the world, call its `update` method.
     * @param {Number} dt time interval between updates.
     */
    update(dt) {
        let systems, i, len;

        systems = this._systems;
        for (i = 0, len = systems.length; i < len; ++i) {
            systems[i].update(dt);
        }
    }

    /**
     * Returns the signal for entities added with the specified components. The
     * signal is also emitted when a component is added to an entity causing it
     * match the specified component names.
     * @param {...String} componentNames
     * @return {Signal} A signal which is emitted every time an entity with
     *     specified components is added.
     */
    entityAdded(...componentNames) {
        var familyId, families;

        familyId = World._getFamilyId(componentNames);
        this._ensureFamilyExists(componentNames);
        return this._families[familyId].entityAdded;
    }

    /**
     * Returns the signal for entities removed with the specified components.
     * The signal is also emitted when a component is removed from an entity
     * causing it to no longer match the specified component names.
     * @param {...String} componentNames
     * @return {Signal} A signal which is emitted every time an entity with
     *     specified components is removed.
     */
    entityRemoved(...componentNames) {
        var familyId, families;

        familyId = World._getFamilyId(componentNames);
        this._ensureFamilyExists(componentNames);

        return this._families[familyId].entityRemoved;
    }

    /**
     * Creates a family for the passed array of component names if it does not
     * exist already.
     * @param {Array.<String>} components
     */
    _ensureFamilyExists(components) {
        var families = this._families;
        var familyId = World._getFamilyId(components);
        if (!families[familyId]) {
            families[familyId] = new Family(components);
            let entities = this._entities.toArray()
            for (let entity of entities) {
                families[familyId].addEntityIfMatch(entity);
            }
        }
    }

    /**
     * Returns the family ID for the passed array of component names. A family
     * ID is a comma separated string of all component names with a '$'
     * prepended.
     * @param {Array.<String>} components
     * @return {String} The family ID for the passed array of components.
     */
    static _getFamilyId(components) {
        return '$' + components.join(",");
    }

    /**
     * Handler to be called when a component is added to an entity.
     * @param {Entity} entity
     * @param {String} componentName
     */
    _onComponentAdded(entity, componentName) {
        let families, familyId;

        families = this._families;
        for (familyId in families) {
            families[familyId].onComponentAdded(entity, componentName);
        }
    }

    /**
     * Handler to be called when component is removed from an entity.
     * @param {Entity} entity
     * @param {String} componentName
     */
    _onComponentRemoved(entity, componentName, component) {
        let families, familyId;

        families = this._families;
        for (familyId in families) {
            families[familyId].onComponentRemoved(entity, componentName, component);
        }
    }
}

export default World
