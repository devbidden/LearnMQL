import BotCard from '../components/ui/BotCard'
import { bots } from '../data/mockData'

export default function Bots() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow">Product</p>
        <h1 className="display-title mt-4 text-5xl font-bold text-fg">Trading bots</h1>
        <p className="mt-4 max-w-2xl text-muted sm:text-lg">
          Explore our collection of expert advisors. All bots redirect to MQL5.com for secure
          purchase and download.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      </div>
    </section>
  )
}
