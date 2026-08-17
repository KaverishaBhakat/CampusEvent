import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventForm from '../components/EventForm.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { createEvent } from '../api/eventsApi.js'

function CreateEvent() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (values) => {
    setIsSubmitting(true)
    setErrorMessage('')
    createEvent(values)
      .then((created) => {
        navigate(created?._id ? `/events/${created._id}` : '/events')
      })
      .catch((err) => {
        setErrorMessage(err.message)
        setIsSubmitting(false)
      })
  }

  return (
    <main className="container">
      <div className="page-header" style={{ padding: '48px 0 24px' }}>
        <p className="eyebrow">Add to the board</p>
        <h1>Create Event</h1>
        <p>Fill in the details below and it'll show up on the events board right away.</p>
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <div style={{ paddingBottom: 80 }}>
        <EventForm submitLabel="Create Event" onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </main>
  )
}

export default CreateEvent
