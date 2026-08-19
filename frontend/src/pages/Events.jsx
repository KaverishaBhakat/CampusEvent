import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import EventCard from '../components/EventCard.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getEvents } from '../api/eventsApi.js'
import { filterEvents } from '../utils/searchEvents.js'
import './Events.css'

function Events() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const searchQuery = searchParams.get('search') || ''

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

  const handleSearchChange = (val) => {
    const nextParams = new URLSearchParams(searchParams)
    if (val) {
      nextParams.set('search', val)
    } else {
      nextParams.delete('search')
    }
    setSearchParams(nextParams, { replace: true })
  }

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true })
  }

  const filteredEvents = filterEvents(events, searchQuery)
  const isFiltering = Boolean(searchQuery.trim())

  return (
    <main>
      <div className="container page-header">
        <p className="eyebrow">The full board</p>
        <h1>All Campus Events</h1>
        <p>Everything happening across every club and department, sorted by date.</p>
      </div>

      <section className="container" style={{ paddingTop: 16, paddingBottom: 80 }}>
        {/* Search Bar */}
        <div className="events-filter-section">
          <div className="events-filter-bar">
            <div className="events-search-input-group">
              <span className="events-search-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                id="events-search-input"
                type="text"
                className="events-search-input"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="events-clear-btn"
                  onClick={() => handleSearchChange('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Summary */}
          {status === 'success' && isFiltering && (
            <div className="events-filter-summary">
              <span className="events-filter-status">
                Showing <strong>{filteredEvents.length}</strong> of{' '}
                <strong>{events.length}</strong> events matching "<strong>{searchQuery}</strong>"
              </span>
              <button
                type="button"
                className="events-reset-link"
                onClick={handleResetFilters}
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {status === 'loading' && <Loader label="Loading events…" />}
        {status === 'error' && <ErrorMessage message={errorMessage} onRetry={loadEvents} />}

        {/* Global Empty State (no events in database at all) */}
        {status === 'success' && events.length === 0 && (
          <p className="empty-state">
            Nothing on the board yet. <Link to="/create-event">Create the first event.</Link>
          </p>
        )}

        {/* Filtered Empty State (events exist in database, but none match search) */}
        {status === 'success' && events.length > 0 && filteredEvents.length === 0 && (
          <div className="events-empty-search">
            <h3>No events found</h3>
            <p>
              We couldn't find any events matching your search criteria. Try a different keyword, check for typos, or clear filters.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleResetFilters}
            >
              Clear filters and show all events
            </button>
          </div>
        )}

        {/* Event Cards Grid */}
        {status === 'success' && filteredEvents.length > 0 && (
          <div className="event-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Events
