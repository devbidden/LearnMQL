import { Link } from 'react-router-dom'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock3,
  Lock,
  PlayCircle,
  Target,
  Trophy,
} from 'lucide-react'
import * as courseService from '../services/courseService'
import { useAuth } from '../hooks/useAuth'
import { useProgress } from '../hooks/useProgress'
import PageLoader from '../components/ui/PageLoader'
import CertificateCard from '../components/ui/CertificateCard'
import CommunityBanner from '../components/ui/CommunityBanner'
import Seo from '../components/seo/Seo'

export default function Dashboard() {
  const { user } = useAuth()
  const { ready, enrolledCourses, completedIds, completedLessons, continueLesson, totals, isComplete } = useProgress()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  if (!ready) {
    return <PageLoader label="Loading your courses…" />
  }

  const continueHref = continueLesson?.lessonId
    ? `/dashboard/courses/${continueLesson.course.slug}/lessons/${continueLesson.lessonId}`
    : '/dashboard'

  const continueTitle = continueLesson
    ? courseService.flattenLessons(continueLesson.course).find((lesson) => lesson.id === continueLesson.lessonId)?.title
    : null

  return (
    <section className="py-16 lg:py-20">
      <Seo title="My courses" description="Your LearnMQL5 course progress." noindex />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#00d181]">Student dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-fg sm:text-4xl">Welcome back, {firstName}</h1>
            <p className="mt-2 max-w-xl text-muted">
              Work through modules in order. Each lesson ends with a quiz — pass it to unlock the next class.
            </p>
          </div>
          <Link
            to={continueHref}
            className="inline-flex items-center gap-2 rounded-lg border border-[#00d181]/30 bg-[#00d181]/10 px-4 py-2 text-sm font-semibold text-[#00d181] transition hover:bg-[#00d181]/15"
          >
            Continue learning
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={BookOpen} label="Courses" value={String(totals.courses).padStart(2, '0')} detail="In your library" />
          <StatCard
            icon={Trophy}
            label="Lessons completed"
            value={`${totals.completed}/${totals.lessons}`}
            detail={`${totals.percent}% of all lessons`}
          />
          <StatCard icon={Target} label="Quizzes passed" value={String(totals.quizzesPassed)} detail="70% passing score" />
          <StatCard
            icon={Award}
            label="Average quiz score"
            value={totals.completed ? `${totals.averageScore}%` : '—'}
            detail={totals.completed ? 'Across passed quizzes' : 'Take your first quiz'}
          />
        </div>

        <div className="mt-10">
          <CommunityBanner compact />
        </div>

        {continueLesson && (
          <div className="mt-10 rounded-2xl border border-[#00d181]/20 bg-[#0f1720] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted">Pick up where you left off</p>
                <h2 className="mt-1 text-xl font-bold text-fg">{continueLesson.course.title}</h2>
                <p className="mt-1 text-sm text-muted">{continueTitle}</p>
              </div>
              <Link
                to={continueHref}
                className="inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-4 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
              >
                <PlayCircle size={16} />
                Resume lesson
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 space-y-8">
          {enrolledCourses.length === 0 && (
            <div className="rounded-2xl border border-line bg-surface p-8 text-center">
              <p className="text-muted">You are not enrolled in any courses yet.</p>
              <Link
                to="/courses"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-4 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
              >
                Browse courses
              </Link>
            </div>
          )}
          {enrolledCourses.map(({ course }) => {
            const stats = courseService.courseStats(course, completedIds)
            return (
              <article
                key={course.id}
                className="rounded-2xl border border-line bg-surface p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#00d181]/10 px-2.5 py-1 text-xs font-medium text-[#00d181]">
                        {course.level}
                      </span>
                      <span className="text-xs uppercase tracking-[0.12em] text-muted">{course.duration}</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-fg">{course.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{course.description}</p>
                  </div>
                  <div className="min-w-[180px]">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted">
                      <span>Course progress</span>
                      <span>{stats.percent}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-page">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00d181] to-[#00e891]"
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted">
                      {stats.completed}/{stats.total} lessons · {course.modules.length} modules
                    </p>
                    <Link
                      to={`/dashboard/courses/${course.slug}`}
                      className="mt-4 inline-flex text-sm font-semibold text-[#00d181] hover:underline"
                    >
                      Open course
                    </Link>
                  </div>
                </div>

                {stats.percent >= 100 && (
                  <div className="mt-6">
                    <CertificateCard name={user?.name || firstName} courseTitle={course.title} />
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  {course.modules.map((module, moduleIndex) => {
                    const moduleLessons = module.lessons
                    const moduleDone = moduleLessons.filter((lesson) => isComplete(lesson.id)).length
                    return (
                      <div key={module.id} className="rounded-2xl border border-line bg-card p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="text-sm font-semibold text-fg">
                            Module {moduleIndex + 1} · {module.title}
                          </h3>
                          <span className="text-xs text-muted">
                            {moduleDone}/{moduleLessons.length}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {moduleLessons.map((lesson) => {
                            const unlocked = courseService.isLessonUnlocked(course, lesson.id, completedIds)
                            const done = isComplete(lesson.id)
                            const record = completedLessons[lesson.id]
                            const href = `/dashboard/courses/${course.slug}/lessons/${lesson.id}`

                            return (
                              <li key={lesson.id}>
                                {unlocked ? (
                                  <Link
                                    to={href}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-[#00d181]/20 hover:bg-[#1a1f27]"
                                  >
                                    <span className="flex min-w-0 items-center gap-3">
                                      {done ? (
                                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#00d181]" />
                                      ) : (
                                        <PlayCircle className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                                      )}
                                      <span className="truncate text-sm text-fg">{lesson.title}</span>
                                    </span>
                                    <span className="flex shrink-0 items-center gap-3 text-xs text-muted">
                                      {done && record?.score != null ? `${record.score}% quiz` : 'Quiz after class'}
                                      <Clock3 size={12} />
                                      {lesson.duration}
                                    </span>
                                  </Link>
                                ) : (
                                  <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 opacity-60">
                                    <span className="flex min-w-0 items-center gap-3">
                                      <Lock className="h-4 w-4 shrink-0 text-muted" />
                                      <span className="truncate text-sm text-muted">{lesson.title}</span>
                                    </span>
                                    <span className="text-xs text-muted">Pass previous quiz to unlock</span>
                                  </div>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#00d181]/10 text-[#00d181]">
          <Icon className="h-5 w-5" />
        </div>
        <CircleDashed className="h-4 w-4 text-muted" />
      </div>
      <p className="mt-5 text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-bold text-fg">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </div>
  )
}
