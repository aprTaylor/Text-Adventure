import World from './'
import { Description } from "./components/Description";
import { logger } from "./util";

export function Room (name, desc) {
    return World.Entity.create()
    .addComponent("Name", {name})
    .addComponent("Description", {desc})
    .addTag('room')
} 

export function Player () {
    return Actor('player', 'undefinedRoom')
    .addTag('player')
}

export function Actor (name, startingLocation) {
    return World.Entity.create()
    .addComponent("Name", {name})
    .addComponent("Presence", {startingLocation})
    .addTag('actor')
}

export function Exit (inRoom, toRoom, direction) {
    return World.Entity.create()
    .addComponent("Name", {name: toRoom.name.label})
    .addComponent("Portal", {inRoom, toRoom, direction})
    .addTag('exit')
} 