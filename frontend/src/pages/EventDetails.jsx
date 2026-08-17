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
      <main className="container">
        <Loader label="Loading event…" />
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main className="container">
        <ErrorMessage message={errorMessage} onRetry={loadEvent} />
      </main>
    )
  }

  return (
    <main className="container event-details">
      <Link to="/events" className="back-link">
        ← Back to all events
      </Link>

      <div className="event-details-card">
        <p className="eyebrow">{formatFullDate(event.date)}</p>
        <h1>{event.title}</h1>
        <p className="event-details-location">📍 {event.location}</p>
        <p className="event-details-description">{event.description}</p>

        {deleteError && <ErrorMessage message={deleteError} />}

        <div className="event-details-actions">
          <Link to={`/edit-event/${event._id}`} className="btn btn-outline">
            Edit Event
          </Link>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            Delete Event
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Delete this event?"
          message={`"${event.title}" will be removed permanently. This can't be undone.`}
          confirmLabel="Delete"
          isBusy={isDeleting}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </main>
  )
}

export default EventDetails
