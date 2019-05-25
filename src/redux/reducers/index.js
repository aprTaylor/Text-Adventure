import { combineReducers } from 'redux';
import worldReducer from './worldReducer';

const logger = require('logdown')('UI:reducers/index.js')

const l = (state) => {
    logger.info("Combiner State", state)
    return ({});
}

export default combineReducers({
    l,
    world: worldReducer
})   

