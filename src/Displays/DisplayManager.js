/**
 * Handles state changes between diffrent displays.
 * 
 * @export
 * @class DisplayManager
 */
export class DisplayManager {
    /**
     * Creates an instance of DisplayManager.
     * @param {{displayName: {display: Display, to: {name: String, condition: Function, priority: Number}}}[]} 
        displayMaps When mulitiple transition conditions return true the one with the lowest priority number 
        will be picked
     * @param initDisplay The start state
     * @param {{keyName: Object}=} flags Store the 'state' of the manager, will be passed to condition
     * @memberof DisplayManager
     */
    constructor(displayMaps, initDisplayName, flags){
        this.displayMaps = displayMaps;
        this.flags = flags;
        this.display = displayMaps[initDisplayName];
    }

    start(world, displayName) {
        if(displayName)
            this.display = this.displayMaps[displayName];
        return this.display.start(world);
    }

    /**
     * Each of the current display's transition's conditions will be tested.
     * The higest priority transition (lowest number) will be picked as the new display and returned.
     * If no transitions are picked the current display will be updated and returned.
     * 
     * @param {any} world 
     * @memberof DisplayManager
     */
    update(world) {
        let trans = shouldTransition(world);
        
        if(!trans)
            return this.display.update();
        
        this.display = this.displayMaps[trans.name];
        return this.display.start(world);
        
    }

    shouldTransition(world) {
        let validTrans = this.display.to.filter((trans) => {
            return trans.condition(this.flags, world);
        });
        return validTrans.reduce((prev, trans) => {
            if(prev.priority > trans.priority)
                return trans;
            
            return prev;
        }, validTrans[0]);
    }

    stop() {
        this.display.stop();
    }


}

// name
// display
// to: {name, funct}