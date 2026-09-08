import { SITE, absoluteUrl } from './site'
import { courseTeaches } from './courseMeta'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    url: SITE.origin,
    email: SITE.email,
    description: SITE.description,
    logo: absoluteUrl('/favicon.svg'),
    sameAs: ['https://t.me/learnmql5'],
    knowsAbout: [
      'MQL4',
      'MQL5',
      'MetaTrader',
      'Expert Advisors',
      'algorithmic trading',
      'automated trading',
    ],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.origin,
    description: SITE.description,
    inLanguage: 'en',
    publisher: {
      '@type': 'EducationalOrganization',
      name: SITE.name,
      url: SITE.origin,
    },
  }
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function courseListJsonLd(courses) {
  if (!courses?.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'MQL4 and MQL5 courses',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/courses/${course.slug}`),
      name: course.title,
    })),
  }
}

export function courseJsonLd(course) {
  if (!course) return null
  const url = absoluteUrl(`/courses/${course.slug}`)
  const instance = {
    '@type': 'CourseInstance',
    courseMode: 'online',
    inLanguage: 'en',
  }
  if (typeof course.price === 'number') {
    instance.offers = {
      '@type': 'Offer',
      price: Number(course.price).toFixed(2),
      priceCurrency: 'USD',
      url,
      availability: 'https://schema.org/InStock',
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description || SITE.description,
    url,
    educationalLevel: course.level || undefined,
    teaches: courseTeaches(course),
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE.name,
      url: SITE.origin,
    },
    hasCourseInstance: instance,
  }
}
