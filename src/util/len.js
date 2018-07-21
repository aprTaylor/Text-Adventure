import mapperToMap from './mapper'

export const len = (obj, countDigits) => {
    return mapperToMap(obj, mapping)(obj, countDigits);
}

const mapping = {
    obj: (obj) => {
        let cnt = 0;
        for(var key in myObject) 
            if (myObject.hasOwnProperty(key)) 
                cnt++;
            
        return cnt;
    },
    array: (arr) => {
        return obj.length;
    },
    number: (number, countDigits) => {
        if(countDigits)
            return number.toString().length;
        return number;
    },
    string: (str) => {
        return str.length;
    }
}