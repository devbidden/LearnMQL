const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}`

async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
        const message =
            data.message ||
            data.errors?.[0]?.msg ||
            'Something went wrong'
        const error = new Error(message)
        error.status = res.status
        throw error
    }

    return data
}

// --- Normalizers: map backend Course/Module/Lesson docs to the shape the UI expects ---

function normalizeQuestion(question, index) {
    return {
        id: question._id ? String(question._id) : String(index),
        prompt: question.prompt,
        options: question.options,
        answer: question.answer,
        explanation: question.explanation,
    }
}

function normalizeLesson(lesson) {
    return {
        id: String(lesson._id),
        title: lesson.title,
        summary: lesson.summary,
        duration: lesson.duration != null ? `${lesson.duration} min` : '',
        type: lesson.type,
        content: lesson.content || [],
        quiz: lesson.quiz
            ? {
                passingScore: lesson.quiz.passingScore ?? 70,
                questions: (lesson.quiz.questions || []).map(normalizeQuestion),
            }
            : null,
    }
}

function normalizeModule(module) {
    return {
        id: String(module._id),
        title: module.title,
        lessons: (module.lessons || []).map(normalizeLesson),
    }
}

function capitalize(value) {
    if (!value) return value
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function normalizeCourse(course) {
    if (!course) return null
    return {
        id: String(course._id),
        slug: course.slug,
        title: course.title,
        description: course.description,
        price: course.price,
        level: capitalize(course.level),
        duration: course.duration,
        status: course.status,
        featured: course.featured,
        category: course.category,
        modules: (course.modules || []).map(normalizeModule),
    }
}

export async function listCourses() {
    const data = await request('/courses')
    return data.courses.map(normalizeCourse)
}

export async function getCourseBySlug(slug) {
    const data = await request(`/courses/${slug}`)
    return { course: normalizeCourse(data.course), enrolled: data.enrolled }
}

export async function listCoursesAdmin() {
    const data = await request('/courses/admin/all')
    return data.courses
}

export async function getCourseByIdAdmin(id) {
    const data = await request(`/courses/admin/${id}`)
    return data.course
}

export async function createCourse(payload) {
    const data = await request('/courses', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    return data.course
}

export async function updateCourse(id, payload) {
    const data = await request(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    })
    return data.course
}

export async function deleteCourse(id) {
    return request(`/courses/${id}`, { method: 'DELETE' })
}

export async function createModule(courseId, payload) {
    const data = await request(`/modules/course/${courseId}`, {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    return data.module
}

export async function updateModule(id, payload) {
    const data = await request(`/modules/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    })
    return data.module
}

export async function deleteModule(id) {
    return request(`/modules/${id}`, { method: 'DELETE' })
}

export async function createLesson(moduleId, payload) {
    const data = await request(`/lessons/module/${moduleId}`, {
        method: 'POST',
        body: JSON.stringify(payload),
    })
    return data.lesson
}

export async function updateLesson(id, payload) {
    const data = await request(`/lessons/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    })
    return data.lesson
}

export async function deleteLesson(id) {
    return request(`/lessons/${id}`, { method: 'DELETE' })
}

// --- Pure helpers operating on normalized course objects ---

export function flattenLessons(course) {
    if (!course) return []
    return course.modules.flatMap((module, moduleIndex) =>
        module.lessons.map((lesson, lessonIndex) => ({
            ...lesson,
            moduleId: module.id,
            moduleTitle: module.title,
            moduleIndex,
            lessonIndex,
        })),
    )
}

export function getLesson(course, lessonId) {
    return flattenLessons(course).find((lesson) => lesson.id === lessonId) ?? null
}

export function getNextLesson(course, lessonId) {
    const lessons = flattenLessons(course)
    const index = lessons.findIndex((lesson) => lesson.id === lessonId)
    if (index < 0 || index === lessons.length - 1) return null
    return lessons[index + 1]
}

export function getPreviousLesson(course, lessonId) {
    const lessons = flattenLessons(course)
    const index = lessons.findIndex((lesson) => lesson.id === lessonId)
    if (index <= 0) return null
    return lessons[index - 1]
}

export function isLessonUnlocked(course, lessonId, completedIds) {
    const lessons = flattenLessons(course)
    const index = lessons.findIndex((lesson) => lesson.id === lessonId)
    if (index <= 0) return true
    return completedIds.includes(lessons[index - 1].id)
}

export function courseStats(course, completedIds) {
    const lessons = flattenLessons(course)
    const total = lessons.length
    const completed = lessons.filter((lesson) => completedIds.includes(lesson.id)).length
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
    const next = lessons.find((lesson) => !completedIds.includes(lesson.id)) ?? null
    return { total, completed, percent, next }
}