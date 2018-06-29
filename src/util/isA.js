export const isA = {
    object: (obj) => {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    },
    string: (string) => {
        return typeof string === 'string' || string instanceof String;
    },
    array: (array) => {
        return array && typeof array === 'object' && array.constructor === Array;
    },
    number: (number) => {
        return typeof number === 'number' && isFinite(number);
    }
};