import nano from 'nano-ecs'
import { entities as Entities} from './dataToLoad'
import { systems as Systems} from './dataToLoad'

const state = {};
let systems;
let ces;
class World {
    static instance;
    constructor(_systems, entities = []){
        if(World.instance){
            return World.instance;
        }
        ces = nano();

        World.instance = this;
        systems = _systems;
        entities.forEach(e => e(this.ces));
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
                            new World(systems, entities)