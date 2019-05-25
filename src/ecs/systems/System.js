import World from '..'

const logger = require('logdown')('app:system')

const System = ({
    getCurrRoom: () => {
        const presence = World.Entity.getFirstFromTag('player').presence;
        const room = World.Entity.get(presence);

        logger.info("Room", room, presence)

        return presence.room;
    }
})

export default System