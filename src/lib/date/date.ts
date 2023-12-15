import { zeroPadding } from "@/utils/number"
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz"

const JST_TIMEZONE = "Asia/Tokyo"
const UTC_TIMEZONE = "UTC"

type DateOption = {
  d: number
  h?: number
  m: number
  min?: number
  s?: number
  y: number
}

const getIsoString = (num: number) => {
  return zeroPadding(num, 2)
}

/**
 * Returns a new Date object in JST (Japan Standard Time) timezone based on the given DateOption.
 * @param option - An object containing year, month, day, hour, minute and second values.
 * @returns A new Date object in JST timezone.
 *
 * @example
 * const jstDate = getJSTDate({ y: 2021, m: 1, d: 1 }) // 2021-01-01T00:00:00.000+09:00
 */
const getJSTDate = (option: DateOption) => {
  const { d, h = 0, m, min = 0, s = 0, y } = option
  const isoJstString = `${y}-${getIsoString(m)}-${getIsoString(
    d,
  )}T${getIsoString(h)}:${getIsoString(min)}:${getIsoString(s)}+09:00`

  const jstDate = new Date(isoJstString)
  return jstDate
}

/**
 * Converts a given date from JST timezone to UTC timezone.
 * @param date - The date to be converted.
 * @returns The converted date in UTC timezone.
 */
const convertJstToUtc = (date: Date) => {
  const utcDate = zonedTimeToUtc(date, JST_TIMEZONE)
  return utcDate
}

/**
 * Converts a UTC date to JST (Japan Standard Time) date.
 * @param date - The UTC date to convert.
 * @returns The converted JST date.
 */
const convertUtcToJst = (date: Date) => {
  const jstDate = utcToZonedTime(date, JST_TIMEZONE)
  return jstDate
}

/**
 * Formats the given date in UTC timezone using the specified format string.
 * @param date - The date to format.
 * @param format - The format string to use.
 * @returns The formatted date string.
 *
 * @example
 * const date = new Date('2021-01-01T00:00:00+09:00') // 2021-01-01 0:00 JST
 * const formattedDate = formatInUtc(date, 'yyyy-MM-dd HH:mm:ss') // 2020-12-31 15:00:00
 */
const formatInUtc = (date: Date, format: string) => {
  return formatInTimeZone(date, UTC_TIMEZONE, format)
}

/**
 * Formats the given date in JST timezone according to the specified format string.
 * @param date - The date to format.
 * @param format - The format string to use.
 * @returns The formatted date string.
 *
 * @example
 * const date = new Date('2021-01-01T00:00:00Z') // 2021-01-01 0:00 UTC
 * const formattedDate = formatInJst(date, 'yyyy-MM-dd HH:mm:ss') // 2021-01-01 09:00:00
 */
const formatInJst = (date: Date, format: string) => {
  return formatInTimeZone(date, JST_TIMEZONE, format)
}

/**
 * Overwrite timezone with JST.
 *
 * @param {Date} date - The date to overwrite. e.g. in UTC timezone.
 * @return {Date} The date with JST timezone.
 *
 * @example
 * const date = new Date('2021-01-01T00:00:00Z') // 2021-01-01 0:00 UTC
 * const jstDate = replaceTzWithJst(date) // 2021-01-01T00:00:00.000+09:00, 2021-01-01 0:00 JST
 */
const replaceTzWithJst = (date: Date): Date => {
  const rawIsoString = date.toISOString()
  const timeZoneRegex = /(Z)|([+-]\d{2}:\d{2})$/

  const rawIsoStringWithoutTz = rawIsoString.replace(timeZoneRegex, "")
  const isoString = rawIsoStringWithoutTz.replace("Z", "+09:00")
  return new Date(isoString)
}

export {
  convertJstToUtc,
  convertUtcToJst,
  formatInJst,
  formatInUtc,
  getJSTDate,
  replaceTzWithJst,
}
