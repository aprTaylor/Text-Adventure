import mapperToMap from './mapper'
export const isEmpty = (obj) => {
    return mapperToMap(obj, mapping)(obj);
}

const mapping = {
    object: (obj) => {
        for(let key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },
    string: (str) => {
        if(str.length > 0)
            return false;
        return true;
    },
    number: (num) => {
        if(num !== 0)
            return false;
        return true;
    }
}