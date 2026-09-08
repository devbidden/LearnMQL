import { Link } from 'react-router-dom'
import { breadcrumbJsonLd } from '../../seo/jsonLd'

export default function Breadcrumbs({ items }) {
  if (!items?.length) return null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(items)) }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const last = index === items.length - 1
            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && <span aria-hidden="true">/</span>}
                {last || !item.path ? (
                  <span className={last ? 'text-fg' : undefined}>{item.name}</span>
                ) : (
                  <Link to={item.path} className="transition hover:text-[#00d181]">
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
