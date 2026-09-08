const partners = ['MetaTrader 5', 'MQL5.com', 'MetaQuotes', 'Telegram', 'Forex', 'Indices', 'Gold', 'Crypto']

export default function LogoMarquee() {
  const loop = [...partners, ...partners]

  return (
    <section className="border-y border-line py-6">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <p className="text-sm text-muted">Learn on MetaTrader 5, the platform you already use</p>
      </div>
      <div className="logo-marquee mt-4">
        <div className="logo-marquee-track">
          {loop.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="mx-8 shrink-0 text-lg font-semibold tracking-tight text-fg/35 sm:mx-12 sm:text-xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
