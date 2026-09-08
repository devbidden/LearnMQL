import { useEffect, useState } from 'react'
import CourseCard from '../components/ui/CourseCard'
import CommunityBanner from '../components/ui/CommunityBanner'
import PageLoader from '../components/ui/PageLoader'
import * as courseService from '../services/courseService'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    courseService
      .listCourses()
      .then((data) => {
        if (!cancelled) setCourses(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">Product</p>
        <h1 className="display-title mt-4 text-5xl font-bold text-fg">Courses</h1>
        <p className="mt-4 max-w-2xl text-muted sm:text-lg">
          Learn to build and deploy trading bots with our step-by-step courses. Each module ends with a quiz so you can track real progress.
        </p>

        <div className="mt-8">
          <CommunityBanner compact />
        </div>

        {loading ? (
          <PageLoader label="Loading courses…" />
        ) : error ? (
          <p className="mt-12 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
