import { forEachObjIndexed } from 'ramda'
import { logger } from '../util';

class Entity {
  constructor(ecsPool){
      this._ecsPool = ecsPool;
      this._lastCreatedEntity = null;
      this._lastCreatedEntityComponents = [];
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
      logger.info("Add component", component, props, id, "");

      //props may be id argument
      const toId = (typeof props === "string")?props:(id || this._lastCreatedEntity);

      let comp = this._ecsPool.addComponent(toId, component.name);
      if(!id && typeof props !== String) 
          this._lastCreatedEntityComponents.push(component.name);
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
      (!id?this._lastCreatedEntityComponents:Object.keys(this._ecsPool.entities[id]));
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

export default Entity