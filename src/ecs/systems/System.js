import '../util/typeDef'
class System {
    /**
     * @param {Manager} managers
     * @param {CES} world 
     */
    constructor(managers, world){
        this.managers = managers;
        this.world = world;
    }

    update(dt, state) {
        return state;
    }

    isTriggered(dt, state) {
        return true;
    }

    //Common functions used across systems
    /**
     * Gets the room that the player is in
     * @return {Entity} Room Entity*/
    getCurrRoom(){
        return this.world.queryTag('player')[0].presence.room;
    }
}

export default System