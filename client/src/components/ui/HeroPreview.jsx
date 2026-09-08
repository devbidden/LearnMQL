import { useState } from 'react'
import { Activity, Bot, ShieldCheck } from 'lucide-react'

const modes = [
  { id: 'learn', label: 'Course' },
  { id: 'live', label: 'Bot' },
]

export default function HeroPreview() {
  const [mode, setMode] = useState('learn')

  return (
    <div className="relative mx-auto mt-8 max-w-5xl px-5 pb-8 lg:px-8">
      <div className="nf-panel overflow-hidden rounded-[1.75rem]">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#00d181]" />
          </div>
          <p className="hidden text-xs font-medium text-muted sm:block">LearnMQL5</p>
          <div className="flex rounded-full border border-line bg-page/70 p-1">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMode(item.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  mode === item.id ? 'bg-[#00d181] text-[#0b0e11]' : 'text-muted hover:text-fg'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-line bg-page/70 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#00d181]">
                  {mode === 'live' ? 'Patrex Pro' : 'MQL5 Masterclass'}
                </p>
                <p className="mt-1 text-lg font-semibold text-fg">
                  {mode === 'live' ? 'EURUSD · H1' : 'Lesson 4 of 18'}
                </p>
              </div>
              <span className="rounded-full bg-[#00d181]/12 px-2.5 py-1 text-xs font-semibold text-[#00d181]">
                {mode === 'live' ? 'Running' : 'In progress'}
              </span>
            </div>
            <div className="mt-6 flex h-28 items-end gap-1.5">
              {[32, 48, 40, 64, 52, 78, 44, 70, 58, 86, 62, 90, 48, 74, 66].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-[#00d181]/25"
                  style={{ height: `${height}%`, opacity: 0.45 + (index % 5) * 0.1 }}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-sm font-semibold text-fg">{mode === 'live' ? '+2.14%' : '72%'}</p>
                <p className="text-[11px] text-muted">{mode === 'live' ? 'Today' : 'Course'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-fg">{mode === 'live' ? '1.2%' : 'Quiz 4'}</p>
                <p className="text-[11px] text-muted">{mode === 'live' ? 'Risk' : 'Unlocked'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-fg">{mode === 'live' ? '99.7%' : '8/18'}</p>
                <p className="text-[11px] text-muted">{mode === 'live' ? 'Uptime' : 'Done'}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              {
                icon: Bot,
                title: mode === 'live' ? 'Bot running' : 'Lesson unlocked',
                detail: mode === 'live' ? 'Smart entry and exit live' : 'Video + quiz ready',
              },
              {
                icon: ShieldCheck,
                title: mode === 'live' ? 'Risk limits on' : 'Quiz passed',
                detail: mode === 'live' ? 'Drawdown cap and sizing' : '70% to continue',
              },
              {
                icon: Activity,
                title: mode === 'live' ? 'Trade logged' : 'Progress saved',
                detail: mode === 'live' ? 'Entry, exit, and P/L saved' : 'Next module unlocked',
              },
            ].map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-center gap-3 rounded-2xl border border-line bg-page/70 px-4 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#00d181]/12 text-[#00d181]">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{title}</p>
                  <p className="text-xs text-muted">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
