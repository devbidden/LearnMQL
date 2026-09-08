import { BarChart3, Code2, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { aboutStats } from '../data/mockData'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { PAGE_SEO } from '../seo/pages'

const icons = [TrendingUp, Code2, BarChart3]

export default function About() {
  return (
    <section className="py-20 lg:py-28">
      <Seo
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        path={PAGE_SEO.about.path}
      />
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'About LearnMQL5', path: '/about' },
          ]}
        />
        <p className="eyebrow mt-6">Company</p>
        <h1 className="display-title mt-4 text-5xl font-bold text-fg">About LearnMQL5</h1>
        <p className="mt-6 text-base leading-7 text-muted sm:text-lg">
          I&apos;m a trader and MQL4/MQL5 developer with over 5 years of experience building automated
          trading systems for MetaTrader. LearnMQL5 is where I teach Expert Advisor development and share
          the bots I&apos;ve built along the way.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {aboutStats.map(({ label, value }, index) => {
            const Icon = icons[index]
            return (
              <div
                key={label}
                className="rounded-[1.5rem] border border-line bg-card p-6 text-center"
              >
                <Icon className="mx-auto h-6 w-6 text-[#00d181]" />
                <p className="display-title mt-4 text-2xl font-bold text-fg">{value}</p>
                <p className="mt-1 text-xs text-muted">{label}</p>
              </div>
            )
          })}
        </div>

        <h2 className="mt-16 text-3xl font-bold tracking-tight text-fg">My mission</h2>
        <p className="mt-4 text-base leading-7 text-muted">
          I believe every trader deserves access to professional-grade automation without a computer
          science degree. My{' '}
          <Link to="/courses" className="font-medium text-[#00d181] hover:underline">
            MQL4 and MQL5 courses
          </Link>{' '}
          teach you to build and customize your own systems, and my{' '}
          <Link to="/bots" className="font-medium text-[#00d181] hover:underline">
            Expert Advisors
          </Link>{' '}
          include risk management by default.
        </p>
        <p className="mt-4 text-base leading-7 text-muted">
          Whether you want a ready-made trading bot or want to learn MQL4 or MQL5 from scratch,
          LearnMQL5 has you covered. Bots are available through MQL5.com for secure, verified purchases.
        </p>
      </div>
    </section>
  )
}
