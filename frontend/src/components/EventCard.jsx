import { Link } from 'react-router-dom'
import './EventCard.css'

// Formats an ISO date string into { month, day, weekday }
function formatDateParts(dateString) {
  const date = new Date(dateString)
  if (isNaN(date)) {
    return { month: '--', day: '--', weekday: 'Date TBA' }
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
      <div className="event-card-date" aria-label={`Date: ${month} ${day}, ${weekday}`}>
        <span className="event-card-month">{month}</span>
        <span className="event-card-day">{day}</span>
      </div>

      <div className="event-card-stub" aria-hidden="true" />

      <div className="event-card-body">
        <p className="eyebrow">{weekday}</p>
        <h3 className="event-card-title">
          <Link to={`/events/${event._id}`}>{event.title}</Link>
        </h3>
        <p className="event-card-description">{event.description}</p>
        <div className="event-card-location">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{event.location}</span>
        </div>
        <div className="event-card-footer">
          <Link to={`/events/${event._id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default EventCard
