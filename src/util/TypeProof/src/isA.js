/**
 * Code credit to "How to better check data types in javascript"
 * https://webbjocke.com/javascript-check-data-types/
 * by Webbjocke
 */
const isA = {
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
    },
    func: (func) => {
        return typeof func === 'function';
    },
    null: (null_) => {
        return null_ === null;
    },
    undefined: (undef) => {
        return typeof undef === 'undefined';
    },
    boolean: (bool) => {
        return typeof bool === 'boolean';
    },
    regExp: (reg) => {
        return reg && typeof reg === 'object' && reg.constructor === RegExp;
    },
    error: (err) => {
        return err instanceof Error && typeof err.message !== 'undefined';
    },
    date: (date) => {
        return date instanceof Date;
    },
    symbol: (sym) => {
        return typeof sym === 'symbol';
    }    
};

export default isA;