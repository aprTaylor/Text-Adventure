import { forceArray } from '../util/mis'
import { isA } from '../util/isA'
/**
 * Handles state changes between diffrent displays.
 * 
 * @export
 * @class DisplayManager
 */
export class DisplayManager {
    /**
     * Creates an instance of DisplayManager.
     * @param {{displayName: {display: Display, to: {name: String, condition: Function, priority: Number}[]}}} 
        displayMaps When mulitiple transition conditions return true the one with the lowest priority number 
        will be picked
     * @param {string} initDisplay The start state
     * @param {{keyName: Object}=} flags Store the 'state' of the manager, will be passed to condition
     * @memberof DisplayManager
     */
    constructor(displayMaps, initDisplayName, flags){
        if(!isA.object(displayMaps))
            throw Error('DisplayManager error. Argument displayMaps must be an object.')

        this.displayMaps = displayMaps;
        this.flags = flags;
        this.displayMap = displayMaps[initDisplayName];
    }

    start(world, displayName) {
        if(displayName)
            this.displayMap = this.displayMaps[displayName];
        return this.displayMap.display.start(world);
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
        //Transition and start display if state should transition
        let trans = this.shouldTransition(world);
        
        if(trans !== undefined && trans !== false){
            return this.start(world, trans);
        }

        return this.displayMap.display.update(world);
    }

    shouldTransition(world) {
        
        //No transactions are specified
        if(!this.displayMap.hasOwnProperty('to'))
            return false;
            
        this.displayMap.to = forceArray(this.displayMap.to);
        
        let validTrans = this.displayMap.to.filter((trans) => {
            return trans.condition(this.flags, this.displayMap.display, world);
        });

        //If there are no valid transitions 
        if(validTrans.length == 0)
            return false;

        return validTrans.reduce((prev, trans) => {
            if(!prev.priority)
                prev.priority = 0;
            if(!trans.priority)
                trans.priority = 0;

            if(trans.priority !== 0 && (prev.priority > trans.priority || prev.priority === 0))
                return trans;
            
            return prev;
        }, validTrans[0]).name;
    }

    getActions(){
        return this.displayMap.display.getActions();
    }

    stop() {
        return this.displayMap.display.stop();
    }


}