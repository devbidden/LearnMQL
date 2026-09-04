import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="cta-grid relative overflow-hidden rounded-2xl border border-line bg-card px-8 py-16 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,209,129,0.08),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-fg sm:text-4xl">
              Ready to Automate Your Trading?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Get started with our proven bots or learn to build your own strategies from scratch.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
