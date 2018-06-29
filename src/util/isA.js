export const isA = {
    object: (obj) => {
        return obj && typeof obj === 'object' && obj.constructor === Object;
    },
    string: (string) => {
        return typeof string === 'string' || string instanceof String;
    }
};