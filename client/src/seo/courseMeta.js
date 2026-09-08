export function detectMqlTrack(text = '') {
  const value = String(text).toLowerCase()
  const mql4 = /\bmql\s*4\b|\bmetatrader\s*4\b|\bmt4\b/.test(value)
  const mql5 = /\bmql\s*5\b|\bmetatrader\s*5\b|\bmt5\b/.test(value)
  if (mql4 && mql5) return 'both'
  if (mql4) return 'mql4'
  if (mql5) return 'mql5'
  return 'general'
}

function truncate(text, max = 155) {
  const value = String(text || '').replace(/\s+/g, ' ').trim()
  if (value.length <= max) return value
  return `${value.slice(0, max - 1).trim()}…`
}

function courseCorpus(course) {
  return [course?.title, course?.description, course?.slug, course?.category, course?.level]
    .filter(Boolean)
    .join(' ')
}

export function coursePageTitle(course) {
  const title = String(course?.title || 'MQL course').trim()
  const track = detectMqlTrack(courseCorpus(course))
  if (/^learn mql/i.test(title)) return title
  if (track === 'mql4') return `Learn MQL4: ${title}`
  if (track === 'mql5') return `Learn MQL5: ${title}`
  if (track === 'both') return `Learn MQL4 & MQL5: ${title}`
  return `${title}: Expert Advisor & trading bot course`
}

export function coursePageDescription(course) {
  const description = String(course?.description || '').trim()
  const track = detectMqlTrack(courseCorpus(course))
  const language =
    track === 'mql4'
      ? 'MQL4 programming for MetaTrader 4'
      : track === 'mql5'
        ? 'MQL5 programming for MetaTrader 5'
        : track === 'both'
          ? 'MQL4 and MQL5 programming for MetaTrader'
          : 'MQL4 and MQL5 programming for MetaTrader'

  if (description.length >= 80) return truncate(description)
  if (description) {
    return truncate(
      `${description} Learn ${language}, Expert Advisor development, and automated trading.`,
    )
  }
  return truncate(
    `Learn ${language}. Build Expert Advisors, indicators, and automated trading strategies with quizzes and a certificate.`,
  )
}

export function courseTeaches(course) {
  const track = detectMqlTrack(courseCorpus(course))
  const teaches = ['algorithmic trading', 'automated trading', 'Expert Advisor development']
  if (track === 'mql4' || track === 'both') teaches.unshift('MQL4 programming')
  if (track === 'mql5' || track === 'both' || track === 'general') teaches.unshift('MQL5 programming')
  return teaches
}
