import World from './'
import { Description } from "./components/Description";

const logger = require('logdown')('app:Assemblages.js')

export function Room (name, desc) {
    return World.Entity.create()
    .addComponent("name", {label: name})
    .addComponent("description", {text: desc})
    .addTag('room')
} 

export function Player () {
    return Actor('player', 'undefinedRoom')
    .addTag('player')
}

export function Actor (name, room) {
    return World.Entity.create()
    .addComponent("name", {label: name})
    .addComponent("presence", {room})
    .addTag('actor')
}

export function Exit (name, inRoom, toRoom, direction) {
    return World.Entity.create()
    .addComponent("name", {label: name})
    .addComponent("portal", {
        dir: direction,
        link: toRoom,
        backwardLink: inRoom})
    .addTag('exit')
} 