import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { telegramUrl } from '../../data/mockData'
import BrandLogo from './BrandLogo'

const columns = [
  {
    title: 'Product',
    links: [
      { to: '/courses', label: 'MQL4 & MQL5 courses' },
      { to: '/bots', label: 'Expert Advisors & bots' },
      { to: '/register', label: 'Create a free account' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/login', label: 'Log in' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Learn MQL4 and MQL5 programming, Expert Advisors, and automated trading for MetaTrader.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-semibold text-fg">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-sm text-muted transition hover:text-[#00d181]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <p className="text-sm font-semibold text-fg">Connect</p>
            <a
              href="mailto:hello@learnmql5.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[#00d181]"
            >
              <Mail size={16} />
              hello@learnmql5.com
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex text-sm text-muted transition hover:text-[#2AABEE]"
            >
              Telegram community
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LearnMQL5. All rights reserved.</p>
          <p>MQL4 &amp; MQL5 courses for MetaTrader. Bots optional.</p>
        </div>
      </div>
    </footer>
  )
}
