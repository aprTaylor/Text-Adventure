import isA from './isA'
export const mapper = (obj) => {
    for(type in isA){
        if(isA[type](obj))
            return type;
    }
    //Type not supported
    console.warn("Could not map ", obj, " to a type. It is not a supported type.");
    return undefined;
}

export const mapperToMap = (obj, map) => {
    let returned = map[mapper(obj)];
    if(isA.undefined(returned))
        throw Error ("Cannot parse ", obj, ". Its type is not supported for this operation.");
    return returned;
}