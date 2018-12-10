import CES from '../'
import chai from 'chai'

global.jestExpect = global.expect;
global.expect = chai.expect;

let CompA = CES.Component.extend({ name: 'a' }),
    CompB = CES.Component.extend({ name: 'b' }),
    CompC = CES.Component.extend({ name: 'c' });

function createEntityA() {
    var entity = new CES.Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    entity.addComponent(new CompC());
    return entity;
}

function createEntityB() {
    var entity = new CES.Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompB());
    return entity;
}

function createEntityC() {
    var entity = new CES.Entity();
    entity.addComponent(new CompA());
    entity.addComponent(new CompC());
    return entity;
}

describe('world', function () {
    it('should get correct entities for each family', function () {
        var world = new CES.World(),
            e, i;

        for (i = 0; i < 100; ++i) {
            e = createEntityA();
            world.addEntity(e);
        }
        for (i = 0; i < 100; ++i) {
            e = createEntityB();
            world.addEntity(e);
        }
        for (i = 0; i < 100; ++i) {
            e = createEntityC();
            world.addEntity(e);
        }

        expect(world.getEntities('a').length).to.equal(300);
        expect(world.getEntities('b').length).to.equal(200);
        expect(world.getEntities('c').length).to.equal(200);
        expect(world.getEntities('a', 'b', 'c').length).to.equal(100);
        expect(world.getEntities('a', 'b').length).to.equal(200);
        expect(world.getEntities('a', 'c').length).to.equal(200);
        expect(world.getEntities('a', 'b', 'c', 'd').length).to.equal(0);
    });

    it('should update entity-family relationship when adding components', function () {
        var world = new CES.World(),
            e, i;

        for (i = 0; i < 100; ++i) {
            e = createEntityB();
            world.addEntity(e);
        }
        expect(world.getEntities('a', 'b').length).to.equal(100);
        expect(world.getEntities('a', 'b', 'c').length).to.equal(0);
        e.addComponent(new CompC());
        expect(world.getEntities('a', 'b', 'c').length).to.equal(1);
    });

    it('should update entity-family relationship when removing components', function () {
        var world = new CES.World(),
            e, i;

        for (i = 0; i < 100; ++i) {
            e = createEntityA();
            world.addEntity(e);
        }
        expect(world.getEntities('a', 'b', 'c').length).to.equal(100);
        expect(world.getEntities('a', 'b').length).to.equal(100);

        e.removeComponent('c');

        expect(world.getEntities('a', 'b', 'c').length).to.equal(99);
        expect(world.getEntities('a', 'b').length).to.equal(100);
    });

    it('should emit signal when entity with one component is added', function() {
        var world = new CES.World();

        var aListener = jest.fn();
        var bListener = jest.fn();
        world.entityAdded('a').add(aListener);
        world.entityAdded('b').add(bListener);

        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        world.addEntity(entity);

        expect(aListener.mock.calls.length).to.equal(1);
        expect(bListener.mock.calls.length).to.equal(0);
    });

    it('should emit signal when entity with two components is added', function() {
        var world = new CES.World();

        var aListener = jest.fn();
        var abListener = jest.fn();
        var cListener = jest.fn();

        world.entityAdded('a').add(aListener);
        world.entityAdded('a', 'b').add(abListener);
        world.entityAdded('c').add(abListener);

        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        entity.addComponent(new CompB());
        world.addEntity(entity);

        expect(aListener.mock.calls.length).to.equal(1);
        expect(abListener.mock.calls.length).to.equal(1);
        expect(cListener.mock.calls.length).to.equal(0);
    });

    it('should emit signal when entity is removed', function() {
        var world = new CES.World();

        var aListener = jest.fn();
        var bListener = jest.fn();
        world.entityRemoved('a').add(aListener);
        world.entityRemoved('b').add(bListener);

        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        world.addEntity(entity);

        expect(aListener.mock.calls.length).to.equal(0);
        expect(bListener.mock.calls.length).to.equal(0);

        world.removeEntity(entity);

        expect(aListener.mock.calls.length).to.equal(1);
        expect(bListener.mock.calls.length).to.equal(0);
    });

    it('should emit signal when entity has component added', function() {
        var world = new CES.World();

        var abListener = jest.fn();
        var bListener = jest.fn();
        world.entityAdded('a', 'b').add(abListener);

        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        world.addEntity(entity);

        expect(abListener.mock.calls.length).to.equal(0);

        entity.addComponent(new CompB());

        expect(abListener.mock.calls.length).to.equal(1);
    });

    it('should emit signal when entity has component removed', function() {
        var world = new CES.World();

        var abListener = jest.fn();
        var bListener = jest.fn();
        world.entityRemoved('a', 'b').add(abListener);

        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        entity.addComponent(new CompB());
        world.addEntity(entity);

        expect(abListener.mock.calls.length).to.equal(0);

        entity.removeComponent('b');

        expect(abListener.mock.calls.length).to.equal(1);
    });

    describe('with system', function() {
        it('addToWorld should be called when system is added', function() {
            var world = new CES.World();
            var system = new CES.System();
            var addedToWorld = jest.spyOn(system, 'addedToWorld');

            world.addSystem(system);

            jestExpect(addedToWorld).toHaveBeenCalled();
        });

        it('addToWorld should be called when system is removed', function() {
            var world = new CES.World();
            var system = new CES.System();
            var removedFromWorld = jest.spyOn(system, 'removedFromWorld');

            world.addSystem(system);

            jestExpect(removedFromWorld).not.toHaveBeenCalled();

            world.removeSystem(system);

            jestExpect(removedFromWorld).toHaveBeenCalled();
         });
    })

});