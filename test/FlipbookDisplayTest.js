import chai from 'chai'
import { Flipbook } from '../src/Displays/Flipbook'
import 'babel-polyfill'

let assert = chai.assert;

describe('Test Flipbook Display', function() {
    describe('constructor', function () {
        it('should throw error if times argument is not an object', function() {
            let func = () => new Time(1);
            assert.throws(func, 'times must be an object.');
        });
        it('should throw error if standard argument is not a string', function() {
            let func = () => new Time({}, 2);
            assert.throws(func, 'standard must be a string.');
        });
        it('should throw error if initDesc argument is passed and is not a string', function() {
            let func = () => new Time({}, "", 3);
            assert.throws(func, 'initDesc must be a string.');
        });
    });
    describe('start method', function() {
        it('should return initial description if it is specified', function() {
            let dis = new Time({}, "standard desc", "initial desc");
            assert.equal(dis.start(), "initial desc");
        });

        it('should return update based description if initial description is not specified', function() {
            let dis = new Time({morn: "This is a morning description"}, "standard desc");
            assert.equal(dis.start({timeOfDay: "morn"}), "This is a morning description");
        });
    });

    describe('update method', function() {
        it('should return time-based description if that time\'s description is specified', function() {
            let dis = new Time({morn: "This is a morning description"}, "standard desc");
            assert.equal(dis.update({timeOfDay: "morn"}), "This is a morning description");
        });

        it('should return the standard description if the time\'s description is not specified', function() {
            let dis = new Time({morn: "This is a morning description"}, "standard desc");
            assert.equal(dis.update({timeOfDay: "noon"}), "standard desc");
        });

        it('should return the standard description if world argument is not passed', function() {
            let dis = new Time({morn: "This is a morning description"}, "standard desc");
            assert.equal(dis.update(), "standard desc");
        });
    });
});

