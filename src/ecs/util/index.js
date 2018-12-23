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