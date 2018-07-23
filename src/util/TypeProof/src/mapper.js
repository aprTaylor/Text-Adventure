import isA from './isA'
export const mapper = (obj) => {
    for(let type in isA){
        if(isA[type](obj))
            return type;
    }
    //Type not supported
    throw Error ("Cannot parse "+ obj +". Its type is not supported for this operation.");
}
const mapperToMap = (obj, map) => {
    let returned = map[mapper(obj)];
    if(isA.undefined(returned))
        throw Error ("Cannot parse "+ obj +". Its type is not supported for this operation.");
    return returned;
}

export default mapperToMap