import { Notable, Container, Openable } from "../components";
import { Description } from "../components/Description";
import ContainmentSystem from "./Containment";
import DescriptionSystem from "./Description";

class SightSystem {
    
    /**
     * Returns description of specified room
     *
     * @param {(string)} roomName
     */
    describeRoom(world, roomName) {
        let room = world
                        .queryComponents([Room, Description])
                        .filter(entity => entity.room.name === roomName)[0];

        let message = appendDescription(world, room.description.text, room)
        LoggingSystem.instance.addLog(message)
    }

    
    appendDescription(world, description, room) {
        let updatedDescription = description;
        const entities = RoomSystem.entitiesInRoom(world, room);
        for (entity in entities) {
            if(entity === PlayerSystem.getPlayer(world)) continue;
            if (entity.hasComponent(Notable)) {
                //Use generated description or one that is provided
                updatedDescription += appendEntityDescription(world, entity)
            }
            updatedDescription += `\n${describeContainerContents(world, entity)}`;
        }
        return updatedDescription
    }

    appendEntityDescription(world, entity) {
        return DescriptionSystem.describe(world, entity)
    }

    describeContainerContents(world, entity) {
        if(!entity.hasComponent(Container)) return "";
        const containerName = entity.name.label || "nearby container";
        const article = entity.name.label? "The":"A";
        const items = listContainerContents(world, entity);
        if(items.length < 0) return "";
        return `${article} ${containerName} contains:\n  ${items.join("\n  ")}`;
    }

    listContainerContents(world, entity) {
        if(!entity.hasComponent(Container)) return [];
        if(entity.hasComponent(Openable) && !entity.openable.isOpen) return [];

        const contents = ContainmentSystem.fetchContainedEntities(world, entity);
        return contents.map(item => DescriptionSystem.describe(world, item, true));
    }
    

}

export default SightSystem