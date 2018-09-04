import * as names from './names'
export const changeRoom = newRoom => ({
    type: names.CHANGE_ROOM,
    room: newRoom,
});

export const changeDisplay = display => ({
    type: names.CHANGE_DISPLAY,
    display: display
});

export const clearActions = () => ({
    type: names.CLEAR_ACTIONS,
    actions: []
});

export const addActions = (actions, newActions) => ({
    type: names.ADD_ACTIONS,
    actions: actions.concat(newActions)
});

export const updateTick = (tick, tickAmnt = 1) => ({
    type: names.UPDATE_TICK,
    tick: tick+tickAmnt
});

/* Map Container */

export const generateMap = () => ({
    type: names.GENERATE_MAP
});

export const mapRendered = () => ({
    type: names.MAP_RENDERED
});

/* Inventory */
export const addToInventory = (inventoryItemId, amount = 1) => ({
    type: names.ADD_TO_INVENTORY,
    id: inventoryItemId,
    amount: amount
})

export const removeFromInventory = (inventoryItemId, amount = 1)  => ({
    type: names.REMOVE_FROM_INVENTORY,
    id: inventoryItemId,
    amount: amount
})