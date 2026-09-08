import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import LessonQuiz from '../components/learn/LessonQuiz'
import * as courseService from '../services/courseService'
import { useProgress } from '../hooks/useProgress'
import PageLoader from '../components/ui/PageLoader'
import NotFound from './NotFound'
import Seo from '../components/seo/Seo'

export default function Lesson() {
  const { slug, lessonId } = useParams()
  const { ready, enrolledCourses, completedIds, isComplete, recordAttempt, visitLesson, ensureEnrolled, refresh } =
    useProgress()
  const [showQuiz, setShowQuiz] = useState(false)
  const [lastResult, setLastResult] = useState(null)
  const [enrolling, setEnrolling] = useState(true)

  const entry = enrolledCourses.find((item) => item.course.slug === slug)
  const course = entry?.course ?? null
  const lesson = course ? courseService.getLesson(course, lessonId) : null

  useEffect(() => {
    if (!ready) return
    if (entry) {
      setEnrolling(false)
      return
    }
    let cancelled = false
    ensureEnrolled(slug)
      .then(() => !cancelled && refresh())
      .finally(() => !cancelled && setEnrolling(false))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, slug, Boolean(entry)])

  useEffect(() => {
    if (course && lesson) visitLesson(course.slug, lesson.id)
  }, [course, lesson, visitLesson])

  useEffect(() => {
    setShowQuiz(false)
    setLastResult(null)
  }, [lessonId])

  if (!ready || enrolling) {
    return <PageLoader label="Loading lesson…" />
  }

  if (!course || !lesson) {
    return (
      <NotFound
        title="Lesson not found"
        message="This lesson does not exist in the course, or the link is incorrect."
        primaryTo="/dashboard"
        primaryLabel="Back to dashboard"
        secondaryTo="/courses"
        secondaryLabel="Browse courses"
      />
    )
  }

  const unlocked = courseService.isLessonUnlocked(course, lesson.id, completedIds)
  if (!unlocked) {
    return <Navigate to={`/dashboard/courses/${course.slug}`} replace />
  }

  const previous = courseService.getPreviousLesson(course, lesson.id)
  const next = courseService.getNextLesson(course, lesson.id)
  const passed = isComplete(lesson.id)
  const nextUnlocked =
    Boolean(next) && (courseService.isLessonUnlocked(course, next.id, completedIds) || lastResult?.passed || passed)

  function handleQuizSubmit(result) {
    recordAttempt(course, lesson, result)
    setLastResult(result)
  }

  return (
    <section className="py-12 lg:py-16">
      <Seo title={`${lesson.title} · ${course.title}`} description={`Lesson in ${course.title} on LearnMQL5.`} noindex />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <Link
            to={`/dashboard/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-[#00d181]"
          >
            <ArrowLeft size={16} />
            {course.title}
          </Link>
          <nav className="mt-6 space-y-5" aria-label="Course modules">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Module {moduleIndex + 1}
                </p>
                <ul className="space-y-1">
                  {module.lessons.map((item) => {
                    const itemUnlocked = courseService.isLessonUnlocked(course, item.id, completedIds)
                    const active = item.id === lesson.id
                    const done = isComplete(item.id)
                    return (
                      <li key={item.id}>
                        {itemUnlocked ? (
                          <Link
                            to={`/dashboard/courses/${course.slug}/lessons/${item.id}`}
                            className={`block rounded-lg px-3 py-2 text-sm ${active
                                ? 'bg-[#00d181]/10 font-medium text-[#00d181]'
                                : 'text-muted hover:bg-white/5 hover:text-fg'
                              }`}
                          >
                            {done ? '✓ ' : ''}
                            {item.title}
                          </Link>
                        ) : (
                          <span className="flex items-center gap-2 px-3 py-2 text-sm text-[#4b5563]">
                            <Lock size={12} />
                            {item.title}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div>
          <Link
            to={`/dashboard/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted lg:hidden"
          >
            <ArrowLeft size={16} />
            Course overview
          </Link>

          <p className="mt-4 text-sm text-muted lg:mt-0">
            {lesson.moduleTitle} · {lesson.duration}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-fg">{lesson.title}</h1>
          <p className="mt-3 text-muted">{lesson.summary}</p>

          {passed && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00d181]/10 px-3 py-1 text-xs font-semibold text-[#00d181]">
              <CheckCircle2 size={14} />
              Quiz passed — this lesson is complete
            </p>
          )}

          <div className="mt-8 space-y-6">
            {lesson.content.map((section) => (
              <article key={section.heading} className="rounded-2xl border border-line bg-surface p-6">
                <h2 className="text-lg font-semibold text-fg">{section.heading}</h2>
                <p className="mt-3 leading-7 text-[#c9d1d9]">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-[#00d181]/20 bg-[#0f1720] p-6">
            {!showQuiz ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-fg">Post-class quiz</h2>
                  <p className="mt-1 text-sm text-muted">
                    {lesson.quiz.questions.length} questions · {lesson.quiz.passingScore}% to unlock the next lesson
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowQuiz(true)}
                  className="rounded-lg bg-[#00d181] px-4 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
                >
                  {passed ? 'Review quiz' : 'Start quiz'}
                </button>
              </div>
            ) : (
              <LessonQuiz key={lesson.id} quiz={lesson.quiz} onSubmit={handleQuizSubmit} />
            )}

            {lastResult?.passed && next && (
              <Link
                to={`/dashboard/courses/${course.slug}/lessons/${next.id}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00d181]"
              >
                Next lesson unlocked
                <ArrowRight size={16} />
              </Link>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            {previous ? (
              <Link
                to={`/dashboard/courses/${course.slug}/lessons/${previous.id}`}
                className="text-sm text-muted hover:text-fg"
              >
                ← {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next && nextUnlocked ? (
              <Link
                to={`/dashboard/courses/${course.slug}/lessons/${next.id}`}
                className="text-sm font-medium text-[#00d181] hover:underline"
              >
                {next.title} →
              </Link>
            ) : next ? (
              <span className="text-sm text-muted">Pass the quiz to continue</span>
            ) : (
              <span className="text-sm text-[#00d181]">Course complete</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
