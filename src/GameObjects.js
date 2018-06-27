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