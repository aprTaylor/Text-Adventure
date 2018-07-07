import { Basic } from './Basic'
import { isA } from '../util/isA'

export class Time extends Basic {
    /**
     * Creates an instance of a time based descriptor.
     * 
     * @param {Object} times Should be an object with TIMES enums as keys 
     * @param {string} standard This is the default description if a time of day is not specified
     * @param {string=} initDesc This description is shown once, if not specified normal time is used
     * @memberof Time
     */
    constructor(times, standard, initDesc){
        if(!isA.object(times))
            throw Error("times must be an object.");

        //Give super constructor an initial description for start
        super(standard, initDesc);

        this.standard = standard;
        this.times = times;
    }

    start(world){
        //If there is not an initial description
        //get normal time description
        if(!this.initDesc)
            return this.update(world);
        
        return super.start();
    }
    
    update(world){
        //Assume that by not passing the time 
        //standard description is being asked for
        if(!world)
            return this.standard;

        let page = this.times[world.timeOfDay];

        if(!page)
            return super.update();

        return page;
    }

    stop(){
        super.stop();
    }
}