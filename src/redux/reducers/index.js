import { combineReducers } from 'redux';
import worldReducer from './worldReducer';

const logger = require('logdown')('UI:reducers/index.js')

const l = (state) => {
    return ({});
}

export default combineReducers({
    l,
    world: worldReducer
})   

