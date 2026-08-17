import { Link } from 'react-router-dom'
import './EventCard.css'

// Formats an ISO date string into { month, day, weekday } so the
// card can show the date as a tear-off calendar block.
function formatDateParts(dateString) {
  const date = new Date(dateString)
  if (isNaN(date)) {
    return { month: '--', day: '--', weekday: '' }
  }
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: date.toLocaleDateString('en-US', { day: '2-digit' }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
  }
}

function EventCard({ event }) {
  const { month, day, weekday } = formatDateParts(event.date)

  return (
    <article className="event-card">
      <div className="event-card-date">
        <span className="event-card-month">{month}</span>
        <span className="event-card-day">{day}</span>
      </div>

      <div className="event-card-stub" aria-hidden="true" />

      <div className="event-card-body">
        <p className="eyebrow">{weekday}</p>
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-description">{event.description}</p>
        <p className="event-card-location">📍 {event.location}</p>
        <Link to={`/events/${event._id}`} className="btn btn-outline btn-sm">
          View Details
        </Link>
      </div>
    </article>
  )
}

export default EventCard
