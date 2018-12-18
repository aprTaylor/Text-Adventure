class RoomSystem extends System{
    update(dt, state) {
        this.currRoom = this.world.queryTag('player')[0].presence.roomName;
        return {...state, location: this.currRoom};
    }

    entitiesInRoom(room = this.currRoom) {
        //let result = entitiesPresentInRoom()
        //result.append(entitiesContainedByRoom())
        return world.queryComponents([Presence]).filter(name => name === room);
    }
}

export default RoomSystem