import { useState } from 'react'
import { BookOpen, Bot, LineChart, Shield, Users } from 'lucide-react'

const tabs = [
  {
    id: 'courses',
    label: 'Courses',
    icon: BookOpen,
    title: 'Learn to build your own EAs',
    image: '/images/courses.png',
    points: [
      'Go from MQL4 or MQL5 basics to a working Expert Advisor',
      'Quizzes after every lesson to lock in what you learned',
      'Practical coding and strategy development',
      'Track progress from first lesson to certificate',
    ],
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: LineChart,
    title: 'Build, test, then go live',
    image: '/images/practice.png',
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
    image: '/images/risk.png',
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
    image: '/images/community.png',
    points: [
      'Telegram updates when new lessons drop',
      'Talk through stuck quizzes and strategy ideas',
      'Get help when an install or lesson does not click',
      'Stay accountable with other traders learning MQL4 and MQL5',
    ],
  },
  {
    id: 'bots',
    label: 'Bots',
    icon: Bot,
    title: 'Optional ready-made bots',
    image: '/images/bots.png',
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

  const current =
    tabs.find((tab) => tab.id === active) ?? tabs[0]

  const Icon = current.icon

  return (
    <section className="py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">The curriculum</p>

        <h2 className="display-title mt-3 max-w-3xl text-4xl font-bold text-fg sm:text-5xl">
          Learn MQL4 &amp; MQL5, then automate
        </h2>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-3">
          {tabs.map((tab) => {
            const TabIcon = tab.icon

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${active === tab.id
                    ? 'bg-[#00d181] text-[#0b0e11]'
                    : 'text-muted hover:bg-card hover:text-fg'
                  }`}
              >
                <TabIcon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#00d181]/12 text-[#00d181]">
              <Icon size={22} />
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-fg">
              {current.title}
            </h3>

            <ul className="mt-5 space-y-3">
              {current.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-6 text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d181]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="nf-panel overflow-hidden rounded-[1.5rem]">
            <img
              key={current.image}
              src={current.image}
              alt=""
              className="h-[360px] w-full object-cover transition-opacity duration-300 lg:h-[440px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}