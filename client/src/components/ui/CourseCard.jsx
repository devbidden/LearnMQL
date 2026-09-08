import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function CourseCard({ course, showPrice = true }) {
  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-card">
      <div className="flex h-44 items-center justify-center border-b border-line bg-[radial-gradient(ellipse_at_center,rgba(0,209,129,0.12),transparent_70%)]">
        <GraduationCap className="h-12 w-12 text-[#4b5563] transition group-hover:text-[#00d181]/70" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight text-fg">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted">{course.description}</p>

        {showPrice && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-lg font-bold text-[#00d181]">
              ${course.price.toFixed(2)}
            </span>
            <Link
              to={`/courses/${course.slug}`}
              className="rounded-full bg-[#00d181] px-4 py-2 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
            >
              View details
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
