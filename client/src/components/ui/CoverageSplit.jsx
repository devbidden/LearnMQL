import { Check } from 'lucide-react'

const left = [
  'MQL4 and MQL5 programming from scratch',
  'Build your own Expert Advisors',
  'How to code a trading strategy',
  'Quizzes after every lesson',
  'Progress tracking and certificates',
  'Forex algorithmic trading practice',
  'Support when you get stuck',
  'Telegram community for students',
]

const right = [
  'Patrex Pro, TrendMark, and TrendLine Alerts',
  'Study a live system while you learn',
  'Smart entry and exit logic',
  'Built-in risk management',
  'Install on demo or live accounts',
  'Buy securely on MQL5.com',
]

function Column({ kicker, title, items }) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-card p-7">
      <p className="eyebrow">{kicker}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg">{title}</h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00d181]" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CoverageSplit() {
  return (
    <section className="border-t border-line py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="display-title max-w-3xl text-4xl font-bold text-fg sm:text-5xl">
          Learn MetaTrader programming. Use a bot if you need one.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Column kicker="Courses" title="MQL4 & MQL5: write the strategy yourself" items={left} />
          <Column kicker="Bots" title="Optional systems on the side" items={right} />
        </div>
      </div>
    </section>
  )
}
