import { useEffect, useState } from 'react'
import CourseCard from '../components/ui/CourseCard'
import CommunityBanner from '../components/ui/CommunityBanner'
import PageLoader from '../components/ui/PageLoader'
import * as courseService from '../services/courseService'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { courseListJsonLd } from '../seo/jsonLd'
import { PAGE_SEO } from '../seo/pages'

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
      <Seo
        title={PAGE_SEO.courses.title}
        description={PAGE_SEO.courses.description}
        path={PAGE_SEO.courses.path}
        jsonLd={courseListJsonLd(courses)}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'MQL4 & MQL5 courses', path: '/courses' },
          ]}
        />
        <p className="eyebrow mt-6">Product</p>
        <h1 className="display-title mt-4 text-5xl font-bold text-fg">MQL4 &amp; MQL5 courses</h1>
        <p className="mt-4 max-w-2xl text-muted sm:text-lg">
          Learn MetaTrader programming step by step: MQL4 and MQL5, Expert Advisor development, indicators, and how to code a trading strategy. Each module ends with a quiz.
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
