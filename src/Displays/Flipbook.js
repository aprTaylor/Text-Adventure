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
     * @param {(string|[string, Number]|{desc: string, skip: Number})[]} pages
        A page can either be just the description, an array of the description and number of
        ticks to skip from the last description, or an object with the description and tick skip.
     * @param {string} initDesc The initial description.
     * @memberof Flipbook
     */
    constructor(pages){
        //Give super constructor an initial description for start
        super(formatPage(pages[0]).desc);

        //this.tick = startTick;
        this.pages = pages;
        this.pageNum = 0;
        this.paused = false;
    }

    start(world){
        let initPage = formatPage(this.pages[0]);

        if(initPage.skip >= 1){
            return undefined;
        }

        return initPage//.desc;

        
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
    //["sdfsdfdf", or {desc: "sdfsdf", tickSkip: } or ["dsd", 10]]

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

export function formatPage(page){
    if(isA.string(page)){
        return {desc: page, skip: 0};
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
        
        return {desc: page[0], skip: page[1]}; 
    }
    if(isA.object(page)){
        if(!page.hasOwnProperty('desc'))
            throw Error("A page object must have an desc property.");
        if(!page.hasOwnProperty('skip'))
            page.skip = 0;
        else if(!isA.number(page.skip))
            throw Error(page.skip + " is not a number. A page object's skip property must be a postive number.");
        else if(page.skip < 0)
            throw Error(page.skip + " too low. A page object's skip property must be a postive number.");
        return page; 
    }

    throw Error(page + " is not a valid type. A page should be an object, array, or string.")
}