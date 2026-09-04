import BotCard from '../components/ui/BotCard'
import { bots } from '../data/mockData'

export default function Bots() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h1 className="text-4xl font-bold text-fg">Trading Bots</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Explore our collection of expert advisors. All bots redirect to MQL5.com for secure
          purchase and download.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      </div>
    </section>
  )
}
