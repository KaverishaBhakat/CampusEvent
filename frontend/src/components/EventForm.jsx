import { useState } from 'react'
import './EventForm.css'

const emptyEvent = { title: '', description: '', date: '', location: '' }

// Shared by CreateEvent and EditEvent so both flows stay in sync.
// `initialValues` pre-fills the form when editing; `submitLabel`
// and `onSubmit` let each page control what happens next.
function EventForm({ initialValues = emptyEvent, submitLabel = 'Save', onSubmit, isSubmitting }) {
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
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.title.trim()) nextErrors.title = 'Give the event a title.'
    if (!values.description.trim()) nextErrors.description = 'Add a short description.'
    if (!values.date) nextErrors.date = 'Pick a date.'
    if (!values.location.trim()) nextErrors.location = 'Add a location.'
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
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          placeholder="Tech Fest 2026"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          placeholder="What's this event about?"
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={values.date} onChange={handleChange} />
          {errors.date && <span className="form-error">{errors.date}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={values.location}
            onChange={handleChange}
            placeholder="College Auditorium"
          />
          {errors.location && <span className="form-error">{errors.location}</span>}
        </div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}

export default EventForm
