// `new Date('2026-07-16')` parses as UTC midnight, which rolls back a day
// in negative-offset timezones. Force local-midnight parsing instead.
export function parseLocalDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`)
}
