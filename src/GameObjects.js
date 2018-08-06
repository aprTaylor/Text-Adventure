import { DisplayManager } from './Displays/DisplayManager'
import { Flipbook } from './Displays/Flipbook'
import { Basic } from './Displays/Basic'


export const ROOMS = {
    "FIELD": "Field",
    "FOREST": "Forest",
    "HOME": "Home",
    "TEST": "Test"
}

export const EXITS = {
    [ROOMS.HOME]: {E: ROOMS.FIELD},
    [ROOMS.FIELD]:  {E: ROOMS.FOREST, W: ROOMS.HOME},
    [ROOMS.FOREST]: {W: ROOMS.FIELD},
    [ROOMS.TEST]: {N: "north", S: "south", E:"east", W:"west"}
}



export const TIME = {
    MORNING: "Morning",
    MIDDAY: "Midday",
    AFTERNOON: "Afternoon",
    EVENING: "Evening",
    NIGHT: "Night"
}

export const HOURS = {
    [TIME.MORNING]: 6,
    [TIME.MIDDAY]: 11,
    [TIME.AFTERNOON]: 13,
    [TIME.EVENING]: 18,
    [TIME.NIGHT]: 20
}

export const ACTIONS = {
    TAKE: "TAKE",
    EXAMINE: "EXAMINE",
    NEXT: "NEXT"
}

export const DESCRIPTORS = {
    [ROOMS.FIELD]: new DisplayManager({
        intro: {
            display: new Flipbook([
                "Purple waves gently brush agianst you. Their musky scent fills your head"+
                " and your sense of smell. A nearby basket is brimming"+
                " with the surrounding long stemmed plants. Still, your gloved hand reaches to pick more."+
                " Lacking even a single needed herb could be devastating for the village.",
                "You wipe your glistening brow with the back of your hand and look up to estimate the time."+
                " A little past noon it seems. You still have some time before the cold season starts but when"+
                " winter hits it can hit hard. <br> After plucking a few more stems you realize that if you don't"+
                " stop soon your basket will begin to overflow. You grab your basket and stand up."
            ]),
            to: [{
                name: "standDesc",
                condition: (flags, display) => {return eval(display.done)}
                }
            ]
        },
        standDesc: {
            display: new Basic("You stand in a field of purple sage stretching out about an acre."+
                    " Each gust of wind sends waves rippling throughout the stalky plants. At the"+
                    " edge of the field to the west sits a charming cottage that you call home. Along"+
                    " the opposite way, to the east, grand oaks fill your view. An inky blackness between"+
                    " thier trunks obscure any hidden treasures.")
        }

    }, "intro", {introIsDone: "this.done"}),
    [ROOMS.FOREST]: new Basic("You hesitantly take a few steps into into the forested depths. The trees are"+
                    " densely packed, their branches overlapping, blocking out but the faintest traces of sunlight. "),  
    [ROOMS.HOME]: new Basic("You are inside a house."),  
}