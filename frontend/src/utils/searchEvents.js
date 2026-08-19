/**
 * Utility functions for matching and filtering events by:
 * - Name / Title
 * - Details / Description
 * - Location
 * - Date (ISO, formatted names, weekday, month, day, year)
 */

/**
 * Extracts searchable string representations from a date string or timestamp.
 * Returns an array of search strings.
 */
export function getSearchableDateStrings(dateString) {
  if (!dateString) return []
  const d = new Date(dateString)
  if (isNaN(d.getTime())) return []

  const iso = d.toISOString().split('T')[0] // '2026-08-20'
  const longDate = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toLowerCase() // 'august 20, 2026'
  const shortDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toLowerCase() // 'aug 20, 2026'
  const weekdayLong = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() // 'friday'
  const weekdayShort = d.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() // 'fri'
  const monthLong = d.toLocaleDateString('en-US', { month: 'long' }).toLowerCase() // 'august'
  const monthShort = d.toLocaleDateString('en-US', { month: 'short' }).toLowerCase() // 'aug'
  const day = String(d.getDate())
  const year = String(d.getFullYear())
  const slashFormat1 = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  const slashFormat2 = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`

  return [
    iso,
    longDate,
    shortDate,
    weekdayLong,
    weekdayShort,
    monthLong,
    monthShort,
    day,
    year,
    slashFormat1,
    slashFormat2,
  ]
}

/**
 * Checks if a single event matches a given text query and optional specific date.
 * 
 * Matches across:
 * 1. Title (Name)
 * 2. Description (Details)
 * 3. Location
 * 4. Date
 */
export function matchEvent(event, query = '', dateFilter = '') {
  if (!event) return false

  // 1. Date picker filter check (exact calendar day YYYY-MM-DD)
  if (dateFilter) {
    if (!event.date) return false
    const eventDate = new Date(event.date)
    if (isNaN(eventDate.getTime())) return false

    // Compare date parts in local or UTC
    const eventIso = eventDate.toISOString().split('T')[0]
    const eventLocal = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`
    if (eventIso !== dateFilter && eventLocal !== dateFilter) {
      return false
    }
  }

  // If no text query, and date filter matched (or wasn't provided), it's a match
  const trimmedQuery = (query || '').trim().toLowerCase()
  if (!trimmedQuery) return true

  const title = (event.title || '').toLowerCase()
  const description = (event.description || '').toLowerCase()
  const location = (event.location || '').toLowerCase()
  const dateStrings = getSearchableDateStrings(event.date)

  // Split into tokens so multi-word queries like "Hackathon Auditorium Aug" match
  const tokens = trimmedQuery.split(/\s+/).filter(Boolean)

  return tokens.every((token) => {
    // Check if token matches in title
    if (title.includes(token)) return true
    // Check if token matches in description (details)
    if (description.includes(token)) return true
    // Check if token matches in location
    if (location.includes(token)) return true
    // Check if token matches any date string representation
    if (dateStrings.some((dStr) => dStr.includes(token))) return true

    return false
  })
}

/**
 * Filters and ranks a list of events according to the query and date filter.
 */
export function filterEvents(events, query = '', dateFilter = '') {
  if (!Array.isArray(events)) return []
  return events.filter((event) => matchEvent(event, query, dateFilter))
}
