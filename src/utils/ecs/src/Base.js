class Base {
    /**
     * Define varibles and functions to extend the class with
     * @param {object} extendWith 
     */
    static extend(extendWith){
        let self = this;
        let child = function(){
          this._super = self.prototype;
        }
        child.prototype = Object.create(this.prototype);
        child.prototype.constructor = child;
  
          for (let key in extendWith)  {
              child.prototype[key] = extendWith[key];
          }
        return child;   
      }  
 
        
}

export default Base