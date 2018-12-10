import Entity from './Entity'
import Extendable from './Base'
import World from './World'
/**
 * Creates a templated entity
 * @param {[Component]} components component objects
 * @param {String=} name optional name for the assemblege
 */
const Assemblege = (components = [], name) => {
    let entity = new Entity();
    entity.addComponents(components);
    let assemblege = Extendable.extend({
        name: name,
        getId: () => {
            return World._getFamilyId(components.map(c => c.name));
        }
    }, true, entity, Object.getPrototypeOf(entity));
    return assemblege;
}

/*
 let assemblege = Extendable.extend({
        name: name,
        getId: () => {
            return World._getFamilyId(components.map(c => c.name));
        }
    }, entity, Object.getPrototypeOf(entity));
*/

export default Assemblege;