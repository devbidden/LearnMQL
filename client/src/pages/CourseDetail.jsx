import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import * as courseService from '../services/courseService'
import * as enrollmentService from '../services/enrollmentService'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import PageLoader from '../components/ui/PageLoader'
import NotFound from './NotFound'

export default function CourseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated, loading, resendVerification } = useAuth()
  const { ready, completedIds, ensureEnrolled, refresh } = useProgress()
  const [course, setCourse] = useState(null)
  const [enrolled, setEnrolled] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [starting, setStarting] = useState(false)
  const [startError, setStartError] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const [resendStatus, setResendStatus] = useState('')

  useEffect(() => {
    let cancelled = false
    setFetching(true)
    courseService
      .getCourseBySlug(slug)
      .then(({ course: data, enrolled: isEnrolled }) => {
        if (cancelled) return
        setCourse(data)
        setEnrolled(isEnrolled)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setFetching(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading || !ready || fetching) {
    return <PageLoader label="Loading course…" />
  }

  if (notFound || !course) {
    return (
      <NotFound
        title="Course not found"
        message="We could not find this course. It may have been moved or the URL is incorrect."
        primaryTo="/courses"
        primaryLabel="Back to courses"
        secondaryTo="/"
        secondaryLabel="Back home"
      />
    )
  }

  const stats = courseService.courseStats(course, completedIds)
  const lessons = courseService.flattenLessons(course)

  async function handleStart() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${course.slug}` } })
      return
    }

    if (enrolled) {
      navigate(`/dashboard/courses/${course.slug}`)
      return
    }

    setStartError('')
    setNeedsVerification(false)
    setStarting(true)
    try {
      await ensureEnrolled(course.slug)
      await refresh()
      navigate(`/dashboard/courses/${course.slug}`)
    } catch (err) {
      if (err.code === 'EMAIL_NOT_VERIFIED') {
        setNeedsVerification(true)
        setStartError(err.message)
      } else if (err.code === 'PAYMENT_REQUIRED') {
        try {
          const { authorizationUrl } = await enrollmentService.initializePayment(course.id)
          if (authorizationUrl) {
            window.location.href = authorizationUrl
            return
          }
        } catch (paymentErr) {
          if (paymentErr.code === 'EMAIL_NOT_VERIFIED') {
            setNeedsVerification(true)
          }
          setStartError(paymentErr.message)
        }
      } else {
        setStartError(err.message)
      }
    } finally {
      setStarting(false)
    }
  }

  async function handleResend() {
    setResendStatus('Sending…')
    try {
      const data = await resendVerification(user.email)
      setResendStatus(data.message)
    } catch (err) {
      setResendStatus(err.message)
    }
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-[#00d181]"
        >
          <ArrowLeft size={16} />
          Back to courses
        </Link>

        <div className="mt-8 flex h-48 items-center justify-center rounded-xl bg-card">
          <GraduationCap className="h-16 w-16 text-[#4b5563]" />
        </div>

        <p className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-[#00d181]">{course.level}</p>
        <h1 className="mt-2 text-3xl font-bold text-fg sm:text-4xl">{course.title}</h1>
        <p className="mt-2 text-2xl font-bold text-[#00d181]">${Number(course.price).toFixed(2)}</p>
        <p className="mt-6 text-base leading-7 text-muted">{course.description}</p>
        <p className="mt-4 text-sm text-muted">
          {course.modules.length} modules · {lessons.length} lessons · {course.duration}
          {isAuthenticated && enrolled ? ` · ${stats.percent}% complete` : ''}
        </p>

        {startError && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {startError}
          </p>
        )}

        {needsVerification && (
          <div className="mt-4 rounded-lg border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-3 text-sm text-[#f59e0b]">
            <button type="button" onClick={handleResend} className="font-semibold underline">
              Resend verification email
            </button>
            {resendStatus && <p className="mt-2 text-muted">{resendStatus}</p>}
          </div>
        )}

        <button
          type="button"
          onClick={handleStart}
          disabled={starting}
          className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {starting
            ? 'Please wait…'
            : !isAuthenticated
              ? 'Log in to start'
              : enrolled
                ? stats.completed > 0
                  ? 'Continue in dashboard'
                  : 'Go to course'
                : course.price > 0
                  ? 'Enroll & checkout'
                  : 'Start course'}
        </button>

        <ol className="mt-12 space-y-6">
          {course.modules.map((module, index) => (
            <li key={module.id} className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="font-semibold text-fg">
                Module {index + 1}: {module.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {module.lessons.map((lesson) => (
                  <li key={lesson.id} className="text-sm text-muted">
                    {lesson.title}
                    <span className="text-muted"> · {lesson.duration} · quiz</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
