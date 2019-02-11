import World from '../'
import chai from 'chai'
global.jestExpect = global.expect;
global.expect = chai.expect;

describe("World", () => {
    afterEach(() => {
        World.instance = undefined;
    });

    it("is a Singleton", () => {
        expect(World.instance).to.be.undefined;
        new World([], []);
        expect(World.instance).to.not.be.undefined;
        expect(World.instance).to.equal(new World([], []));
    });

    it("update should call update on all systems", () => {
        const mockA = jest.fn();
        const mockB = jest.fn();
        let sys = [{update: mockA},{update: mockB}]
        new World(sys,[]);
        World.update();
        jestExpect(mockA).toHaveBeenCalled();
        jestExpect(mockB).toHaveBeenCalled();
    })
})