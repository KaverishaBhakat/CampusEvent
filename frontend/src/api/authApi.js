// Central place for all authentication requests, mirroring the
// pattern used in eventsApi.js — components never call fetch() directly.

const BASE_URL = 'http://localhost:5000/api/auth'

// Same shared response handler shape as eventsApi.js, so both API
// files behave consistently and errors surface the backend's message
// (e.g. "Invalid email or password") instead of a raw HTTP status.
async function handleResponse(response) {
  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message)
  }
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

// userData: { name, email, password }
// Role is intentionally not sent — the backend defaults new signups to "student".
export async function signup(userData) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  return handleResponse(response)
}

// credentials: { email, password }
// Resolves to { message, token, user } on success.
//
// Login gets its own error handling (rather than reusing handleResponse)
// because the login form needs to tell "wrong password" apart from
// "no such account" apart from "server down" — signup doesn't need that
// distinction, so handleResponse above is left alone for it.
export async function login(credentials) {
  let response
  try {
    response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
  } catch {
    // fetch() itself throws (TypeError) on DNS/connection failures,
    // as opposed to the server responding with an error status.
    throw new Error('Unable to connect to the server. Please check your connection.')
  }

  if (!response.ok) {
    let backendMessage = ''
    try {
      const data = await response.json()
      if (data?.message) backendMessage = data.message
    } catch {
      // no JSON body — fall through to the status-based default below
    }

    if (backendMessage) {
      throw new Error(backendMessage)
    }

    // Only used when the backend didn't already supply its own message.
    if (response.status === 401) {
      throw new Error('Invalid email or password.')
    }
    if (response.status === 404) {
      throw new Error('No account found with this email.')
    }
    if (response.status >= 500) {
      throw new Error('Something went wrong. Please try again.')
    }
    throw new Error('Something went wrong. Please try again.')
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export async function getMe(token) {
  if (!token) throw new Error('No token provided')
  const response = await fetch(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleResponse(response)
}
