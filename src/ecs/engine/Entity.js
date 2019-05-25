import { forEachObjIndexed } from 'ramda'
import isA from 'typeproof/core/isA'
import { forceArray } from '../util';

const logger = require('logdown')('app:Entity.js')

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

      //props may be id argument
      const toId = (isA.number(props))?props:(id || this._lastCreatedEntity);

      let comp = this._ecsPool.addComponent(toId, component);
      if(!id && toId !== props)
          this._lastCreatedEntityComponents.push(component);
      if(isA.object(props))
          forEachObjIndexed((value, key) => comp[key] = value, props);

      return this;
  }

  setComponent = (component, id, val) => {
      this._ecsPool.setComponent(id, component, val)
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

      return this;
  }

  queryComponents = (components) => {
    components = forceArray(components);
    const tagName = getTagName(components);
    this.addTag(tagName, components);
    return this.byTag(tagName);
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

  getFirstFromTag = (tagName) => {
    return this.get(this.byTag(tagName)[0])
  }

  find = (tagName, propsMatch) => {
      return this.byTag(tagName).filter(found => {
          let gotten = this.get(found);
          return Object.keys(propsMatch).every(prop => {
              return gotten[prop] === propsMatch[prop];
          })
      })
  }

  byTag = (tagName) => {
      return this._ecsPool.find(tagName);
  }

  byTagGet = (tagName) => {
    return this._ecsPool.find(tagName).map(id => this.get(id));
  }
}

const getTagName = (components) => {
    components = forceArray(components);
    return components.join(",")
  }

export default Entity