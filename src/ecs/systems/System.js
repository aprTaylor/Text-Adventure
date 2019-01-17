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
}

export default System