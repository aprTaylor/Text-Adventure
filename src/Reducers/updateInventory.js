import * as names from '../actions/names';
import {isA} from '../util/TypeProof'

const updateInventory = (action, state) => {
    let inv = state.inventory;
    let amount = inv[action.id];
    //Invert amount if subtracting
    amount = (!isA.undefined(amount) && action.type === names.REMOVE_FROM_INVENTORY)? 
            -amount : amount;

    if(!isA.undefined(amount))
        amount += action.amount;
    //If object does not exists add it
    else if(action.type === names.ADD_TO_INVENTORY)
        amount = action.amount; 

    //Delete refrence if object is no longer in inventory
    if(amount <= 0)
        amount = undefined

    return({
        ...state,
        world: {
            ...state.world,
            inventory: {...state.world.inventory, [action.id]: amount}
        }
    });
}

export default updateInventory;