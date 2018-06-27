import chai from 'chai'
import { DisplayManager } from '../src/Displays/DisplayManager.js'
import 'babel-polyfill'

let assert = chai.assert;

class TestDisplay {
    constructor(desc){
        this.desc = desc;
    }
    start(){
        return this.desc;
    }
    update(){
        return this.desc;
    }
    stop(){
        //stop
    }
}

describe('Test DisplayManager', function() {
    let dm = new DisplayManager({test:{display: new TestDisplay("I am test")}}, "test");
    it('should start intial display', function() {
        let start = dm.display.start();
        
        assert.equal(dm.display, "I am test");
    });
  });