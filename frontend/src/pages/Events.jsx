import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getEvents } from '../api/eventsApi.js'

function Events() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const loadEvents = () => {
    setStatus('loading')
    getEvents()
      .then((data) => {
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
          : []
        setEvents(sorted)
        setStatus('success')
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setStatus('error')
      })
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return (
    <main>
      <div className="container page-header">
        <p className="eyebrow">The full board</p>
        <h1>All Campus Events</h1>
        <p>Everything happening across every club and department, sorted by date.</p>
      </div>

      <section className="container" style={{ paddingTop: 24, paddingBottom: 80 }}>
        {status === 'loading' && <Loader label="Loading events…" />}
        {status === 'error' && <ErrorMessage message={errorMessage} onRetry={loadEvents} />}
        {status === 'success' && events.length === 0 && (
          <p className="empty-state">
            Nothing on the board yet. <Link to="/create-event">Create the first event.</Link>
          </p>
        )}
        {status === 'success' && events.length > 0 && (
          <div className="event-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Events
