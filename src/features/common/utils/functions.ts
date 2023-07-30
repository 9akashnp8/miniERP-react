/**
 * Given an object, find it's key by any
 * specific value.
 * @param object 
 * @param value
 * @returns 
 */
export function getKeyByValue(object: any, value: string) {
    return Object.keys(object).find(key => object[key] === value);
}