
const partners = [
  {
    name: 'Python',
    logo: 'https://cdn.simpleicons.org/python',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.simpleicons.org/nodedotjs',
  },
  {
    name: 'MetaQuotes',
    logo: 'https://cdn.simpleicons.org/github',
  },
  {
    name: 'TradingView',
    logo: 'https://cdn.simpleicons.org/tradingview',
  },
]

export default function LogoMarquee() {
  const loop = [...partners, ...partners]

  return (
    <section className="border-y border-line py-7">
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {loop.map((partner, index) => (
            <div
              key={`${ partner.name } -${ index } `}
              className="mx-10 flex h-10 w-12 shrink-0 items-center justify-center sm:mx-16"
            >
              <img
                src={partner.logo}
                alt=""
                className="h-8 w-8 opacity-45 grayscale brightness-0 invert transition-opacity duration-300 hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

