import { Basic } from './Basic'
import { isA } from '../util/TypeProof'
import { ACTIONS } from '../GameObjects'

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
     * @param {Number} startTick 
     * @param {(string|[string, Number]|{desc: string, delay: Number})[]} pages
        A page can either be just the description, an array of the description and number of
        ticks to delay from the last description, or an object with the description and tick delay.
     * @param {string} initDesc The initial description.
     * @memberof Flipbook
     */
    constructor(pages){
        //Make a formatted copy of pages
        let formattedpages = pages.map(page => {
            return formatPage(page);
        });

        //Give super constructor an initial description for start
        super(formattedpages[0].desc);

        this.pages = formattedpages;
        this.done = false;
        
        //this.paused = false;
    }

    start(world){
        //Get initial tick number
        this.tick = world.tick;

        //Get first page
        let initPage = this.pages[0];

        //Set up page number and delay system
        this.pageNum = -1;
        this.delay = 0;

        //Option for delayed scene start
        if(initPage.delay >= 1){
            return undefined;
        }

        //Start scene is not delayed
        this.pageNum = 0;
        return initPage.desc;

    }

    update(world){
        if(this.pageNum === undefined || this.pageNum === null)
            throw Error("Flipbook must be started before it is updated.");

        //Reached last page
        if(this.pageNum >= this.pages.length-1){
            this.done = true;
        }

        //If the last page has been reached earlier return it
        if(this.done && this.pageNum !== -1) return this.pages[this.pages.length-1].desc;


        //How many turns has it been since we last updated?
        let skip = world.tick - this.tick;

        //Do not update if time has not passed
        if(skip !== 0)
            do{
                let nextDelay = this.pages[this.pageNum+1].delay;
                //Set delay for next update
                if(this.delay === 0 && skip < nextDelay){
                    this.delay = skip; 
                    skip = 0;
                }
                //Skip page with no delay
                else if(this.delay === 0 && skip >= nextDelay){
                    skip -= nextDelay;
                    this.pageNum++;
                }
                //add delay to our skip;
                else{
                    skip += this.delay;
                    this.delay = 0;
                }
                
                //console.log("pagen", this.pageNum, "skip", skip, "delay", this.delay, "nextDelay", nextDelay)
            }
            while(this.pageNum < this.pages.length-1 && skip > 0)
        
        //Has not started yet
        if(this.pageNum < 0)
            return undefined;

        //Update current tick
        this.tick = world.tick;
        //this.delay = delay;
        return this.pages[this.pageNum].desc;
    }

    getActions() {
            return ACTIONS.NEXT;
    }

    stop(){
        super.stop();
    }
}

export function formatPage(page){
    if(isA.string(page)){
        return {desc: page, delay: 0};
    }
    if(isA.array(page)){
        if(page.length !== 2)
            throw Error("A page array must have exactly 2 items.");
        if(!isA.string(page[0]))
            throw Error(page[0] + " is not a string. First item in page array must be a string.");
        if(!isA.number(page[1]))    
            throw Error(page[1] + " is not a number. Second item in page array must be a postive number.");
        if(page[1] < 0)
            throw Error(page[1] + " too low. Second item in page array must be a postive number.");
        
        return {desc: page[0], delay: page[1]}; 
    }
    if(isA.object(page)){
        if(!page.hasOwnProperty('desc'))
            throw Error("A page object must have an desc property.");
        if(!page.hasOwnProperty('delay'))
            page.delay = 0;
        else if(!isA.number(page.delay))
            throw Error(page.delay + " is not a number. A page object's delay property must be a postive number.");
        else if(page.delay < 0)
            throw Error(page.delay + " too low. A page object's delay property must be a postive number.");
        return page; 
    }

    throw Error(page + " is not a valid type. A page should be an object, array, or string.")
}