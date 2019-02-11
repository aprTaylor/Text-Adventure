import { Description } from "./components/Description";
import { Name, Presence, Portal } from './components'
import { logger } from "./util";

export function Room (world, name, desc) {
    return world.createEntity()
    .addComponent(Name, name)
    .addComponent(Description, desc)
    .addTag('room')
} 

export function Player (world) {
    return Actor(world, 'player', 'undefinedRoom')
    .addTag('player')
}

export function Actor (world, name, startingLocation) {
    return world.createEntity()
    .addComponent(Name, name)
    .addComponent(Presence, startingLocation)
    .addTag('actor')
}

export function Exit (world, inRoom, toRoom, direction) {
    return world.createEntity()
    .addComponent(Name, toRoom.name.label)
    .addComponent(Portal, inRoom, toRoom, direction)
    .addTag('exit')
} 