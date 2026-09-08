import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeader({ eyebrow, title, subtitle, linkTo, linkLabel = 'View all' }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="display-title mt-3 text-3xl font-bold text-fg sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-sm leading-6 text-muted sm:text-base">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition hover:text-[#00d181]"
        >
          {linkLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  )
}
