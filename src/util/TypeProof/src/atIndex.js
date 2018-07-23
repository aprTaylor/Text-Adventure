//TODO: Idea for name typeProof 
import mapperToMap from './mapper'
import isA from './isA'
export const atIndex = (index, obj) => {
    if(!isA.number(index))
        throw Error(index + " is not a number. getIndex index must be a number.");
    return mapperToMap(obj, mapping)(index, obj);
}

const mapping = {
    array: (index, arr) => {
        return arr[index];
    },
    object: (index, obj) => {
        return obj[Object.keys(obj)[index]];
    },
    string: (index, str) => {
        return str.charAt(index);
    },
    number: (index, number) => {
        return number.toString()[index];
    }
}