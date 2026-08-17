import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import EventCard from '../components/EventCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getEvents } from '../api/eventsApi.js'
import './Home.css'

const PREVIEW_COUNT = 3

function Home() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const loadEvents = () => {
    setStatus('loading')
    getEvents()
      .then((data) => {
        setEvents(Array.isArray(data) ? data : [])
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

  const upcoming = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, PREVIEW_COUNT)

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">College Events, All in One Place</p>
            <h1 className="hero-heading">Discover What's Happening on Campus</h1>
            <p className="hero-subtext">
              From tech fests to open mics, CampusEvent brings every club, department, and
              organizer's events onto one board — so nothing good happens without you knowing.
            </p>
            <div className="hero-actions">
              <Link to="/events" className="btn btn-primary">
                Explore Events
              </Link>
              <Link to="/create-event" className="btn btn-outline">
                Create Event
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-pin" />
            <img src={heroImage} alt="" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="home-upcoming">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">On the board</p>
              <h2>Upcoming Events</h2>
            </div>
            <Link to="/events" className="btn btn-outline btn-sm">
              View all
            </Link>
          </div>

          {status === 'loading' && <Loader label="Loading upcoming events…" />}
          {status === 'error' && <ErrorMessage message={errorMessage} onRetry={loadEvents} />}
          {status === 'success' && upcoming.length === 0 && (
            <p className="empty-state">
              No events on the board yet. Be the first to{' '}
              <Link to="/create-event">create one</Link>.
            </p>
          )}
          {status === 'success' && upcoming.length > 0 && (
            <div className="event-grid">
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
