import { Basic } from './Basic'
import { isA } from '../util/isA'

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

        //this.tick = startTick;
        
        //this.pageNum = 0;
        //this.paused = false;
    }

    start(world){
        //Get initial tick number
        this.tick = world.tick;

        //Get first page
        let initPage = this.pages[0];

        //Set up page number and delay system
        this.pageNum = -1;
        this.delay = initPage.delay;

        //Option for delayed scene start
        if(this.delay >= 1){
            return undefined;
        }

        //Start scene is not delayed
        this.pageNum = 0;
        return initPage.desc;

        
        //this.tick = world.tick;
        if(this.paused){
            this.tick = world;
        }
        //update(world);
    }
    // 9 => 0
    // 13 => 4
    // 15 => pause it (6)
    // 40 => start (7)
    //41 => 8

    //0 => 10 => 11
    //["sdfsdfdf", or {desc: "sdfsdf", tickdelay: } or ["dsd", 10]]
//2, 10, 11
//20
// 2, 20
//12, 20
//23, 20

//20, 20

    update(world){
        if(this.pageNum === undefined || this.pageNum === null)
            throw Error("Flipbook must be started before it is updated.");

        //How many turns has it been since we last updated?
        let delay = world.tick - this.tick;
        let page = this.pageNum;

        //If we have not meet the delay quota yet, display current scene
        if(this.delay > delay){
            if(this.pageNum < 0)
                return undefined;
        }
        //delay quota has been reached, delay to proper page 
        //(in the case multiple pages are delayed)
        else{

            let delayCnt = delay-(this.pageNum>=0?this.pages[this.pageNum].delay:0);
            for(let i = this.pageNum; i < this.pages.length; i++){
                /*
                if(delayCnt <= 0){
                    //return this.pageNum + " " + delayAcc + " " + delay;
                    //this.delay = delayAcc;
                    break;
                }
                page = this.pageNum++;
                delayCnt/*Acc*/ /*+*///-= this.pages[this.pageNum].delay;
                
                
            }
        }

        //delay, pg 1) 0 pg 2) 10, 5 < 10, stop on page one, delay is 5
        // delay pg 1) 0 pg) 10, pg 3) 20 20 > 10, stop on page 2, delay is 10
        //delay pg 1) 0 pg) 10, 10 == 10 , stop on page 2, delay is 0

        //delay (count down )
        //delay - page.delay
        //0<= delay met (next page), not met same page
        this.delay -= delay;

        return this.pages[this.pageNum].desc;
            

        //if(this.pageNum + delay > this.pages.length)
          //  this.stop();
        //else{
        //    this.tick += delay;
         //   this.pageNum += delay;
         //   return pages[pageNum]; 
        //}
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