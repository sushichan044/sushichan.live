/**
 * Parse a boolean-like literal such as `"True"`, `"False"` to a boolean.
 * If the string is null, it will return false.
 * If string is not boolean-like, it will return false and log an error.
 *
 * @param {(string | null)} str
 * @return {*}  {boolean}
 * @example
 * parseBoolean('true') // true
 * parseBoolean('True') // true
 * parseBoolean('TRUE') // true
 * parseBoolean('false') // false
 * parseBoolean('False') // false
 * parseBoolean('FALSE') // false
 * parseBoolean('ABCDEF') // error and return false
 * parseBoolean(null) // false
 */
const parseBoolean = (str: string | null | undefined): boolean => {
  if (str === null || str === undefined) return false

  const parsed = str.toLowerCase()
  if (parsed === 'true') return true
  if (parsed === 'false') return false

  console.error(`parseBoolean: ${str} is not a valid boolean`)
  return false
}

export { parseBoolean }
