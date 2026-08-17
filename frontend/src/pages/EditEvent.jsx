import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EventForm from '../components/EventForm.jsx'
import Loader from '../components/Loader.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { getEventById, updateEvent } from '../api/eventsApi.js'

function EditEvent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading')
  const [loadError, setLoadError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const loadEvent = () => {
    setStatus('loading')
    getEventById(id)
      .then((data) => {
        setEvent(data)
        setStatus('success')
      })
      .catch((err) => {
        setLoadError(err.message)
        setStatus('error')
      })
  }

  useEffect(() => {
    loadEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSubmit = (values) => {
    setIsSubmitting(true)
    setSubmitError('')
    updateEvent(id, values)
      .then(() => {
        navigate(`/events/${id}`)
      })
      .catch((err) => {
        setSubmitError(err.message)
        setIsSubmitting(false)
      })
  }

  return (
    <main className="container">
      <div className="page-header" style={{ padding: '48px 0 24px' }}>
        <p className="eyebrow">Update the listing</p>
        <h1>Edit Event</h1>
      </div>

      {status === 'loading' && <Loader label="Loading event…" />}
      {status === 'error' && <ErrorMessage message={loadError} onRetry={loadEvent} />}

      {status === 'success' && (
        <div style={{ paddingBottom: 80 }}>
          {submitError && <ErrorMessage message={submitError} />}
          <EventForm
            initialValues={event}
            submitLabel="Save Changes"
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </main>
  )
}

export default EditEvent
