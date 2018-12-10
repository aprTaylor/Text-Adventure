import CES from '../'
import chai from 'chai'
import Entity from '../src/Entity';

global.jestExpect = global.expect;
global.expect = chai.expect;

let CompA = CES.Component.extend({ name: 'a' }),
    CompB = CES.Component.extend({ name: 'b' }),
    CompC = CES.Component.extend({ name: 'c' });

describe('Assemblege', function () {
    it('should return an instanceable object', () => {
        let assemblege = CES.Assemblege();
        expect(() => {assemblege()}).to.throw();
        expect(() => {new assemblege()}).to.not.throw();
    })
    it('should return an object that is an instance of entity', () => {
        let assemblege = CES.Assemblege();
        expect(new assemblege()).to.be.an.instanceof(Entity);
    })
    it('should contain all passed components', () => {
        let assemblege = CES.Assemblege([new CompA(), new CompB(), new CompC()]);
        let entity = new assemblege();
        expect(entity.hasComponent('a')).to.be.true;
    })
    it('should have a name property if one is passed', () => {
        let assemblege = CES.Assemblege([], "assemblege");
        let assemblege2 = CES.Assemblege([]);
        let entity = new assemblege();
        let entity2 = new assemblege2()

        expect(entity2.name).to.be.undefined;
        expect(entity.name).to.equal("assemblege");
    });
    it('should have an id the same as an id generated from world', () => {
        let assemblege = CES.Assemblege([new CompA(), new CompB()]);
        let assemblege2 = CES.Assemblege([new CompA()]);
        let entity = new assemblege();
        let entity2 = new assemblege2()

        expect(entity.getId()).to.equal(CES.World._getFamilyId(['a', 'b']));
        expect(entity2.getId()).to.equal(CES.World._getFamilyId(['a']));
    });
});