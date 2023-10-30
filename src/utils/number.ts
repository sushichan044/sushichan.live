const zeroPadding = (num: number, length: number) => {
  return String(num).padStart(length, '0')
}

export { zeroPadding }
