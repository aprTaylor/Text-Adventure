import Description from "../components/Description";
import { Name } from "../components";
import { getArticle } from '../util/Proper'

class DescriptionSystem {
    /**
     * Get Description for entity
     * @param {CES} world 
     * @param {Entity} entity 
     * @param {boolean} namePreferred Try to return name first
     */
    static describe(world, entity, namePreferred = false) {
        let message;
        if(entity.hasComponent(Description) && entity.description.inRoom)
            message = entity.description.inRoom;

        if((!message || namePreferred) && entity.hasComponent(Name))
            message = `\nThere is ${(entity.name.label)[0]} here.`

        return message || "unknown object";
    }
}

export default DescriptionSystem

/*
export function Description (world) {
    this.update = function (dt, state) {
        let candidates = world.queryComponents([Description]);

        candidates.forEach((entity) => {
            let manager = entity.description;
            let curr = manager.map[manager.currentState];
            let {desc, done, next} = updateDesc[curr.meta.type];
            if(done) manager.currentState = next;
            manager.toDisplay = desc;
        });
    }
}

const payload = (desc, done, next) => {desc, done, next};

const updateDesc = {
    basic: (curr) => {
        return payload(curr.data.standard, false);
    },

    once: (curr) => {
        curr.data.viewed = true;
        return payload(curr.data.standard, true, curr.meta.next);
    },

    flipbook: (curr) => {
        let data = curr.data;
        data.pageNum = !data.isDone?data.pageNum+1:data.pageNum;
        data.isDone = data.pageNum >= data.pages.length - 1;
        return payload(data.pages[data.pageNum]. data.isDone, curr.meta.next);
    }
}
*/