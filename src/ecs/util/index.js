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

export async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }