import chai from 'chai'
import { Basic } from '../src/Displays/Basic'
import 'babel-polyfill'

let assert = chai.assert;

describe('Test Basic Display', function() {
    describe('start method', function() {
        it('should return initial description if it is specified', function() {
            let dis = new Basic("standard desc", "initial desc");
            assert.equal(dis.start(), "initial desc");
        });

        it('should return standard description if initial description is not specified', function() {
            let dis = new Basic("standard desc");
            assert.equal(dis.start(), "standard desc");
        });
    });

    describe('update method', function() {
        it('should return standard description', function() {
            let dis = new Basic("standard desc");
            let initDis = new Basic("standard desc", "initial desc");
            assert.equal(dis.update(), "standard desc");
            assert.notEqual(initDis.update(), "initial desc")
        });
    });
});

