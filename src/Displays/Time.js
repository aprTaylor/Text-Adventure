import { Basic } from './Basic'
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
        //Give super constructor an initial description for start
        super(standard, initDesc?initDesc:standard);

        this.standard = standard;
        this.times = times;
    }

    start(world){
        if(!this.initDesc)
            return this.update(world);
        
        super.start();
    }
    
    update(world){
        let page = times[world.timeOfDay];

        if(!page)
            return super.update();

        return page
    }
}