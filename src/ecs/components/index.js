/** Specifies that an entity physically exists in a room
 *  @param {Entity} room The room that the presence is located at */
export function Presence(entity, room) {
    this.room = room;
}

/** Specifies that an entity is a room */
export function Room(entity) {}

/** Specifies that an entity is displayed in the room description\
 *  *Note: can be used in conjunction with Description.inRoom* */
export function Notable(entity) {}

/** Specifies that an entity can hold other entities
 * @param {number} capacity The max weight a container can hold */
export function Container(entity, capacity) {
    this.capacity = capacity
}

/** Specifies that an entity can be opened */
export function Openable(entity) {}

/** Specifies that this container is contained in another entity
 *  @param {Entity} container The container Entity
 *  @param {number} weight */
export function Containable(entity, container, weight) {
    this.container = container;
    this.weight = weight;
}

/** A label that the entity may be referred by
 *  @param {string} label The label */
export function Name(entity, label) {
    this.label = label;
}
