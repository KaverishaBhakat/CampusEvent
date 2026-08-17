// Central place for all backend communication.
// Keeping fetch calls here means components stay focused on rendering,
// and the base URL only has to change in one spot if the backend moves.

const BASE_URL = 'http://localhost:5000/api/events'

// Small helper so every function handles errors the same way.
async function handleResponse(response) {
  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message)
  }
  // DELETE requests may return no content
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export async function getEvents() {
  const response = await fetch(BASE_URL)
  return handleResponse(response)
}

export async function getEventById(id) {
  const response = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(response)
}

export async function createEvent(eventData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  })
  return handleResponse(response)
}

export async function updateEvent(id, eventData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  })
  return handleResponse(response)
}

export async function deleteEvent(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}
