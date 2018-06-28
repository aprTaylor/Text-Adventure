/**
 * Ensure that a passed value is an array.
 * Simplifies handling singular and multiple items
 * @export
 * @param {any} value 
 * @returns 
 */
export function forceArray(value) {
    if(Array.isArray(value))
        return value;
    return [value];
}