import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Lock, PlayCircle } from 'lucide-react'
import * as courseService from '../services/courseService'
import { useProgress } from '../hooks/useProgress'
import PageLoader from '../components/ui/PageLoader'
import NotFound from './NotFound'
import CertificateCard from '../components/ui/CertificateCard'
import CommunityBanner from '../components/ui/CommunityBanner'
import { useAuth } from '../hooks/useAuth'

export default function LearnCourse() {
  const { slug } = useParams()
  const { ready, enrolledCourses, completedIds, completedLessons, isComplete, ensureEnrolled, refresh } = useProgress()
  const { user } = useAuth()
  const [enrolling, setEnrolling] = useState(true)
  const [enrollError, setEnrollError] = useState('')

  const entry = enrolledCourses.find((item) => item.course.slug === slug)
  const course = entry?.course ?? null

  useEffect(() => {
    if (!ready) return
    if (entry) {
      setEnrolling(false)
      return
    }
    let cancelled = false
    ensureEnrolled(slug)
      .then(() => !cancelled && refresh())
      .catch((err) => {
        if (!cancelled) setEnrollError(err.message)
      })
      .finally(() => {
        if (!cancelled) setEnrolling(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, slug, Boolean(entry)])

  if (!ready || enrolling) {
    return <PageLoader label="Loading course…" />
  }

  if (!course) {
    return (
      <NotFound
        title="Course not found"
        message={enrollError || 'This course is not in your library, or the link is incorrect.'}
        primaryTo="/dashboard"
        primaryLabel="Back to dashboard"
        secondaryTo="/courses"
        secondaryLabel="Browse courses"
      />
    )
  }

  const stats = courseService.courseStats(course, completedIds)
  const nextHref = stats.next
    ? `/dashboard/courses/${course.slug}/lessons/${stats.next.id}`
    : `/dashboard/courses/${course.slug}`

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-[#00d181]"
        >
          <ArrowLeft size={16} />
          Back to dashboard
        </Link>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#00d181]">{course.level}</p>
            <h1 className="mt-2 text-3xl font-bold text-fg">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-muted">{course.description}</p>
          </div>
          {stats.percent < 100 && stats.next && (
            <Link
              to={nextHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-4 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
            >
              {stats.completed === 0 ? 'Start first lesson' : 'Continue'}
            </Link>
          )}
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm text-muted">
            <span>
              {stats.completed}/{stats.total} lessons complete
            </span>
            <span>{stats.percent}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-card">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00d181] to-[#00e891]"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>

        {stats.percent >= 100 && (
          <div className="mt-10 space-y-6">
            <CertificateCard name={user?.name || 'Student'} courseTitle={course.title} />
            <CommunityBanner compact />
          </div>
        )}

        <div className="mt-10 space-y-6">
          {course.modules.map((module, moduleIndex) => (
            <div key={module.id} className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-lg font-semibold text-fg">
                Module {moduleIndex + 1}: {module.title}
              </h2>
              <ul className="mt-4 divide-y divide-white/8">
                {module.lessons.map((lesson, lessonIndex) => {
                  const unlocked = courseService.isLessonUnlocked(course, lesson.id, completedIds)
                  const done = isComplete(lesson.id)
                  const score = completedLessons[lesson.id]?.score
                  const href = `/dashboard/courses/${course.slug}/lessons/${lesson.id}`

                  return (
                    <li key={lesson.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card text-xs font-semibold text-muted">
                            {lessonIndex + 1}
                          </span>
                          <div>
                            <p className="font-medium text-fg">{lesson.title}</p>
                            <p className="mt-1 text-sm text-muted">{lesson.summary}</p>
                            <p className="mt-2 text-xs text-muted">
                              {lesson.duration} · Post-class quiz
                              {done && score != null ? ` · Last score ${score}%` : ''}
                            </p>
                          </div>
                        </div>
                        {unlocked ? (
                          <Link
                            to={href}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181]"
                          >
                            {done ? <CheckCircle2 size={14} /> : <PlayCircle size={14} />}
                            {done ? 'Review' : 'Start'}
                          </Link>
                        ) : (
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted">
                            <Lock size={14} />
                            Locked
                          </span>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
