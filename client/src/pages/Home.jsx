import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BotCard from '../components/ui/BotCard'
import CourseCard from '../components/ui/CourseCard'
import SectionHeader from '../components/ui/SectionHeader'
import StatsBar from '../components/ui/StatsBar'
import CommunityBanner from '../components/ui/CommunityBanner'
import FeatureGrid from '../components/ui/FeatureGrid'
import ReviewsSlider from '../components/ui/ReviewsSlider'
import CTA from '../components/ui/CTA'
import LogoMarquee from '../components/ui/LogoMarquee'
import HeroPreview from '../components/ui/HeroPreview'
import PlatformShowcase from '../components/ui/PlatformShowcase'
import CoverageSplit from '../components/ui/CoverageSplit'
import { bots, reviews } from '../data/mockData'
import * as courseService from '../services/courseService'

export default function Home() {
  const featuredBot = bots.find((bot) => bot.featured) ?? bots[0]
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

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

  useEffect(() => {
    function onKey(event) {
      const tag = event.target?.tagName
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target?.isContentEditable) return
      if (event.key === 'c') navigate('/courses')
      if (event.key === 'b') navigate('/bots')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const featuredCourses = courses.filter((course) => course.featured).length
    ? courses.filter((course) => course.featured)
    : courses.slice(0, 3)

  return (
    <>
      <section className="hero-grid relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,209,129,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-5 pb-4 pt-12 text-center lg:px-8 lg:pt-16">
          <p className="text-sm font-medium text-muted">MQL5 courses · quizzes · Expert Advisors</p>

          <h1 className="display-title mx-auto mt-4 max-w-4xl text-5xl font-bold text-fg sm:text-6xl lg:text-7xl">
            Learn to code the{' '}
            <span className="gradient-text">bots you trade</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Expert-led MQL5 courses that take you from first script to a working Expert Advisor. Ready-made bots are there if you want a head start.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/courses"
              className="inline-flex items-center rounded-full bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
            >
              Browse courses
              <span className="kbd-chip">c</span>
            </Link>
            <Link
              to="/bots"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition hover:border-[#00d181]/50 hover:bg-[#00d181]/5"
            >
              Explore bots
              <span className="kbd-chip">b</span>
            </Link>
          </div>
        </div>
        <HeroPreview />
      </section>

      <LogoMarquee />
      <PlatformShowcase />

      <section className="border-t border-line py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Learn to build"
            title="Popular courses"
            subtitle="Step-by-step MQL5 training. Each lesson ends with a quiz so you know it stuck."
            linkTo="/courses"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} showPrice={false} />
            ))}
          </div>
        </div>
      </section>

      <CoverageSplit />
      <FeatureGrid />

      <section className="border-t border-line py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow">Reviews</p>
          <h2 className="display-title mt-3 max-w-3xl text-4xl font-bold text-fg sm:text-5xl">
            What students say
          </h2>
          <div className="mt-8">
            <ReviewsSlider reviews={reviews} />
          </div>
        </div>
      </section>

      <StatsBar />

      <section className="border-t border-line py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Also available"
            title="Trading bots"
            subtitle="Optional ready-made systems if you want something running while you learn."
            linkTo="/bots"
          />
          <BotCard bot={featuredBot} />
        </div>
      </section>

      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <CommunityBanner />
        </div>
      </section>
      <CTA />
    </>
  )
}
