const API_URL = `${import.meta.env.VITE_API_URL || '/api'}`

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

export async function listEnrollments() {
    const data = await request('/enrollments')
    return data.enrollments
}

export async function enroll(courseId) {
    const data = await request(`/enrollments/${courseId}`, { method: 'POST' })
    return data.enrollment
}

export async function getEnrollment(courseId) {
    const data = await request(`/enrollments/${courseId}`)
    return data.enrollment
}

export async function completeLesson(courseId, lessonId, { moduleId, score }) {
    const data = await request(`/enrollments/${courseId}/lessons/${lessonId}/complete`, {
        method: 'PATCH',
        body: JSON.stringify({ moduleId, score }),
    })
    return data.enrollment
}

export async function initializePayment(courseId) {
    return request('/payments/initialize', {
        method: 'POST',
        body: JSON.stringify({ courseId }),
    })
}

export async function verifyPayment(reference) {
    return request(`/payments/verify/${encodeURIComponent(reference)}`)
}
