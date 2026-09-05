import { Bot, GraduationCap, Shield, TrendingUp } from 'lucide-react'
import { stats } from '../../data/mockData'

const icons = [Bot, GraduationCap, TrendingUp, Shield]

export default function StatsBar() {
  return (
    <section className="border-y border-line bg-page">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 lg:px-8">
        {stats.map(({ label, value }, index) => {
          const Icon = icons[index]
          return (
            <div key={label} className="flex items-center justify-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-[#00d181]" />
              <div>
                <p className="text-lg font-bold text-fg">{value}</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
