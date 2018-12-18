/**** TYPE DEFS ***************************************************************************/

/**
 * @global
 * @typedef {object} Component
 * @property {string} name
 */

/**
 * @global
 * @typedef {object} Entity
 * @property {function()} remove Remove the entity from the world.
 * @property {function(Component)} addComponent Add a component to an entity, by constructor function name.
 * @property {function(Component)} removeComponent Remove a component from the entity, by constructor function name.
 * @property {function(Component):boolean} hasComponent Returns true if the entity has the component (by constructor function name), false otherwise.
 * @property {function([Component]):boolean} hasAllComponents Returns true if the entity has all of the components (by constructor function name), false otherwise.
 * @property {function(string):boolean} hasTag Returns true if the entity has the given tag, false otherwise.
 * @property {function(string)} addTag Adds the given tag to the entity.
 * @property {function(string)} removeTag Remove the given tag from the entity.
 */
 
 /**
  * @global
  * @typedef {object} CES
  * @property {function()} createEntity Create a new, component-less entity.
  * @property {function()} removeAllEntities Remove all entities from the world.
  * @property {function(Entity)} removeEntity Remove a specific entity by reference.
  * @property {function(string)} removeEntitiesByTag Remove all entities with a given tag.
  * @property {function([Component]):[Entity]} queryComponents Returns a list of all entities with the full list of components given.
  * @property {function(string):[Entity]} queryTag Returns a list of all entities with the given tag.
  * @property {function():number} count Returns the total number of entities in the world.
  */
