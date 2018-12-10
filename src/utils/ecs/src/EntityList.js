
/**
 * The entity list is a doubly-linked-list which allows the
 * entities to be added and removed efficiently.
 */
class EntityList {
    constructor() {
        this._entities = {};
        this.length = 0;
    }

    /**
     * Add an entity into this list.
     * @param {Entity} entity
     */
    add(entity) {
        this.length += 1;
        this._entities[entity.id] = entity;
    }

    /**
     * Remove an entity from this list.
     * @param {Entity} entity
     */
    remove(entity) {
        this.length -= 1;
        delete this._entities[entity.id];
    }

    /**
     * Check if this list has the entity.
     * @param {Entity} entity
     * @return {Boolean}
     */
    has(entity) {
        return entity && this._entities[entity.id] !== undefined;
    }

    /**
     * Remove all the entities from this list.
     * @public
     */
    clear() {
        this._entities = {};
    }

    /**
     * Return an array holding all the entities in this list.
     * @return {Array}
     */
    toArray() {
        return Object.values(this._entities);
    }
}

export default EntityList