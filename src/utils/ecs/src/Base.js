class Extendable {
    /**
     * Define varibles and functions to extend the class with
     * @param {object} extendWith functions and varibles to extend with
     * @param {boolean=} embedParentProps determines wether to confine parent functions to 
     * seperate context or embed them into the child. False by default.
     * @param {object=} context optional object refrence for static usage not tied to a class
     * @param {object=} prototype optional prototype refrence to use for child
     */
    static extend(extendWith, embedParentProps=false, context = this, prototype = this.prototype){
        prototype = context&&!prototype?context.prototype:prototype;
        let child = function(){
          this._super = prototype;
        }
        child.prototype = Object.create(prototype);
        child.prototype.constructor = child;
        //Add parent context first so child can override methods
        if(embedParentProps){
            for (let key in context)  {
                child.prototype[key] = context[key];
            }
        }
        for (let key in extendWith)  {
            child.prototype[key] = extendWith[key];
        }
        return child;   
      }  
 
        
}

export default Extendable