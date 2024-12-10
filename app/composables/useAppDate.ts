import { useDate } from 'vuetify'

export default function () {
  const dateAdapter = useDate()

  // @see https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const removeDateTimezoneOffset = (date: Date) =>
    new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))

  const parse = (date: string | Date | undefined) =>
    'string' === typeof date
      ? removeDateTimezoneOffset(
          dateAdapter.parseISO(date.slice(0, 10)) as Date,
        )
      : date

  return {
    dateAdapter,
    parse,
    removeDateTimezoneOffset,
  }
}
