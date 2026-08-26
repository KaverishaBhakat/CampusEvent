import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordField from '../components/PasswordField.jsx'
import { signup as signupRequest } from '../api/authApi.js'
import { useAuth } from '../context/AuthContext.jsx'
import './auth.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errors = {}
    if (!values.name.trim()) errors.name = 'Full name is required.'
    if (!values.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
    if (!values.password) {
      errors.password = 'Password is required.'
    } else if (values.password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    }
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match.'
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setIsSubmitting(true)
    signupRequest({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    })
      .then((data) => {
        if (data?.token && data?.user) {
          login(data.user, data.token)
          navigate('/dashboard')
        } else {
          navigate('/login')
        }
      })
      .catch((err) => {
        setFormError(err.message || 'Could not create your account. Please try again.')
        setIsSubmitting(false)
      })
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back-link">
          ← Back to Home
        </Link>
        <p className="eyebrow">Join the board</p>
        <h1>Create your account</h1>
        <p className="auth-subtext">Sign up to create, save, and track campus events.</p>

        {formError && (
          <div className="auth-alert" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{formError}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              autoComplete="name"
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            />
            {fieldErrors.name && <span id="name-error" className="form-error">{fieldErrors.name}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="you@college.edu"
              autoComplete="email"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && <span id="email-error" className="form-error">{fieldErrors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-password">Password</label>
            <PasswordField
              id="signup-password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'pwd-error' : undefined}
            />
            {fieldErrors.password && <span id="pwd-error" className="form-error">{fieldErrors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <PasswordField
              id="signup-confirm-password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby={fieldErrors.confirmPassword ? 'cpwd-error' : undefined}
            />
            {fieldErrors.confirmPassword && (
              <span id="cpwd-error" className="form-error">{fieldErrors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  )
}

export default Signup
