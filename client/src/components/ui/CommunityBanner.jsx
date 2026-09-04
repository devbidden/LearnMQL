import { ArrowRight } from 'lucide-react'
import { telegramUrl } from '../../data/mockData'

function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.5 3.4 2.9 10.6c-1.3.5-1.3 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.1.8.7.8.4 0 .6-.2.8-.4l2.5-2.4 5.2 3.8c1 .5 1.7.2 1.9-.9l3.4-16c.3-1.3-.5-1.9-1.2-1.7Zm-3.2 4.3-8.9 8.1-.3 3.5-1.4-4.8 10.6-6.8Z"
      />
    </svg>
  )
}

export default function CommunityBanner({ compact = false }) {
  return (
    <a
      href={telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl border border-[#2AABEE]/30 bg-gradient-to-r from-[#0d2a3a] via-[#123347] to-[#0b3d2e] ${
        compact ? 'p-5' : 'p-6 sm:p-8'
      } transition hover:border-[#2AABEE]/60 hover:shadow-[0_16px_40px_rgba(42,171,238,0.18)]`}
    >
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#2AABEE]/20 blur-3xl transition group-hover:bg-[#2AABEE]/30" />
      <div className="pointer-events-none absolute -bottom-12 left-20 h-32 w-32 rounded-full bg-[#00d181]/15 blur-3xl" />
      <div className={`relative flex flex-col gap-4 ${compact ? 'sm:flex-row sm:items-center sm:justify-between' : 'md:flex-row md:items-center md:justify-between'}`}>
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2AABEE] text-white shadow-lg shadow-[#2AABEE]/30">
            <TelegramIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]">Telegram community</p>
            <h2 className={`mt-1 font-bold text-white ${compact ? 'text-lg' : 'text-2xl'}`}>
              Join the LearnMQL5 community
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-[#c5d7e2]">
              Get bot updates, course drops, and talk strategy with other traders in our Telegram channel.
            </p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-[#2AABEE] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:bg-[#3bb6f5] md:self-center">
          Join channel
          <ArrowRight size={16} />
        </span>
      </div>
    </a>
  )
}
