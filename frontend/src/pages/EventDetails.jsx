import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import { getEventById, deleteEvent } from '../api/eventsApi.js'
import './EventDetails.css'

function formatFullDate(dateString) {
  const date = new Date(dateString)
  if (isNaN(date)) return dateString
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const loadEvent = () => {
    setStatus('loading')
    getEventById(id)
      .then((data) => {
        setEvent(data)
        setStatus('success')
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setStatus('error')
      })
  }

  useEffect(() => {
    loadEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleDelete = () => {
    setIsDeleting(true)
    setDeleteError('')
    deleteEvent(id)
      .then(() => {
        navigate('/events')
      })
      .catch((err) => {
        setDeleteError(err.message)
        setIsDeleting(false)
      })
  }

  if (status === 'loading') {
    return (
      <main className="container event-details-page">
        <Loader label="Loading event details…" />
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="container event-details-page">
        <Link to="/events" className="back-link">
          ← Back to all events
        </Link>
        <ErrorMessage message={errorMessage} onRetry={loadEvent} />
      </main>
    )
  }

  return (
    <main className="container event-details-page">
      <Link to="/events" className="back-link">
        ← Back to all events
      </Link>

      <article className="event-details-card">
        <header className="event-details-header">
          <p className="eyebrow">{formatFullDate(event.date)}</p>
          <h1 className="event-details-title">{event.title}</h1>

          <div className="event-details-meta">
            <div className="meta-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="meta-chip">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
        </header>

        <div className="event-details-divider" />

        <div className="event-details-body">
          <h2>About this Event</h2>
          <p className="event-details-description">{event.description}</p>
        </div>

        {deleteError && <ErrorMessage message={deleteError} />}

        <div className="event-details-actions">
          <Link to={`/edit-event/${event._id}`} className="btn btn-outline">
            Edit Event
          </Link>
          <button type="button" className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            Delete Event
          </button>
        </div>
      </article>

      {showConfirm && (
        <ConfirmDialog
          title="Delete this event?"
          message={`"${event.title}" will be permanently removed from the campus board.`}
          confirmLabel="Delete Permanently"
          isBusy={isDeleting}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  )
}

export default EventDetails
