import World from '..'

const System = ({
    getCurrRoom: () => {
        const presence = World.Entity.getFirstFromTag('player').presence;
        const room = World.Entity.get(presence);

        return room;
    }
})

export default System