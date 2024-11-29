/**
 * Pads a number with leading zeros to a specified length.
 * @param num - The number to be padded.
 * @param length - The desired length of the padded number.
 * @returns The padded number as a string.
 */
const zeroPadding = (num: number, length: number) => {
  return String(num).padStart(length, "0");
};

/**
 * Rounds a number to the nearest multiple of a given value.
 *
 * @param num - The number to round.
 * @param multiple - The value to round to.
 * @returns The rounded number.
 */
const roundToNearestMultiple = (num: number, multiple: number) => {
  return Math.round(num / multiple) * multiple;
};

export { roundToNearestMultiple, zeroPadding };
