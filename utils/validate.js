/**
 * @description array is not empty
 * @returns {Boolean} empty: false, not empty: true
 */
exports.arrIsNotEmpty = arr => arr && Array.isArray(arr) && arr.length > 0

/**
 * @description empty array or not
 * @returns {Boolean} empty: true, not empty: false
 */
exports.arrIsEmpty = arr => arr && Array.isArray(arr) && arr.length === 0

/**
 * @description object is not empty
 * @returns {Boolean} empty: true, not empty: true
 */
exports.objIsNotEmpty = obj => obj && Object.keys(obj).length > 0 && obj.constructor === Object

/**
 * @description empty object or not
 * @returns {Boolean} empty: true, not empty: false
 */
exports.objIsEmpty = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object

/**
 * @description 確認 Object 裡是否存在對應名稱的 key or property
 * @returns {Boolean} 存在: true, 不存在: false
 */

exports.propertyIsInObject = (object, propertyName) => {
  return (
    object &&
    Object.keys(object).length > 0 &&
    object.constructor === Object &&
    Object.prototype.hasOwnProperty.call(object, propertyName)
  )
}
