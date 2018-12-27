import nano from 'nano-ecs'
import { systems as Systems, entities as Entities} from './util/dataToLoad'
import { logger } from './util';
import SceneManager from './managers/SceneManger';

//Initial State
let state = {
    events: {
        moveTo: "Home",
        actions: {look: true}
    },
    world: {
        description: "",
        exitNames: []
    }
};
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
        systems = _systems.map(sys => new sys(ces));
        entities.forEach(e => e(ces));

        this.sceneManger = new SceneManager(ces).loadScene('Scene1');
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
        systems.forEach(sys => state = sys.update(dt, state));
        //clean events
        state.events = {actions: {}};
    }

    static takeAction = (action, ...data) => {
        state.events.actions[action] = data;
    }

    static triggerEvent = (event, ...data) => {
        state.events[event] = data;
    }
}

export default World

export const loadWorld = (systems = Systems, entities = Entities) => 
                            new World(systems, entities);
