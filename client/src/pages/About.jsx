import { BarChart3, Code2, TrendingUp } from 'lucide-react'
import { aboutStats } from '../data/mockData'

const icons = [TrendingUp, Code2, BarChart3]

export default function About() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="eyebrow">Company</p>
        <h1 className="display-title mt-4 text-5xl font-bold text-fg">About LearnMQL5</h1>
        <p className="mt-6 text-base leading-7 text-muted sm:text-lg">
          I&apos;m a trader and MQL5 developer with over 5 years of experience building automated
          trading systems. LearnMQL5 is where I share the bots and knowledge I&apos;ve built along
          the way.
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
          I believe every trader deserves access to professional-grade automation tools without
          needing a computer science degree. My bots are designed with risk management built in,
          and my courses teach you the skills to build and customize your own systems.
        </p>
        <p className="mt-4 text-base leading-7 text-muted">
          Whether you&apos;re looking for a ready-made bot or want to learn MQL5 from scratch,
          LearnMQL5 has you covered. All bots are available through MQL5.com for secure, verified
          purchases.
        </p>
      </div>
    </section>
  )
}
