class PlayerSystem extends System{
    getPlayer() {
        return this.world.queryTag('player')[0];
    }
}

export default PlayerSystem