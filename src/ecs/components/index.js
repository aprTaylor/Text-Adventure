/** Specifies that an entity physically exists in a room
 *  @param {Entity} room The room that the presence is located at */
export function Presence(room) {
    this.room = room;
}

/** Specifies that an entity is a room */
export function Room() {}

/** Specifies that an entity is displayed in the room description\
 *  *Note: can be used in conjunction with Description.inRoom* */
export function Notable() {}

/** Specifies that an entity can hold other entities
 * @param {number} capacity The max weight a container can hold */
export function Container(capacity) {
    this.capacity = capacity
}

/** Specifies that an entity can be opened */
export function Openable() {}

/** Specifies that this container is contained in another entity
 *  @param {Entity} container The container Entity
 *  @param {number} weight */
export function Containable(container, weight) {
    this.container = container;
    this.weight = weight;
}

/** A label that the entity may be referred by
 *  @param {string} label The label */
export function Name(label) {
    this.label = label;
}
