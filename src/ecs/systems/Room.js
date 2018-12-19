class RoomSystem {
    update(dt, state) {
        this.currRoom = this.world.queryTag('player')[0].presence.roomName;
        return {...state, location: this.currRoom};
    }
}

export default RoomSystem
