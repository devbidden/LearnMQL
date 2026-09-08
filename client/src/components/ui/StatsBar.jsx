import { stats } from '../../data/mockData'

export default function StatsBar() {
  return (
    <section className="border-t border-line py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">By the numbers</p>
        <h2 className="display-title mt-3 max-w-3xl text-4xl font-bold text-fg sm:text-5xl">
          Built by a trader, taught to traders
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Courses that take you from first lines of MQL5 to a working Expert Advisor — with optional bots if you want a running example.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <p className="display-title text-4xl font-bold text-fg sm:text-5xl">{value}</p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
