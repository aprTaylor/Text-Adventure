import nano from 'nano-ecs'
import { entities } from './dataToLoad'
import { systems } from './dataToLoad'

class World {
    constructor(){
        this.ces = nano();
        this.state = {};
        //init entities
        entities.forEach(e => e(this.ces));
    }

    update = () => {
        systems.forEach(sys => sys.update(this.ces, this.state));
    }
}

export default World