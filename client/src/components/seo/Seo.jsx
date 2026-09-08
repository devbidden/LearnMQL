import { useLocation } from 'react-router-dom'
import { SITE, absoluteUrl, pageTitle } from '../../seo/site'

export default function Seo({
  title,
  description = SITE.description,
  path,
  noindex = false,
  type = 'website',
  image,
  jsonLd,
}) {
  const location = useLocation()
  const pathname = (path ?? location.pathname).split('?')[0] || '/'
  const canonical = absoluteUrl(pathname)
  const fullTitle = pageTitle(title)
  const ogImage = image ? absoluteUrl(image) : SITE.ogImage
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="author" content={SITE.name} />
      <meta name="theme-color" content="#0b0e11" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={fullTitle} />
      {SITE.twitter ? <meta name="twitter:site" content={SITE.twitter} /> : null}

      {jsonLd
        ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean).map((payload, index) => (
            <script
              key={payload['@type'] || index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
            />
          ))
        : null}
    </>
  )
}
