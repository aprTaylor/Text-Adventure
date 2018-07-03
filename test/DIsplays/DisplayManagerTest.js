import chai from 'chai'
import { DisplayManager } from '../../src/Displays/DisplayManager.js'
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
    describe('constructor', function() {
        let dis = new TestDisplay("I am a standard description");
        let dm = new DisplayManager({test:{display: dis}}, "test");
        it('should derive displayMap from given displayName', function() {
            let initDisplayMap = dm.displayMap;
            
            assert.deepEqual(initDisplayMap, {display: dis});
        });
    });

    describe('start method', function() {
        let dis = new TestDisplay("I am a standard description");
        let dis2 = new TestDisplay("I am a secodairy description");
        let worldDis = () => {return{start: (world) => world.msg}}
        let dm = new DisplayManager({test:{display: dis}, test2:{display: dis2}}, "test");
        let worldDm = new DisplayManager({test:{display: worldDis()},test2:{display: worldDis()}}, "test");
        it('should return current display\'s description', function() {
            let start = dm.start();
                
            assert.equal(start, "I am a standard description");
        });
        
        it('should return display from passed displayName', function() {
            let start = dm.start(null, "test2");
            
            assert.equal(start, "I am a secodairy description");
        });   

        it('should pass world data to current display', function() {
            let start = worldDm.start({msg: "Message for standard description"});
            
            assert.equal(start, "Message for standard description");
        }); 
        it('should pass world data to secondairy display', function() {
            let start = worldDm.start({msg: "Message for secondairy description"});
            
            assert.equal(start, "Message for secondairy description");
        }); 
    });

    describe('shouldTransition method', function() {
        let dis = (msg) => {return{start: (msg) => "start" + msg, update: () => "update" + msg}};

        it('should return false when no to is specified', function() {
            let dm = new DisplayManager({test: {display: dis("1")}, 
            test2: {display: dis("2")} }, "test");

            let start = dm.shouldTransition();
                
            assert.equal(start, false);
        });
        it('should return false when there are no valid transactions', function() {
            let dmFalseTran = new DisplayManager({test: {display: dis("1"), 
            to: {name: "test2", condition: () => false}}, 
            test2: {display: dis("2")}}, "test");
        
            let start = dmFalseTran.shouldTransition();
                
            assert.equal(start, false);
        });
        it('should return a display name when there is a valid transaction and no prioity is specified', function() {
            let dmValidTran = new DisplayManager({test: {display: dis("1"), 
            to: {name: "test2", condition: () => true}}, 
            test2: {display: dis("2")}}, "test");
            let start = dmValidTran.shouldTransition();
                
            assert.equal(start, "test2");
        });
        it('should return the first display name when no valid transactions have priority', function() {
            let dmMultiVTran = new DisplayManager({test: {display: dis("1"), 
            to: [{name: "test2", condition: () => true}, {name: "test3", condition: () => true}]}, 
            test2: {display: dis("2")}, test3: {display: dis("3")}}, "test");
            let start = dmMultiVTran.shouldTransition();
                
            assert.equal(start, "test2");
        });
        it('should return the first display name when there are tied priority valid transactions', function() {
            let dmMultiVTran = new DisplayManager({test: {display: dis("1"), 
            to: [{name: "test2", condition: () => true, priority: 1}, {name: "test3", condition: () => true, priority: 1}]}, 
            test2: {display: dis("2")}, test3: {display: dis("3")}}, "test");
            let start = dmMultiVTran.shouldTransition();
                
            assert.equal(start, "test2");
        });
        it('should not return an invalid transaction', function() {
            let dmMultiVTran = new DisplayManager({test: {display: dis("1"), 
            to: [{name: "test2", condition: () => false, priority: 1}, {name: "test3", condition: () => true, priority: 2}]}, 
            test2: {display: dis("2")}, test3: {display: dis("3")}}, "test");
            let start = dmMultiVTran.shouldTransition();
                
            assert.equal(start, "test3");
        });
        
        
    });

    describe('update method', function() {
        let dis = (msg) => {return{start: () => "start" + msg, update: () => "update" + msg}};

        it('should return updated display when to is not specified', function() {
            let dm = new DisplayManager({test: {display: dis("1")}, 
            test2: {display: dis("2")} }, "test");
            let start = dm.update();
                    
            assert.equal(start, "update1");
        });

            
        it('should return updated display when to is specified but no transition takes place', function() {
            let dmFalseTran = new DisplayManager({test: {display: dis("1"), 
            to: {name: "test2", condition: () => false}}, 
            test2: {display: dis("2")}}, "test");
            let start = dmFalseTran.update();
                
            assert.equal(start, "update1");
        });   

        it('should return started display of transition when a transition takes place', function() {
            let dmValidTran = new DisplayManager({test: {display: dis("1"), 
            to: {name: "test2", condition: () => true}}, 
            test2: {display: dis("2")}}, "test");
            let start = dmValidTran.update();
                
            assert.equal(start, "start2");
        }); 
    });

    describe('stop method', function() {
        let dis = (msg) => {return{start: () => "start" + msg, update: () => "update" + msg, stop: () => "stop"}};

        it('should return stop in display', function() {
            let dm = new DisplayManager({test: {display: dis("1")}, 
            test2: {display: dis("2")} }, "test");
            let stop = dm.stop();
                    
            assert.equal(stop, "stop");
        });
    });
});