import { Notable, Container, Openable } from "../components";
import { Description } from "../components/Description";
import { getArticleInPlace, getToBe } from '../util/Proper'

class SightSystem {
    
    /**
     * Returns description of specified room
     *
     * @param {Entity} room
     */
    describeRoom(room) {
        if(!room) room = getCurrRoom();
        let message = appendDescription(world, room.description.text, room)
        LoggingSystem.instance.addLog(message)
    }

    
    appendDescription(description, room) {
        let updatedDescription = description;
        const entities = entitiesInRoom(world, room);
        for (entity in entities) {
            if(entity === this.world.queryTag('player')[0]) continue;
            if (entity.hasComponent(Notable)) {
                //Use generated description or one that is provided
                updatedDescription += describe(entity)
            }
            updatedDescription += `\n${describeContainerContents(entity)}`;
        }
        return updatedDescription
    }

    describeContainerContents(entity) {
        if(!entity.hasComponent(Container)) return "";
        const containerName = entity.name.label || "nearby container";
        const article = entity.name.label? "The":"A";
        const items = listContainerContents(entity);
        if(items.length < 0) return "";
        return `${article} ${containerName} contains:\n  ${items.join("\n  ")}`;
    }

    listContainerContents(entity) {
        if(!entity.hasComponent(Container)) return [];
        if(entity.hasComponent(Openable) && !entity.openable.isOpen) return [];

        const contents = fetchContainedEntities(world, entity);
        return contents.map(item => describe(world, item, true));
    }

     /**
     * Get all entities that are contained in given entity
     * @param {Entity} entity The container entity
     */
    fetchContainedEntities(entity) {
        const containables = this.world.queryComponents([Containable]);
        return containables.filter(child => child.containable.container === entity);
    }  

    entitiesInRoom(room) {
        if(!room){
            room = getCurrRoom();
        }
        //let result = entitiesPresentInRoom()
        //result.append(entitiesContainedByRoom())
        return this.world.queryComponents([Presence]).filter(name => name === room);
    }

    /**
     * Get Description for entity
     * @param {Entity} entity 
     * @param {boolean} namePreferred Try to return name first
     */
    static describe(entity, namePreferred = false) {
        let message;
        if(entity.hasComponent(Description) && entity.description.inRoom)
            message = entity.description.inRoom;

        if((!message || namePreferred) && entity.hasComponent(Name))
            message = `\nThere ${getToBe(entity.name.label)} ${getArticleInPlace(entity.name.label, true)[0]} here.`

        return message || "unknown object";
    }

    getCurrRoom(){
        return this.world.queryTag('player')[0].presence.room;
    }
    

}

export default SightSystem