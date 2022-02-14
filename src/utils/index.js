/**
 * 判断参数是否为字符串
 * @param {*} target 
 * @returns 
 */
 export function isString(target) {
  return typeof target === 'string';
}
/**
 * 判断参数是否为数字
 * @param {*} target 
 * @returns 
 */
 export function isNumber(target) {
  return typeof target === 'number';
}
/**
 * 判断参数是否为布尔类型
 * @param {*} target 
 * @returns 
 */
 export function isBoolean(target) {
  return typeof target === 'boolean';
}
/**
 * 判断参数是否为对象
 * @param {*} target 
 * @returns 
 */
export function isObject(target) {
  return typeof target === 'object' && target !== null;
}
/**
 * 判断参数是否为数组
 * @param {*} target 
 * @returns 
 */
export function isArray(target) {
  return Array.isArray(target);
}
/**
 * 判断新值和旧值是否相等
 * @param {*} oldValue 
 * @param {*} value 
 * @returns 
 */
export function hasChanged(oldValue, value) {
  return oldValue !== value && !(Number.isNaN(oldValue) && Number.isNaN(value));
}

export function isFunction(target) {
  return typeof target === 'function';
}