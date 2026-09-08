import { ArrowRight, Bot } from 'lucide-react'

export default function BotCard({ bot }) {
  return (
    <article className="card-hover flex flex-col rounded-[1.5rem] border border-line bg-card p-8">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00d181]/10">
            <Bot className="h-5 w-5 text-[#00d181]" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-fg">{bot.name}</h3>
        </div>
        {bot.featured && (
          <span className="shrink-0 rounded-full bg-[#f59e0b]/15 px-2.5 py-0.5 text-xs font-medium text-[#f59e0b]">
            Featured
          </span>
        )}
      </div>

      <p className="mb-8 flex-1 text-sm leading-6 text-muted">{bot.description}</p>

      <a
        href={bot.mql5Url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-fg transition hover:border-[#00d181]/50 hover:bg-[#00d181]/5"
      >
        View {bot.name} on MQL5
        <ArrowRight size={16} />
      </a>
    </article>
  )
}
