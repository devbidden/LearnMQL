import { ArrowRight, Bot } from 'lucide-react'

export default function BotCard({ bot }) {
  return (
    <article className="card-hover flex flex-col rounded-xl border border-line bg-card p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#00d181]/10">
            <Bot className="h-5 w-5 text-[#00d181]" />
          </div>
          <h3 className="text-lg font-semibold text-fg">{bot.name}</h3>
        </div>
        {bot.featured && (
          <span className="shrink-0 rounded-full bg-[#f59e0b]/15 px-2.5 py-0.5 text-xs font-medium text-[#f59e0b]">
            Featured
          </span>
        )}
      </div>

      <p className="mb-6 flex-1 text-sm leading-6 text-muted">{bot.description}</p>

      <a
        href={bot.mql5Url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-transparent px-4 py-2.5 text-sm font-medium text-fg transition hover:border-[#00d181]/50 hover:bg-white/5"
      >
        View on MQL5
        <ArrowRight size={16} />
      </a>
    </article>
  )
}
