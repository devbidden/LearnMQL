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
        error.code = data.code
        throw error
    }

    return data
}

export function register({ name, email, password }) {
    return request('/register', {
        method: 'POST',
        body: JSON.stringify({ Name: name, name, email, password }),
    })
}

export function login({ email, password }) {
    return request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
}

export function logout() {
    return request('/logout', { method: 'POST' })
}

export function getMe() {
    return request('/me', { method: 'GET' })
}

export function forgotPassword(email) {
    return request('/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
    })
}

export function resetPassword(token, password, confirmPassword) {
    return request(`/reset-password/${token}`, {
        method: 'POST',
        body: JSON.stringify({ password, confirmPassword }),
    })
}

export function verifyEmail(token) {
    return request(`/verify-email/${token}`, { method: 'POST' })
}

export function resendVerification(email) {
    return request('/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
    })
}
