import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.png'
import EventCard from '../components/EventCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getEvents } from '../api/eventsApi.js'
import './Home.css'

const PREVIEW_COUNT = 3

const HIGHLIGHTS = [
  {
    title: 'One Central Board',
    description: 'Every club, society, and department posts here — no more missing announcements across multiple chat groups.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Instant Search & Filter',
    description: 'Find workshops, competitions, cultural nights, and meetups by name, keyword, venue, or calendar date.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    title: 'Effortless Publishing',
    description: 'Student organizers can list, update, and manage event details in seconds with quick confirmations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
]

function Home() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
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
                Explore All Events
              </Link>
              <Link to="/create-event" className="btn btn-outline">
                Create Event
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-pin" />
            <img src={heroImage} alt="Campus Event collage" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="home-highlights">
        <div className="container">
          <div className="highlights-grid">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="highlight-card">
                <div className="highlight-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
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
              View all ({events.length})
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
