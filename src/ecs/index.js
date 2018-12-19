import nano from 'nano-ecs'
import { entities as Entities} from './util/dataToLoad'
import { systems as Systems} from './util/dataToLoad'

const state = {};
let systems;
/** @type CES */
let ces;
class World {
    static instance;

    /**
     * Provides easy access of ecs
     * @param {function} _systems 
     * @param {[Entity]} entities 
     */
    constructor(_systems, entities = []){
        if(World.instance){
            return World.instance;
        }
        ces = nano();

        World.instance = this;
        systems = _systems.forEach(sys => new sys(ces));
        entities.forEach(e => e(this));
    }


    static getState() {
        return Object.assign({}, state);
    }

    /**
     * Runs the update method of all the systems.
     *
     * @memberof World
     * @param {number} dt The time since last update
     */
    static update = (dt) => {
        systems.forEach(sys => sys.update(dt, state));
    }
}

export default World

export const loadWorld = (systems = Systems, entities = Entities) => 
                            new World(systems, entities);
