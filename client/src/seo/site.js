const fallbackOrigin = 'https://www.learnmql.com'

export const SITE = {
  name: 'learnmql',
  tagline: 'MQL4 & MQL5 courses for MetaTrader',
  description:
    'Learn MQL4 and MQL5 programming for MetaTrader. Build Expert Advisors, indicators, and automated trading systems with expert-led courses.',
  origin: (import.meta.env.VITE_SITE_URL || fallbackOrigin).replace(/\/$/, ''),
  email: 'hello@learnmql.com',
  twitter: '@learnmql',
  locale: 'en_US',
  get ogImage() {
    return `${this.origin}/favicon.svg`
  },
}

export function absoluteUrl(path = '/') {
  if (!path) return SITE.origin
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE.origin}${path.startsWith('/') ? path : `/${path}`}`
}

export function pageTitle(title) {
  if (!title) return `${SITE.name} – ${SITE.tagline}`
  if (title.includes(SITE.name)) return title
  return `${title} | ${SITE.name}`
}
