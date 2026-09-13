const API_URL = `${import.meta.env.VITE_API_URL || '/api'}`

// multipart upload — don't set a Content-Type header, the browser must set its own boundary
export async function uploadLessonVideo(file) {
    const formData = new FormData()
    formData.append('video', file)

    const res = await fetch(`${API_URL}/uploads/video`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        const error = new Error(data.message || 'Video upload failed')
        error.status = res.status
        throw error
    }

    return data
}

export async function uploadCourseCover(file) {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`${API_URL}/uploads/course-cover`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
        const error = new Error(data.message || 'Cover image upload failed')
        error.status = res.status
        throw error
    }

    return data
}
