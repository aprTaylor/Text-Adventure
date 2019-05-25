/** Specifies that an entity physically exists in a room
 *  @param {Entity} room The room that the presence is located at */
export const Presence = (room) => ({
    room: room
})

/** Specifies that an entity is displayed in the room description\
 *  *Note: can be used in conjunction with Description.inRoom* */
export const Notable = () => ({});

/** Specifies that an entity can hold other entities
 * @param {number} capacity The max weight a container can hold */
export const Container = (capacity) => ({
    capacity: capacity,
});

/** Specifies that an entity can be opened */
export const Openable = () => ({});

/** Specifies that this container is contained in another entity
 *  @param {Entity} container The container Entity
 *  @param {number} weight */
export const Containable = (container, weight) => ({
    container: container,
    weight: weight,
});

/** A label that the entity may be referred by
 *  @param {string} label The label */
export const Name = ( label) => ({
    label,
});

/** Connects an entity to another entity
 * @param {DIR} direction 
 * @param {Entity} connectedEntity */
export const Portal = ( container, connectedEntity, direction) => ({
    dir: direction,
    link: connectedEntity,
    backwardLink: container,
});

/** Text description of entity
 * @param {*} text */
export const Description = (text) => ({
    text
})
