import Extendable from './Base'
/**
 * The system is responsible for updating the entities.
 */
class System extends Extendable{
    constructor(extendsWith) {
        super(extendsWith)
        /**
         * This property will be set when the system is added to a world.
         */
        this.world = null;
    }

    addedToWorld(world) {
        this.world = world;
    }

    removedFromWorld() {
        this.world = null;
    }

    /**
     * Update the entities.
     * @param {Number} dt time interval between updates
     */
    update(dt) {
        throw new Error('Subclassed should override this method');
    }
}

export default System 