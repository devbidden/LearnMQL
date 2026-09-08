export const bots = [
  {
    id: 'patrex-pro',
    name: 'Patrex Pro',
    description:
      'Advanced trading bot designed to optimize your trading strategies. Features smart entry/exit logic, multi-timeframe analysis, and built-in risk management for consistent performance.',
    featured: true,
    mql5Url: 'https://www.mql5.com',
  },
  {
    id: 'trendmark',
    name: 'TrendMark',
    description:
      'A versatile trading indicator that helps identify high-probability entry points. Combines trend analysis with momentum signals for precise trade timing across any market.',
    featured: false,
    mql5Url: 'https://www.mql5.com',
  },
  {
    id: 'trendline-alerts',
    name: 'TrendLine Alerts',
    description:
      'Multi-functional tool for monitoring price action against trendlines. Get real-time alerts when price approaches, breaks, or bounces off key trendline levels.',
    featured: false,
    mql5Url: 'https://www.mql5.com',
  },
]

export const courses = [
  {
    id: 'mql5-masterclass',
    title: 'MQL5 Programming Masterclass',
    description:
      'Learn to build custom Expert Advisors and indicators from scratch. Covers OOP, backtesting, optimization, and deployment on live accounts.',
    price: 99.0,
    slug: 'mql5-programming-masterclass',
  },
]

export const stats = [
  { label: 'Students', value: '840+' },
  { label: 'Lessons with quizzes', value: '18+' },
  { label: 'Trading experience', value: '5+ yrs' },
  { label: 'Bots available', value: '12+' },
]

export const aboutStats = [
  { label: 'Trading Experience', value: '5+ Years' },
  { label: 'Built & Deployed', value: '12+ Bots' },
  { label: 'Students Taught', value: '840+' },
]

export const reviews = [
  {
    id: 'review-1',
    name: 'Daniel Okafor',
    role: 'MQL5 Masterclass student',
    quote:
      'The course broke down Expert Advisor development in a way that finally made sense. I shipped my first backtested EA in under a month.',
    rating: 5,
  },
  {
    id: 'review-2',
    name: 'Priya Nair',
    role: 'Patrex Pro user',
    quote:
      'Patrex Pro has been running on my live account for three months with consistent, risk-managed results. Support has been excellent too.',
    rating: 5,
  },
  {
    id: 'review-3',
    name: 'Marcus Chen',
    role: 'TrendMark user',
    quote:
      'Clean signals, minimal noise. TrendMark cut through a lot of the guesswork I used to have around entries.',
    rating: 4,
  },
  {
    id: 'review-4',
    name: 'Amara Eze',
    role: 'MQL5 Masterclass student',
    quote:
      'Quizzes after every lesson kept me honest about what I actually understood versus what I just watched. Best structured trading course I have taken.',
    rating: 5,
  },
]

export const features = [
  {
    title: 'Hands-On MQL4 & MQL5 Courses',
    description:
      'Learn MQL4 and MQL5 by building real Expert Advisors. Practical MetaTrader programming, quizzes, and strategy development.',
  },
  {
    title: 'Risk-First Approach',
    description:
      'Every lesson treats risk as part of the system: drawdown limits, position sizing, and code you can audit.',
  },
  {
    title: 'Optional Ready-Made Bots',
    description:
      'Need a working example on the chart? Our Expert Advisors are there as a reference while you learn.',
  },
]

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/bots', label: 'Bots' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const footerLinks = [
  { to: '/bots', label: 'Trading Bots' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const telegramUrl =
  import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/learnmql5'
