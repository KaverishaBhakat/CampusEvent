import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordField from '../components/PasswordField.jsx'
import { login as loginRequest } from '../api/authApi.js'
import { useAuth } from '../context/AuthContext.jsx'
import './auth.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function IconCompass() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5 10 10l-.5 4.5L14 14l.5-4.5Z" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconBell() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const FEATURES = [
  { label: 'Discover campus events in real-time', Icon: IconCompass },
  { label: 'Register and participate in workshops & fests', Icon: IconCheck },
  { label: 'Track events created by your clubs', Icon: IconClock },
  { label: 'Stay connected with the college community', Icon: IconBell },
]

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [values, setValues] = useState({ email: '', password: '' })
  const [rememberMe, setRememberMe] = useState(true)
  const [fieldErrors, setFieldErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForgotNote, setShowForgotNote] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const errors = {}
    if (!values.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
    if (!values.password) errors.password = 'Password is required.'
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setIsSubmitting(true)
    loginRequest(values)
      .then((data) => {
        login(data.user, data.token, rememberMe)
        navigate('/dashboard')
      })
      .catch((err) => {
        setFormError(err.message || 'Something went wrong. Please try again.')
        setIsSubmitting(false)
      })
  }

  return (
    <main className="auth-split">
      <section className="auth-brand-panel">
        <Link to="/" className="auth-back-link">
          ← Back to Home
        </Link>

        <div className="auth-brand-logo">
          <span className="auth-brand-logo-mark">CE</span>
          <span>CampusEvent</span>
        </div>

        <h1>One platform for discovering, managing, and participating in campus events.</h1>
        <p className="auth-brand-tagline">
          Log in to keep up with everything happening across your college — from tech fests to
          club meetups.
        </p>

        <ul className="auth-feature-list">
          {FEATURES.map(({ label, Icon }) => (
            <li key={label}>
              <span className="auth-feature-icon" aria-hidden="true">
                <Icon />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </section>

      <section className="auth-form-panel">
        <div className="auth-card">
          <p className="eyebrow">Welcome Back</p>
          <h1>Log in to CampusEvent</h1>

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
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="name@college.edu"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <span id="email-error" className="form-error">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="login-password">Password</label>
              <PasswordField
                id="login-password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={fieldErrors.password ? 'pwd-error' : undefined}
              />
              {fieldErrors.password && <span id="pwd-error" className="form-error">{fieldErrors.password}</span>}
            </div>

            <div className="auth-row-between">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <button
                type="button"
                className="auth-forgot-btn"
                onClick={() => setShowForgotNote((v) => !v)}
                aria-expanded={showForgotNote}
              >
                Forgot Password?
              </button>
            </div>

            {showForgotNote && (
              <p className="auth-forgot-note">
                Password reset: Please contact your campus administrator or club coordinator to reset credentials.
              </p>
            )}

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="auth-footer-link">
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login