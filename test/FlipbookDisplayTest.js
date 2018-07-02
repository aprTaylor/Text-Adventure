import chai from 'chai'
import itParam from 'mocha-param'
import { Flipbook, formatPage } from '../src/Displays/Flipbook'
import 'babel-polyfill'

let assert = chai.assert;

describe('Test Flipbook Display', function() {
    describe('constructor', function () {
    });
    describe('start method', function() {
        it('should return the first page', function() {
            let des = new Flipbook(["This is a page"]);
            assert.equal(des.start({tick: 0}), "This is a page");
        });
        it('should return undefined if first page has delay specified', function() {
            let des = new Flipbook([["This is a page", 1]]);
            assert.isUndefined(des.start({tick: 0}));
        });
        it('should wait ticks if first page has delay specified', function() {
            let des = new Flipbook([["This is a page", 2]]);
            assert.isUndefined(des.start({tick: 0}));
            assert.equal(des.update({tick: 2}), "This is a page");
        });

    });
    describe('update method', function() {
        it('should throw error if instance has not been started yet', function() {
            let des = new Flipbook([["This is a page", 2]]);
            let fn = () => des.update({tick: 1});
            assert.throws(fn, "Flipbook must be started before it is updated.");
        });
        it('should return undefined if initial scene has not started yet', function() {
            let des = new Flipbook([["This is a page", 2]]);
            des.start({tick: 0});
            assert.isUndefined(des.update({tick: 1}));
        });
        
        itParam('should return proper scene', 
        [[["target page", 0], ["This is a second page", 20]], 
        [["This is a first page", 0], ["target page", 10], ["This is a third page", 10]],
        [["This is a first page", 0], ["target page", 5], ["This is a third page", 15]],
        [["This is a first page", 5], ["This is a second page", 3], ["target page", 2]]], 
        function(value) {
            let des = new Flipbook(value);
            des.start({tick: 0});
            assert.equal(des.update({tick: 10}), "target page");
        });
        itParam('should return proper scene after multiple updates', 
        [[["This is a first page", 0], ["This is a second page", 10],  ["target page", 5]], 
        [["This is a first page", 0], ["This is a second page", 5], ["This is a third page", 10], ["target page", 5]],
        [["This is a a page", 0], ["target page", 20]]],  
        function(value) {
            let des = new Flipbook(value);
            des.start({tick: 0});
            des.update({tick: 15});
            assert.equal(des.update({tick: 20}), "target page");
        });
        it('should return last scene if delay is greater than last scene\'s delay', function() {
            let des = new Flipbook([["This is a page", 0], ["This is a second page", 10],  ["This is the last page", 10]]);
            des.start({tick: 0});
            assert.equal(des.update({tick: 30}), "This is the last page");
        });
        it('should return last scene if in previous update last scene had been reached', function() {
            let des = new Flipbook([["This is a page", 0], ["This is the last page", 10]]);
            des.start({tick: 0});
            des.update({tick: 10})
            assert.equal(des.update({tick: 20}), "This is the last page");
        });
        itParam('should set proper delay', 
        [{arr: [["target page", 0], ["This is a second page", 20]], expDelay: 10}, 
        {arr: [["target page", 5], ["target page", 5], ["This is a second page", 15]], expDelay: 0},
        {arr:[["This is a a page", 0], ["target page", 5], ["This is a third page", 15]], expDelay: 5}], 
        function(value) {
            let des = new Flipbook(value.arr);
            des.start({tick: 0});
            des.update({tick: 10});
            assert.equal(des.delay, value.expDelay);
        });
    });
    describe('stop method', function() {
    });
    describe('formatPage', function() {
        it('should return proper object from string', function() {
            let page = "This is a page";
            assert.deepEqual(formatPage(page), {desc: page, delay: 0});
        });
        it('should throw error if given array and array length is not 2', function() {
            let page = ["This is a page"];
            let func = () => formatPage(page);
            assert.throws(func, "A page array must have exactly 2 items.");
        });
        it('should throw error if given array and first item in array is not string', function() {
            let page = [1, 2];
            let func = () => formatPage(page);
            assert.throws(func, "is not a string. First item in page array must be a string.");
        });
        it('should throw error if given array and second item in array is not a postive number', function() {
            let page = ["This is a page", "not a number"];
            let negPage = ["This is a page", -2];
            let func = () => formatPage(page);
            let funcneg = () => formatPage(negPage);
            assert.throws(func, "Second item in page array must be a postive number.");
            assert.throws(funcneg, "Second item in page array must be a postive number.");
        });
        it('should return proper object from array', function() {
            let page = ["This is a page", 10];
            assert.deepEqual(formatPage(page), {desc: "This is a page", delay: 10});
        });
        it('should throw error if given object and object does not have desc property.', function() {
            let page = {delay:1};
            let func = () => formatPage(page);
            assert.throws(func, "A page object must have an desc property.");
        });
        it('should throw error if given object has a delay property and it is not a postive number.', function() {
            let page = {desc: "This is a page", delay:"not a number"};
            let negPage = {desc: "This is a page", delay:-1};
            let func = () => formatPage(page);
            let funcneg = () => formatPage(negPage);
            assert.throws(func, "A page object's delay property must be a postive number.");
            assert.throws(funcneg, "A page object's delay property must be a postive number.");
        });
        it('should add delay property of 0 if object does not have delay property', function() {
            let page = {desc: "This is a page"};
            let func = () => formatPage(page);
            assert.equal(formatPage(page).delay, 0);
        });
        it('should return object from object', function() {
            let page = {desc: "This is a page", delay: 10};
            assert.deepEqual(formatPage(page), {desc: "This is a page", delay: 10});
        });
        it('should return an error if the given argument is not an object, array, or string.', function() {
            let page = 10;
            let func = () => formatPage(page);
            assert.throws(func, "A page should be an object, array, or string.");
        });
    });
});

