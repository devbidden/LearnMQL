import { BookOpen, GraduationCap, Shield } from 'lucide-react'
import { features } from '../../data/mockData'
import { useState } from 'react'

const icons = [GraduationCap, Shield, BookOpen]

export default function FeatureGrid() {
  const [open, setOpen] = useState(features[0]?.title)

  return (
    <section className="border-t border-line py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">Why LearnMQL5</p>
        <h2 className="display-title mt-3 max-w-3xl text-4xl font-bold text-fg sm:text-5xl">Built by traders, for traders</h2>
        <p className="mt-3 max-w-xl text-muted">Learn by building real systems. Bots are optional extras, not the main product.</p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {features.map(({ title, description }, index) => {
            const Icon = icons[index]
            const active = open === title
            return (
              <button
                key={title}
                type="button"
                onClick={() => setOpen(title)}
                className={`rounded-[1.5rem] border p-8 text-left transition ${
                  active
                    ? 'border-[#00d181]/35 bg-card shadow-[0_20px_50px_rgba(0,209,129,0.08)]'
                    : 'border-line bg-card/60 hover:border-[#00d181]/20'
                }`}
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#00d181]/10">
                  <Icon className="h-6 w-6 text-[#00d181]" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-fg">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
