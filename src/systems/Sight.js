import { getArticleInPlace, getToBe } from '../ecs/util/Proper'
import System from './System'
import World from '../ecs';

const logger = require('logdown')('app:SightSystem.js')


function SightSystem (pool, dt) {
    let desc = describeRoom(System.getCurrRoom());
        
    World.IO.updateWorld("description", desc);
}

/**
  * Returns description of specified room
  * @param {Entity} room
  */
const describeRoom = (room) => {
    if(!room) room = System.getCurrRoom();
    let message = appendDescription(System.load(room, 'description'), room);
    return message;
}

    
const appendDescription = (description, room) => {
    let updatedDescription = description;
    //const entities = entitiesInRoom(room);
    /*entities.forEach(entity => {
        entity = World.Entity.get(entity);
        updatedDescription += describe(entity);
        logger.info("Describe", entity)
        updatedDescription += `\n${describeContainerContents(entity)}`;
    })*/
    return updatedDescription
}

const describeContainerContents = (entity) => {
    if(!entity.container) return "";
    const containerName = (entity.name && entity.name.label) || "nearby container";
    const article = (entity.name)?entity.name.label? "The":"A":"";
    const items = listContainerContents(entity);
    if(items.length < 0) return "";
    return `${article} ${containerName} contains:\n  ${items.join("\n  ")}`;
}

const listContainerContents = (entity) => {
    if(!entity.container) return [];
    if(entity.openable && !entity.openable.isOpen) return [];

    const contents = fetchContainedEntities(entity);
    return contents.map(item => describe(item, true));
}

/**
 * Get all entities that are contained in given entity
 * @param {Entity} entity The container entity
 */
const fetchContainedEntities = (entity) => {
    const containables = World.Entity.queryComponents(['containable']);
    return containables.filter(child => child.containable.container === entity);
}  

const entitiesInRoom = (room) => {
    /*
    if(!room){
        room = System.getCurrRoom();
    }*/
    //let result = entitiesPresentInRoom()
    //result.append(entitiesContainedByRoom())
    return World.Entity.queryComponents(["notable", "presence"]).filter(id => {
        return World.Entity.get(id).presence.room === room.id;
    });
}

/**
 * Get Description for entity
 * @param {Entity} entity 
 * @param {boolean} namePreferred Try to return name first
 */
const describe = (entity, namePreferred = false) => {
    let message;
    logger.info("descibe --", entity)
    if(entity.description && entity.description.inRoom)
        message = entity.description.inRoom;

    if((!message || namePreferred) && entity.name)
        message = `\nThere ${getToBe(entity.name.label)} ${getArticleInPlace(entity.name.label, true)[0]} here.`

    return message || "unknown object";
}

export default SightSystem