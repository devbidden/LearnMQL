import { Link } from 'react-router-dom'
import { Mail, TrendingUp } from 'lucide-react'
import { footerLinks, telegramUrl } from '../../data/mockData'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-page">
      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 text-fg">
              <TrendingUp className="h-5 w-5 text-[#00d181]" strokeWidth={2.5} />
              <span className="text-lg font-bold tracking-tight">
                Learn<span className="text-[#00d181]">MQL5</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Premium trading bots and coding courses to help you automate and master the markets.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-fg">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-muted transition hover:text-[#00d181]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-fg">Connect</h4>
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
              className="mt-3 inline-flex items-center gap-2 text-sm text-muted transition hover:text-[#2AABEE]"
            >
              Telegram community
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-8 text-center text-sm text-muted">
          © {new Date().getFullYear()} LearnMQL5. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
