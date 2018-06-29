import chai from 'chai'
import { Flipbook, formatPage } from '../src/Displays/Flipbook'
import 'babel-polyfill'

let assert = chai.assert;

describe('Test Flipbook Display', function() {
    describe('constructor', function () {
    });
    describe('start method', function() {
        it('should return the first page', function() {
            let des = new Flipbook(["This is a page"]);
            assert.equal(des.start(), "This is a page");
        });
        it('should return undefined if first page has skip specified', function() {
            let des = new Flipbook(["This is a page", 1]);
            assert.isUndefined(des.start());
        });
        it('should wait ticks if first page has skip specified', function() {
            let des = new Flipbook(["This is a page", 2]);
            des.start();
            assert.equal(des.start(), "This is a page");
        });

    });
    describe('update method', function() {
    });
    describe('stop method', function() {
    });
    describe('formatPage', function() {
        it('should return proper object from string', function() {
            let page = "This is a page";
            assert.deepEqual(formatPage(page), {desc: page, skip: 0});
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
            assert.deepEqual(formatPage(page), {desc: "This is a page", skip: 10});
        });
        it('should throw error if given object and object does not have desc property.', function() {
            let page = {skip:1};
            let func = () => formatPage(page);
            assert.throws(func, "A page object must have an desc property.");
        });
        it('should throw error if given object has a skip property and it is not a postive number.', function() {
            let page = {desc: "This is a page", skip:"not a number"};
            let negPage = {desc: "This is a page", skip:-1};
            let func = () => formatPage(page);
            let funcneg = () => formatPage(negPage);
            assert.throws(func, "A page object's skip property must be a postive number.");
            assert.throws(funcneg, "A page object's skip property must be a postive number.");
        });
        it('should add skip property of 0 if object does not have skip property', function() {
            let page = {desc: "This is a page"};
            let func = () => formatPage(page);
            assert.equal(formatPage(page).skip, 0);
        });
        it('should return object from object', function() {
            let page = {desc: "This is a page", skip: 10};
            assert.deepEqual(formatPage(page), {desc: "This is a page", skip: 10});
        });
        it('should return an error if the given argument is not an object, array, or string.', function() {
            let page = 10;
            let func = () => formatPage(page);
            assert.throws(func, "A page should be an object, array, or string.");
        });
    });
});

