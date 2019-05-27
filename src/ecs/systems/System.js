import World from '..'

const logger = require('logdown')('app:system')

const System = ({
    getCurrRoom: () => {
        const presence = World.Entity.getFirstFromTag('player').presence;
        const room = World.Entity.get(presence);

        return presence.room;
    },
    moveTo: (entity, roomName) => {
        //If an entity does not have a presence component it cannot be moved
        if(!entity.presence) return false;
    
        //get room
        let room = World.Entity.byTagGet('room').filter((room) => {
            return room.name.label === roomName
        });
        entity.presence.room = room[0];
    
        return room[0];
    },
    load: (entity, component) => {
        return World.managers
                    .DataManager
                    .getFrom(entity[component].path, entity[component].state)
    }
})

export default System