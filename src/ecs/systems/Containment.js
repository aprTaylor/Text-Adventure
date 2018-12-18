import { Containable } from "../components";

class ContainmentSystem {
    /**
     * Get all entities that are contained in given entity
     * @param {CES} world 
     * @param {Entity} entity The container entity
     */
    fetchContainedEntities(world, entity) {
        const containables = world.queryComponents([Containable]);
        return containables.filter(child => child.containable.container === entity);
    }  
}

export default ContainmentSystem