import { Basic } from './Basic'

/**
 * Flipbooks Displays are meant to play out simular to how a scene would.
 * Each 'tick' represents a moment in the scene (could be a person walking closer or a ship sailing)
 * The scence does not 'pause' automatically if the player is not near it, 
 * once started it will tick until its completion. However, stop can be used to force a pause.
 * 
 * @export
 * @class Flipbook
 * @extends {Basic}
 */
export class Flipbook extends Basic {
    /**
     * Creates an instance of Flipbook.
     * @param {any} startTick 
     * @param {any} pages 
     * @param {any} initDesc 
     * @memberof Flipbook
     */
    constructor(startTick, pages, initDesc){
        //Give super constructor an initial description for start
        super(initDesc?initDesc:pages[0]);

        this.tick = startTick;
        this.pages = pages;
        this.pageNum = 0;
        this.paused = false;
    }

    start(world){
        if(this.paused){
            this.tick = world
        }
        update(world);
    }
    // 1, 1
    // 5
    // 

    update(world){
        skip = world.tick - this.tick;
        if(this.pageNum + skip > this.pages.length)
            this.stop();
        else{
            this.tick += skip;
            this.pageNum += skip;
            return pages[pageNum]; 
        }
    }
}