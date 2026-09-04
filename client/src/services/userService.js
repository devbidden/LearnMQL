const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth`

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        const error = new Error(data.message || 'Something went wrong')
        error.status = res.status
        throw error
    }

    return data
}

export async function listUsersAdmin() {
    const data = await request('/users')
    return data.users
}
