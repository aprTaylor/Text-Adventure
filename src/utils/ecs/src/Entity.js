import Base from './Base'
import Signal from './Signal'

/**
 * The entity is the container of components.
 */
class Entity {
    constructor() {
        this.id = Entity._id++;
        /**
         * Map from component names to components.
         */
        this._components = {};
        this.onComponentAdded = new Signal();
        this.onComponentRemoved = new Signal();
    }

    /**
     * Check if this entity has a component by name.
     * @param {String} componentName
     * @return {Boolean}
     */
    hasComponent(componentName) {
        return this._components['$' + componentName] !== undefined;
    }

    /**
     * Get a component of this entity by name.
     * @param {String} componentName
     * @return {Component}
     */
    getComponent(componentName) {
        return this._components['$' + componentName];
    }

    /**
     * Add a component to this entity.
     * @param {Component} component
     */
    addComponent(component) {
        this._components['$' + component.name] = component;
        this.onComponentAdded.emit(this, component.name);
    }

    /**
     * Remove a component from this entity by name.
     * @param {String} componentName
     */
    removeComponent(componentName) {
        var removedComponent = this._components['$' + componentName];
        this._components['$' + componentName] = undefined;
        this.onComponentRemoved.emit(this, componentName, removedComponent);
    }
}


/**
 * @static
 */
Entity._id = 0;

export default Entity