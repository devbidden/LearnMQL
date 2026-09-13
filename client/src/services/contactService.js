const API_URL = `${import.meta.env.VITE_API_URL || '/api'}`

export async function sendContactMessage(payload) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.message || 'Could not send your message. Please try again.')
    error.status = res.status
    throw error
  }
  return data
}

export async function listContactMessages() {
  const res = await fetch(`${API_URL}/contact`, {
    credentials: 'include',
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.message || 'Could not load contact messages.')
    error.status = res.status
    throw error
  }
  return data.messages || []
}

export async function deleteContactMessage(id) {
  const res = await fetch(`${API_URL}/contact/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const error = new Error(data.message || 'Could not delete contact message.')
    error.status = res.status
    throw error
  }
  return data
}
