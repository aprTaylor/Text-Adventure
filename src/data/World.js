import CES from 'ces'

class World {
    constructor(){
        this.ces = CES.World();
        this.state = {};
    }

    update = () => {
        World.update();
    }
}

export default World