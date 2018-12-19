class PlayerSystem{
    getPlayer(world) {
        return world.queryTag('player')[0];
    }
}

export default PlayerSystem