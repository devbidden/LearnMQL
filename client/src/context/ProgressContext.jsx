import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProgressContext } from './progress-context'
import { useAuth } from '../hooks/useAuth'
import * as courseService from '../services/courseService'
import * as enrollmentService from '../services/enrollmentService'
import * as progressService from '../services/progressService'

export function ProgressProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [ready, setReady] = useState(false)
  // one entry per enrolled course: { course, courseId, completedIds, scores: {lessonId: score}, currentLessonId }
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [lastVisited, setLastVisited] = useState({})

  const loadData = useCallback(async () => {
    if (!isAuthenticated) {
      setEnrolledCourses([])
      setReady(true)
      return
    }

    setReady(false)
    try {
      const enrollments = await enrollmentService.listEnrollments()

      const entries = await Promise.all(
        enrollments
          .filter((enrollment) => enrollment.course?.slug)
          .map(async (enrollment) => {
            const [{ course }, progressRecords] = await Promise.all([
              courseService.getCourseBySlug(enrollment.course.slug),
              progressService.getCourseProgress(enrollment.course._id).catch(() => []),
            ])

            const scores = {}
            for (const record of progressRecords) {
              if (record.quizScore != null) {
                scores[String(record.lesson)] = record.quizScore
              }
            }

            return {
              course,
              courseId: enrollment.course._id,
              completedIds: (enrollment.completedLessons || []).map(String),
              scores,
              currentLessonId: enrollment.currentLesson ? String(enrollment.currentLesson) : null,
            }
          }),
      )

      setEnrolledCourses(entries)
    } catch {
      setEnrolledCourses([])
    } finally {
      setReady(true)
    }
  }, [isAuthenticated])

  useEffect(() => {
    loadData()
  }, [loadData])

  const completedIds = useMemo(
    () => enrolledCourses.flatMap((entry) => entry.completedIds),
    [enrolledCourses],
  )

  const completedLessons = useMemo(() => {
    const map = {}
    for (const entry of enrolledCourses) {
      for (const lessonId of entry.completedIds) {
        map[lessonId] = { completedAt: true, score: entry.scores[lessonId] ?? null }
      }
    }
    return map
  }, [enrolledCourses])

  const isComplete = useCallback((lessonId) => completedIds.includes(lessonId), [completedIds])

  // ensure the user is enrolled in a course, fetching/refreshing local state as needed
  const ensureEnrolled = useCallback(
    async (courseSlug) => {
      const existing = enrolledCourses.find((entry) => entry.course.slug === courseSlug)
      if (existing) return existing

      const { course } = await courseService.getCourseBySlug(courseSlug)
      const enrollment = await enrollmentService.enroll(course.id)
      const entry = {
        course,
        courseId: course.id,
        completedIds: (enrollment.completedLessons || []).map(String),
        scores: {},
        currentLessonId: enrollment.currentLesson ? String(enrollment.currentLesson) : null,
      }
      setEnrolledCourses((current) => [...current, entry])
      return entry
    },
    [enrolledCourses],
  )

  const recordAttempt = useCallback(
    async (course, lesson, quizResult) => {
      const entry = enrolledCourses.find((item) => item.course.id === course.id)
      if (!entry) return

      await progressService.updateLessonProgress(entry.courseId, lesson.id, {
        moduleId: lesson.moduleId,
        status: quizResult.passed ? 'completed' : 'in_progress',
        progress: quizResult.score,
        quizScore: quizResult.score,
      })

      let updatedEnrollment = null
      if (quizResult.passed) {
        updatedEnrollment = await enrollmentService.completeLesson(entry.courseId, lesson.id, {
          moduleId: lesson.moduleId,
          score: quizResult.score,
        })
      }

      setEnrolledCourses((current) =>
        current.map((item) => {
          if (item.course.id !== course.id) return item
          return {
            ...item,
            completedIds: updatedEnrollment
              ? (updatedEnrollment.completedLessons || []).map(String)
              : item.completedIds,
            scores: { ...item.scores, [lesson.id]: quizResult.score },
            currentLessonId: updatedEnrollment?.currentLesson
              ? String(updatedEnrollment.currentLesson)
              : item.currentLessonId,
          }
        }),
      )
    },
    [enrolledCourses],
  )

  const visitLesson = useCallback((slug, lessonId) => {
    setLastVisited((current) => ({ ...current, [slug]: lessonId }))
  }, [])

  const continueLesson = useMemo(() => {
    for (const entry of enrolledCourses) {
      const stats = courseService.courseStats(entry.course, entry.completedIds)
      const lastId = lastVisited[entry.course.slug]
      const lastDone = lastId && entry.completedIds.includes(lastId)
      if (lastId && !lastDone) {
        return { course: entry.course, lessonId: lastId }
      }
      if (stats.next) {
        return { course: entry.course, lessonId: entry.currentLessonId ?? stats.next.id }
      }
    }
    const first = enrolledCourses[0]
    if (!first) return null
    return { course: first.course, lessonId: courseService.flattenLessons(first.course)[0]?.id }
  }, [enrolledCourses, lastVisited])

  const totals = useMemo(() => {
    const allLessons = enrolledCourses.flatMap((entry) => courseService.flattenLessons(entry.course))
    const completed = completedIds.length
    const scores = Object.values(completedLessons)
      .map((record) => record.score)
      .filter((score) => score != null)
    return {
      courses: enrolledCourses.length,
      lessons: allLessons.length,
      completed,
      percent: allLessons.length === 0 ? 0 : Math.round((completed / allLessons.length) * 100),
      quizzesPassed: completed,
      quizzesAttempted: completed,
      averageScore: scores.length === 0 ? 0 : Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    }
  }, [enrolledCourses, completedIds, completedLessons])

  const value = {
    ready,
    enrolledCourses,
    completedLessons,
    completedIds,
    isComplete,
    recordAttempt,
    visitLesson,
    ensureEnrolled,
    continueLesson,
    totals,
    refresh: loadData,
  }

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}
