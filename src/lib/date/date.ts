import { format, offset, removeOffset } from "@formkit/tempo"

const JST_TIMEZONE = "Asia/Tokyo"
const UTC_TIMEZONE = "UTC"

/**
 * Formats the given date in UTC timezone using the specified format string.
 * @param date - The date to format.
 * @param format - The format string to use.
 * @returns The formatted date string.
 *
 * @example
 * const date = new Date('2021-01-01T00:00:00+09:00') // 2021-01-01 0:00 JST
 * const formattedDate = formatInUtc(date, 'YYYY-MM-DD HH:mm:ss') // 2020-12-31 15:00:00
 */
const formatInUtc = (date: Date, formatString: string) => {
  return format({
    date: date,
    format: formatString,
    tz: UTC_TIMEZONE,
  })
}

/**
 * Formats the given date in JST timezone according to the specified format string.
 * @param date - The date to format.
 * @param format - The format string to use.
 * @returns The formatted date string.
 *
 * @example
 * const date = new Date('2021-01-01T00:00:00Z') // 2021-01-01 0:00 UTC
 * const formattedDate = formatInJst(date, 'YYYY-MM-DD HH:mm:ss') // 2021-01-01 09:00:00
 */
const formatInJst = (date: Date, formatString: string) => {
  return format({
    date: date,
    format: formatString,
    tz: JST_TIMEZONE,
  })
}

/**
 * Overwrite timezone with JST. This breaks the original date's absolute time.
 *
 * @param {Date} date - The date to overwrite timezone with UTC.
 * @param {string} timezone - The timezone to overwrite with. Defaults to JST.
 * @return {Date} The date with JST timezone.
 *
 * @example
 * const date = new Date('2021-01-01T00:00:00Z') // 2021-01-01 0:00 UTC
 * const jstDate = replaceTzWithJst(date) // 2021-01-01T00:00:00.000+09:00, 2021-01-01 0:00 JST
 */
const replaceUtcWithTimezone = (date: Date, timezone: string): Date => {
  const offsetFromUtcToSpecified = offset(date, UTC_TIMEZONE, timezone)
  const adjusted = removeOffset(date, offsetFromUtcToSpecified)
  return adjusted
}

const replaceUtcWithJst = (date: Date): Date => {
  return replaceUtcWithTimezone(date, JST_TIMEZONE)
}

export { formatInJst, formatInUtc, replaceUtcWithJst, replaceUtcWithTimezone }
