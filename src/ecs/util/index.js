import { pipe, toPairs, fromPairs, filter, apply as Rapply } from 'ramda'
/** Bind arguments starting after however many are passed in. */ 
export function bind_trailing_args(fn, ...bound_args) {
    return function(...args) {
        return fn(...args, ...bound_args);
    };
}

export function logger(tag, printOnly){
    this.only = printOnly;
    this.tag = tag;
    this.i = 0;
}
logger.prototype.log = function(...message){
    if(!this.only || (this.only && this.i === this.only))
        console.log("tag: ", this.tag, "i: ", this.i, ...message); 
    this.i++;
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