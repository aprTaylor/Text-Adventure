import Base from './Base';

/**
 * The components is the container of some properties that
 * the entity possesses. It may also contain some methods.
 */
class Component extends Base{
    /**
     * Name of this component. It is expected to be overriden and
     * should be unique.
     * @property {String} name
     */
    extend(extendsWith){
        if(extendsWith.name === undefined)
            throw Error("Component must have a name property");
        return super.extend(extendsWith);
    }
};

export default Component