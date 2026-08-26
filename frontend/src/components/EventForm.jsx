import { useState } from 'react'
import './EventForm.css'

const emptyEvent = { title: '', description: '', date: '', location: '' }

function EventForm({ initialValues = emptyEvent, submitLabel = 'Save Event', onSubmit, isSubmitting }) {
  const [values, setValues] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    date: initialValues.date ? initialValues.date.slice(0, 10) : '',
    location: initialValues.location || '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.title.trim()) nextErrors.title = 'Event title is required.'
    if (!values.description.trim()) nextErrors.description = 'Please add a short description.'
    if (!values.date) nextErrors.date = 'Please pick a date for the event.'
    if (!values.location.trim()) nextErrors.location = 'Event location is required.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(values)
  }

  return (
    <form className="event-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="event-title">Event Title</label>
        <input
          id="event-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          placeholder="e.g. Annual Tech Symposium 2026"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && <span id="title-error" className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="event-description">Description</label>
        <textarea
          id="event-description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          placeholder="Describe the event, agenda, eligibility, schedule…"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'desc-error' : undefined}
        />
        {errors.description && <span id="desc-error" className="form-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="event-date">Event Date</label>
          <input
            id="event-date"
            name="date"
            type="date"
            value={values.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && <span id="date-error" className="form-error">{errors.date}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="event-location">Location / Venue</label>
          <input
            id="event-location"
            name="location"
            type="text"
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Main Auditorium, Hall B"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'loc-error' : undefined}
          />
          {errors.location && <span id="loc-error" className="form-error">{errors.location}</span>}
        </div>
      </div>

      <div className="event-form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default EventForm
