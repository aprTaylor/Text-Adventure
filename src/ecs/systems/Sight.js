import { setIn as setState } from 'timm'
import { Notable, Container, Openable, Containable, Name, Presence } from "../components";
import { Description } from "../components/Description";
import { getArticleInPlace, getToBe } from '../util/Proper'
import { logger } from '../util';
import World from '..';


function SightSystem (pool, dt) {
    let desc = describeRoom(getCurrRoom());
        
    World.IO.updateWorld("description", desc);
}

const getCurrRoom = () => {
    const player = World.Entity.byTag('player')[0];
    const presence = World.Entity.get(player).room;
    const room = World.Entity.find('room', {name: presence});

    return room[0];
}
/**
  * Returns description of specified room
  * @param {Entity} room
  */
const describeRoom = (room) => {
    if(!room) room = getCurrRoom();
    let message = appendDescription(room.description.text, room);

    return message;
}

    
const appendDescription = (description, room) => {
    let updatedDescription = description;
    const entities = this.entitiesInRoom(this.world, room);
    for (let entity in entities) {
        if(entity === this.world.queryTag('player')[0]) continue;
        if (entity.hasComponent(Notable)) {
            //Use generated description or one that is provided
            updatedDescription += this.describe(entity)
        }
        updatedDescription += `\n${this.describeContainerContents(entity)}`;
    }
    return updatedDescription
}

const describeContainerContents = (entity) => {
    if(!entity.hasComponent(Container)) return "";
    const containerName = entity.name.label || "nearby container";
    const article = entity.name.label? "The":"A";
    const items = this.listContainerContents(entity);
    if(items.length < 0) return "";
    return `${article} ${containerName} contains:\n  ${items.join("\n  ")}`;
}

const listContainerContents = (entity) => {
    if(!entity.hasComponent(Container)) return [];
    if(entity.hasComponent(Openable) && !entity.openable.isOpen) return [];

    const contents = this.fetchContainedEntities(this.world, entity);
    return contents.map(item => this.describe(this.world, item, true));
}

/**
 * Get all entities that are contained in given entity
 * @param {Entity} entity The container entity
 */
const fetchContainedEntities = (entity) => {
    const containables = this.world.queryComponents([Containable]);
    return containables.filter(child => child.containable.container === entity);
}  

const entitiesInRoom = (room) => {
    /*
    if(!room){
        room = getCurrRoom();
    }*/
    //let result = entitiesPresentInRoom()
    //result.append(entitiesContainedByRoom())
    return World.Entity.queryComponents([Presence]).filter(name => name === room);
}

/**
 * Get Description for entity
 * @param {Entity} entity 
 * @param {boolean} namePreferred Try to return name first
 */
const describe = (entity, namePreferred = false) => {
    let message;
    if(entity.hasComponent(Description) && entity.description.inRoom)
        message = entity.description.inRoom;

    if((!message || namePreferred) && entity.hasComponent(Name))
        message = `\nThere ${getToBe(entity.name.label)} ${getArticleInPlace(entity.name.label, true)[0]} here.`

    return message || "unknown object";
}

export default SightSystem