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
