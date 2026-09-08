import { Link } from 'react-router-dom'

export default function StatusPage({
  code,
  title,
  message,
  primaryTo = '/',
  primaryLabel = 'Back home',
  secondaryTo,
  secondaryLabel,
  onRetry,
  useAnchors = false,
}) {
  const Primary = useAnchors ? 'a' : Link
  const Secondary = useAnchors ? 'a' : Link
  const primaryProps = useAnchors ? { href: primaryTo } : { to: primaryTo }
  const secondaryProps = useAnchors ? { href: secondaryTo } : { to: secondaryTo }

  return (
    <section className="flex min-h-[60vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-lg text-center">
        {code && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00d181]">{code}</p>
        )}
        <h1 className="mt-4 text-3xl font-bold text-fg sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-7 text-muted">{message}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-w-[140px] items-center justify-center rounded-full bg-[#00d181] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
            >
              Try again
            </button>
          )}
          <Primary
            {...primaryProps}
            className={`inline-flex min-w-[140px] items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              onRetry
                ? 'border border-line text-fg hover:border-[#00d181]/40 hover:text-[#00d181]'
                : 'bg-[#00d181] text-[#0b0e11] hover:bg-[#00e891]'
            }`}
          >
            {primaryLabel}
          </Primary>
          {secondaryTo && (
            <Secondary
              {...secondaryProps}
              className="inline-flex min-w-[140px] items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181]"
            >
              {secondaryLabel}
            </Secondary>
          )}
        </div>
      </div>
    </section>
  )
}
