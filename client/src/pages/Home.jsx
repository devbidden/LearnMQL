import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BotCard from '../components/ui/BotCard'
import CourseCard from '../components/ui/CourseCard'
import SectionHeader from '../components/ui/SectionHeader'
import StatsBar from '../components/ui/StatsBar'
import CommunityBanner from '../components/ui/CommunityBanner'
import FeatureGrid from '../components/ui/FeatureGrid'
import ReviewsSlider from '../components/ui/ReviewsSlider'
import CTA from '../components/ui/CTA'
import { bots, reviews } from '../data/mockData'
import * as courseService from '../services/courseService'

export default function Home() {
  const featuredBot = bots.find((bot) => bot.featured) ?? bots[0]
  const [courses, setCourses] = useState([])

  useEffect(() => {
    let cancelled = false
    courseService
      .listCourses()
      .then((data) => {
        if (!cancelled) setCourses(data)
      })
      .catch(() => {
        if (!cancelled) setCourses([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <section className="hero-grid relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,209,129,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-24 text-center lg:px-8 lg:py-32">
          <span className="inline-block rounded-full border border-[#00d181]/30 bg-[#00d181]/10 px-4 py-1.5 text-xs font-medium text-[#00d181]">
            Automated Trading Solutions
          </span>

          <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
            Master the Markets with{' '}
            <span className="gradient-text">Code & Bots</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Premium trading bots built for MQL5 and expert-led courses to help you automate
            profitable strategies.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/bots"
              className="inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
            >
              Explore Bots
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg border border-[#00d181]/40 px-6 py-3 text-sm font-semibold text-fg transition hover:border-[#00d181] hover:bg-[#00d181]/5"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader
            title="Featured Bots"
            subtitle="Proven automated trading systems"
            linkTo="/bots"
          />
          <BotCard bot={featuredBot} />
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeader
            title="Popular Courses"
            subtitle="Level up your trading skills"
            linkTo="/courses"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(courses.filter((course) => course.featured).length
              ? courses.filter((course) => course.featured)
              : courses.slice(0, 3)
            ).map((course) => (
              <CourseCard key={course.id} course={course} showPrice={false} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHeader title="What Students & Traders Say" subtitle="Real results from real users" />
          <ReviewsSlider reviews={reviews} />
        </div>
      </section>

      <FeatureGrid />
      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <CommunityBanner />
        </div>
      </section>
      <CTA />
    </>
  )
}
