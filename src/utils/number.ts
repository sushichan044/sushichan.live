const zeroPadding = (num: number, length: number) => {
  return String(num).padStart(length, "0")
}

const roundToNearestMultiple = (num: number, multiple: number) => {
  return Math.round(num / multiple) * multiple
}

export { roundToNearestMultiple, zeroPadding }
