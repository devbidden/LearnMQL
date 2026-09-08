import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="border-t border-line py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="cta-grid relative overflow-hidden rounded-[2rem] border border-line bg-card px-8 py-12 text-center sm:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,209,129,0.1),transparent_70%)]" />
          <div className="relative">
            <h2 className="display-title text-4xl font-bold text-fg sm:text-5xl">
              Start the course. Build the bot.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Enroll, pass the quizzes, and ship an Expert Advisor you actually understand.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/courses"
                className="inline-flex items-center rounded-full bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
              >
                Browse courses
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition hover:border-[#00d181]/50"
              >
                Create a free account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
