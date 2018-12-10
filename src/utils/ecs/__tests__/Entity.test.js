import CES from '../'
import chai from 'chai'

global.jestExpect = global.expect;
global.expect = chai.expect;

let CompA = CES.Component.extend({ name: 'a' }),
    CompB = CES.Component.extend({ name: 'b' }),
    CompC = CES.Component.extend({ name: 'c' });


describe('entity', function () {
    it('should have unique id', function () {
        var ea = new CES.Entity(),
            eb = new CES.Entity(),
            ec = new CES.Entity();
        
        
        expect(ea.id).not.to.equal(eb.id);
        expect(eb.id).not.to.equal(ec.id);
        expect(ea.id).not.to.equal(ec.id);
    });

    it('should return true when checking added components', function () {
        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        entity.addComponent(new CompB());
        entity.addComponent(new CompC());

        expect(entity.hasComponent('a')).to.be.true;
        expect(entity.hasComponent('b')).to.be.true;
        expect(entity.hasComponent('c')).to.be.true;
        expect(entity.hasComponent('d')).to.be.false;
    });

    it('should return false when checking removed components', function () {
        var entity = new CES.Entity();
        entity.addComponent(new CompA());
        entity.addComponent(new CompB());
        entity.addComponent(new CompC());

        entity.removeComponent('b');
        entity.removeComponent('c');
    
        expect(entity.hasComponent('a')).to.be.true;
        expect(entity.hasComponent('b')).to.be.false;
        expect(entity.hasComponent('c')).to.be.false;
    });

    it('should return the correct component', function () {
        var entity = new CES.Entity(),
            ca = new CompA(),
            cb = new CompB(),
            cc = new CompC();

        entity.addComponent(ca);
        entity.addComponent(cb);
        entity.addComponent(cc);
    
        expect(entity.getComponent('a')).to.equal(ca);
        expect(entity.getComponent('b')).to.equal(cb);
        expect(entity.getComponent('c')).to.equal(cc);
        expect(entity.getComponent('d')).to.not.exist;
    });

    it('should emit signals when adding components', function () {
        var entity = new CES.Entity(),
            collections = [];

        entity.onComponentAdded.add(function (entity, componentName) {
            collections.push([entity, componentName]);
        });

        entity.addComponent(new CompA());
        entity.addComponent(new CompB());

        expect(collections).to.deep.equal([[entity, 'a'], [entity, 'b']]);
    });

    it('should emit signals when removing components', function () {
        var entity = new CES.Entity(),
            collections = [];

        entity.onComponentRemoved.add(function (entity, componentName) {
            collections.push([entity, componentName]);
        });
        entity.onComponentRemoved.add(function (entity, componentName) {
            collections.push('removed');
        });

        entity.addComponent(new CompA());
        entity.addComponent(new CompB());
        entity.addComponent(new CompC());

        entity.removeComponent('a');
        entity.removeComponent('b');

        expect(collections).to.deep.eql([
            [entity, 'a'], 'removed', [entity, 'b'], 'removed'
        ]);
    });
});