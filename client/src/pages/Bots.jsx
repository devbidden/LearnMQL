import BotCard from '../components/ui/BotCard'
import { bots } from '../data/mockData'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import { PAGE_SEO } from '../seo/pages'
import { Link } from 'react-router-dom'

export default function Bots() {
  return (
    <section className="py-20 lg:py-28">
      <Seo
        title={PAGE_SEO.bots.title}
        description={PAGE_SEO.bots.description}
        path={PAGE_SEO.bots.path}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Expert Advisors & trading bots', path: '/bots' },
          ]}
        />
        <p className="eyebrow mt-6">Product</p>
        <h1 className="display-title mt-4 text-5xl font-bold text-fg">Expert Advisors &amp; trading bots</h1>
        <p className="mt-4 max-w-2xl text-muted sm:text-lg">
          Optional MetaTrader Expert Advisors you can study while you{' '}
          <Link to="/courses" className="font-medium text-[#00d181] hover:underline">
            learn MQL4 and MQL5
          </Link>
          . Purchases go through MQL5.com.
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
