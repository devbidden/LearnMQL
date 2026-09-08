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
import Seo from '../components/seo/Seo'
import { organizationJsonLd, websiteJsonLd, courseListJsonLd } from '../seo/jsonLd'
import { PAGE_SEO } from '../seo/pages'

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
      <Seo
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        path={PAGE_SEO.home.path}
        jsonLd={[organizationJsonLd(), websiteJsonLd(), courseListJsonLd(featuredCourses)]}
      />
      <section className="hero-grid relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,209,129,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-5xl px-5 pb-4 pt-12 text-center lg:px-8 lg:pt-16">
          <p className="text-sm font-medium text-muted">MQL4 &amp; MQL5 courses · MetaTrader · Expert Advisors</p>

          <h1 className="display-title mx-auto mt-4 max-w-4xl text-5xl font-bold text-fg sm:text-6xl lg:text-7xl">
            Learn MQL4 &amp; MQL5.{' '}
            <span className="gradient-text">Automate your trading.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Expert-led{' '}
            <Link to="/courses" className="font-medium text-[#00d181] hover:underline">
              MQL4 and MQL5 courses
            </Link>{' '}
            for MetaTrader. Go from first script to a working Expert Advisor, indicator, or trading bot.
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
              Explore Expert Advisors
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
            title="Popular MQL4 & MQL5 courses"
            subtitle="Step-by-step MetaTrader programming. Each lesson ends with a quiz so you know it stuck."
            linkTo="/courses"
            linkLabel="Browse all courses"
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
            What students say about our MQL courses
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
            title="Expert Advisors and trading bots"
            subtitle="Optional ready-made systems if you want something running while you learn to code."
            linkTo="/bots"
            linkLabel="View trading bots"
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
