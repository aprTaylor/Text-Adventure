import { Description } from "./components/Description";
import { Name, Presence } from './components'
import { declareClass } from "babel-types";
import { logger } from "./util";

let logs = new logger('Parser');
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