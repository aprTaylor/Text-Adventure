/**
 * Create a basic description system,
 * that displays an inital description once and a standard description the rest of the time
 * 
 * @export
 * @class Basic
 */
export class Basic {
    /**
     * Creates an instance of a basic descriptor. 
     * @param {string} Standard description that will be shown every time except the first.
     * @param {string=} Intitial description that will be shown once.
     * @memberof Basic
     */
    constructor(desc, initDesc){
        this.desc = desc;
        this.initDesc = initDesc? initDesc : desc;
    }

    start(){ 
        return this.initDesc;
    }

    update() {
        return this.desc;
    }

    stop() {
        this.kill();
    }
}