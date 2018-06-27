import { Basic } from './Basic'
export class Flipbook extends Basic {
    constructor(startTick, pages, initDesc){
        //Give super constructor an initial description for start
        super(initDesc?initDesc:pages[0]);

        this.tick = startTick;
        this.pages = pages;
        this.pageNum = 0;
    }

    start(world){
        update(world);
    }
    
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