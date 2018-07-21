import isA from './isA'
export const isEmpty = (obj) => {
    if(isA.object(obj)){
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    if(isA.string(obj) || isA.array(obj)){
        if(obj.length > 0)
            return false;
        return true;
    }
    if(isA.number(obj)){
        if(obj === 0)
            return true;
        return false;
    }
    //Type is not supported
    console.warn("Cannot check if ", obj, "is empty. Its type is not supported.");
    return undefined;
}