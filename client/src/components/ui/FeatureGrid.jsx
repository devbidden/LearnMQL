import { GraduationCap, Shield, Zap } from 'lucide-react'
import { features } from '../../data/mockData'

const icons = [Zap, GraduationCap, Shield]

export default function FeatureGrid() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-fg sm:text-4xl">Why LearnMQL5?</h2>
          <p className="mt-2 text-muted">Built by traders, for traders</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ title, description }, index) => {
            const Icon = icons[index]
            return (
              <article
                key={title}
                className="rounded-xl border border-line bg-card p-8 text-center transition hover:border-[#00d181]/20"
              >
                <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#00d181]/10">
                  <Icon className="h-6 w-6 text-[#00d181]" />
                </div>
                <h3 className="text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
