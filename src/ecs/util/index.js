import { pipe, toPairs, fromPairs, filter, apply as Rapply } from 'ramda'
import isA from 'typeproof/core/isA';
//export {default as logger} from './logger';


/** Bind arguments starting after however many are passed in. */ 
export function bind_trailing_args(fn, ...bound_args) {
    return function(...args) {
        return fn(...args, ...bound_args);
    };
}

export const forceArray = (arr) => {
    if(isA.array(arr)) return arr;
    return [arr];
}

/**
 * Checks that all passed arguments are not null or undefined
 * @param  {...any} things 
 */
export const validate = (...things) => {
    return things.every((thing) => thing !== undefined && thing !== null);
}

export const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

export const asyncObjForEach = async (obj, callback) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            await callback(obj[key], key, obj);
        }
    }
} 

/*** RAMDA **********************************/
export const filterWithKeys = (pred, obj) => pipe(
    toPairs,
    filter(Rapply(pred)),
    fromPairs
)(obj);