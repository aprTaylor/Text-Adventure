import { DisplayManager } from './Displays/DisplayManager'
import { Flipbook } from './Displays/Flipbook'

export const ROOMS = {
    "LAVENDER_FIELD": "Lavender Field",
    "FOREST": "Forest",
    "HOME": "Home",
    "TEST": "Test"
}

export const EXITS = {
    [ROOMS.LAVENDER_FIELD]:  {E: ROOMS.FOREST, W: ROOMS.HOME},
    [ROOMS.FOREST]: {W: ROOMS.LAVENDER_FIELD},
    [ROOMS.HOME]: {E: ROOMS.LAVENDER_FIELD},
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

export const DESCRIPTORS = {
    [ROOMS.LAVENDER_FIELD]: new DisplayManager({
        intro: {
            display: new Flipbook([
                "Lavender waves gently brush agianst you. Their musky sent fills your head"+
                " and your sence of smell. A nearby basket is brimming"+
                " with the surrounding long stemmed plants. Still your gloved hand reaches to pick more"+
                " If you are even a little short of a needed herb it could be devastating for the village.",
                "You wipe your glistening brow with the back of your hand and look up to estimate the time."+
                " A little past noon it seems. You move to grab your basket when a far off figure catches your eye."
            ]),
        }
    }, "intro"),
} 