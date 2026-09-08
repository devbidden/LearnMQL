import { useState } from 'react'
import { BookOpen, Bot, LineChart, Shield, Users } from 'lucide-react'

const tabs = [
  {
    id: 'courses',
    label: 'Courses',
    icon: BookOpen,
    title: 'Learn to build your own EAs',
    points: [
      'Go from MQL5 basics to a working Expert Advisor',
      'Quizzes after every lesson to lock in what you learned',
      'No fluff — practical coding and strategy development',
      'Track progress from first lesson to certificate',
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: LineChart,
    title: 'Build, test, then go live',
    points: [
      'Write the strategy, then backtest it yourself',
      'Learn optimization without guessing',
      'Understand every line before you risk capital',
      'Ship an EA you can actually explain',
    ],
  },
  {
    id: 'risk',
    label: 'Risk',
    icon: Shield,
    title: 'Risk management in the curriculum',
    points: [
      'Drawdown limits and position sizing in your own code',
      'Configure risk to match your account size',
      'Audit your logic before a live account',
      'Trade smaller until the system proves itself',
    ],
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    title: 'Learn with other students',
    points: [
      'Telegram updates when new lessons drop',
      'Talk through stuck quizzes and strategy ideas',
      'Get help when an install or lesson does not click',
      'Stay accountable with other traders learning MQL5',
    ],
  },
  {
    id: 'bots',
    label: 'Bots',
    icon: Bot,
    title: 'Optional ready-made bots',
    points: [
      'Install an Expert Advisor while you work through the course',
      'Study a live system as a reference, not a black box',
      'Buy securely on MQL5.com',
      'Use them as examples, not a substitute for learning',
    ],
  },
]

export default function PlatformShowcase() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]
  const Icon = current.icon

  return (
    <section className="py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">The curriculum</p>
        <h2 className="display-title mt-3 max-w-3xl text-4xl font-bold text-fg sm:text-5xl">
          Courses first. Automation you understand.
        </h2>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === tab.id
                  ? 'bg-[#00d181] text-[#0b0e11]'
                  : 'text-muted hover:bg-card hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#00d181]/12 text-[#00d181]">
              <Icon size={22} />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-fg">{current.title}</h3>
            <ul className="mt-5 space-y-3">
              {current.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d181]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="nf-panel rounded-[1.5rem] p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {current.points.map((point) => (
                <article key={point} className="rounded-2xl border border-line bg-page/60 p-4">
                  <p className="text-sm font-medium leading-6 text-fg">{point}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
