import { ACTIONS } from '../GameObjects'
import { forceArray } from '../util/mis'

const addActions = (state, action) => {
    if(!action.hasOwnProperty('newActions') || !action.hasOwnProperty('actions') || !action.newActions)
        return state;

    let newActions = forceArray(action.newActions);
    let newState = {world:{}};

    newActions = newActions.reduce((actions, newAction) => {
        switch(newAction){
            case ACTIONS.NEXT:  
                actions.push({name: "Next", dispatch: () => action.actionMap[newAction]});
            default: 
                return actions;
        }
        return actions;
    }, state.actions);
    return {
        ...state,
        ...newState,
        actions: newActions
    }
}

export default addActions;