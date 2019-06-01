import World from './'
import { Description } from "./components/Description";

const logger = require('logdown')('app:Assemblages.js')

export function Room (scene, name, state) {
    return World.Entity.create()
    .addComponent("name", {label: name})
    .addComponent("description", {path: [scene, 'descriptions', name], state})
    .addComponent("visited")
    .addTag('room')
} 

export function Player (room) {
    return Actor('player', room)
    .addTag('player')
}

export function Actor (name, room) {
    return World.Entity.create()
    .addComponent("name", {label: name})
    .addComponent("presence", {room})
    .addComponent("inventory")
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