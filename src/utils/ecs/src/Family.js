import Signal from './Signal'
import EntityList from './EntityList'
/**
 * The family is a collection of entities having all the specified components.
 */
class Family {
    /**
     * @param {Array} componentNames
     */
    constructor(componentNames) {
        this._componentNames = componentNames;
        /**
         * A linked list holding the entities;
         */
        this._entities = new EntityList();
        this.entityAdded = new Signal();
        this.entityRemoved = new Signal();
    }

    /**
     * Get the entities of this family.
     * @return {Array}
     */
    getEntities() {
        return this._entities.toArray();
    }

    /**
     * Add the entity into the family if match.
     * @param {Entity} entity
     */
    addEntityIfMatch(entity) {
        if (!this._entities.has(entity) && this._matchEntity(entity)) {
            this._entities.add(entity);
            this.entityAdded.emit(entity);
        }
    }

    /**
     * Remove the entity into the family if match.
     * @param {Entity} entity
     */
    removeEntity(entity) {
        if (this._entities.has(entity)) {
            this._entities.remove(entity);
            this.entityRemoved.emit(entity);
        }
    }

    /**
     * Handler to be called when a component is added to an entity.
     * @param {Entity} entity
     * @param {String} componentName
     */
    onComponentAdded(entity) {
        this.addEntityIfMatch(entity);
    }

    /**
     * Handler to be called when a component is removed from an entity.
     * @param {Entity} entity
     * @param {String} componentName
     */
    onComponentRemoved(entity, componentName, removedComponent) {
        let names, i, len;

        // return if the entity is not in this family
        if (!this._entities.has(entity)) {
            return;
        }

        // remove the node if the removed component is required by this family
        names = this._componentNames;
        for (i = 0, len = names.length; i < len; ++i) {
            if (names[i] === componentName) {
                this._entities.remove(entity);
                this.entityRemoved.emit(entity, removedComponent);
            }
        }
    }

    /**
     * Check if an entity belongs to this family.
     * @param {Entity} entity
     * @return {Boolean}
     */
    _matchEntity (entity) {
        let componentNames, i, len;
        componentNames = this._componentNames;

        for (i = 0, len = componentNames.length; i < len; ++i) {
            if (!entity.hasComponent(componentNames[i])) {
                return false;
            }
        }

        return true;
    }
}

export default Family