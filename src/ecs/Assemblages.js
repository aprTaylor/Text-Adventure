import World from './'
import { Description } from "./components/Description";
import { logger } from "./util";

export function Room (name, desc) {
    return World.Entity.create()
    .addComponent("name", {name})
    .addComponent("description", {desc})
    .addTag('room')
} 

export function Player () {
    return Actor('player', 'undefinedRoom')
    .addTag('player')
}

export function Actor (name, startingLocation) {
    return World.Entity.create()
    .addComponent("name", {name})
    .addComponent("presence", {startingLocation})
    .addTag('actor')
}

export function Exit (inRoom, toRoom, direction) {
    return World.Entity.create()
    .addComponent("name", {name: toRoom.name.label})
    .addComponent("portal", {inRoom, toRoom, direction})
    .addTag('exit')
} 