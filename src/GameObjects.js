export const ROOMS = {
    "LAVENDER_FIELD": "Lavender Field",
    "FOREST": "Forest",
    "HOME": "Home"
}

export const EXITS = {
    [ROOMS.LAVENDER_FIELD]:  {E: ROOMS.FOREST, W: ROOMS.HOME},
    [ROOMS.FOREST]: {W: ROOMS.LAVENDER_FIELD},
    [ROOMS.HOME]: {E: ROOMS.LAVENDER_FIELD},
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