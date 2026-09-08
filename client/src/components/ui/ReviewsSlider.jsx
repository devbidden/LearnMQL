import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ReviewsSlider({ reviews }) {
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (next) => {
      setIndex((current) => (next + reviews.length) % reviews.length)
    },
    [reviews.length],
  )

  useEffect(() => {
    if (reviews.length <= 1) return
    const timer = setInterval(() => goTo(index + 1), 7000)
    return () => clearInterval(timer)
  }, [index, goTo, reviews.length])

  if (reviews.length === 0) return null

  const review = reviews[index]
  const next = reviews[(index + 1) % reviews.length]

  return (
    <div className="relative">
      <div className="grid gap-6 lg:grid-cols-2">
        <figure className="rounded-[1.75rem] border border-line bg-card p-8 sm:p-10">
          <blockquote className="text-xl font-medium leading-8 tracking-tight text-fg sm:text-2xl">
            “{review.quote}”
          </blockquote>
          <figcaption className="mt-8">
            <p className="font-semibold text-fg">{review.name}</p>
            <p className="mt-1 text-sm text-muted">{review.role}</p>
          </figcaption>
        </figure>
        {next && (
          <figure className="hidden rounded-[1.75rem] border border-line bg-card/70 p-8 sm:p-10 lg:block">
            <blockquote className="text-xl font-medium leading-8 tracking-tight text-fg sm:text-2xl">
              “{next.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-semibold text-fg">{next.name}</p>
              <p className="mt-1 text-sm text-muted">{next.role}</p>
            </figcaption>
          </figure>
        )}
      </div>

      {reviews.length > 1 && (
        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous review"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next review"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181]"
          >
            <ChevronRight size={18} />
          </button>
          <div className="ml-2 flex gap-2">
            {reviews.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#00d181]' : 'w-3 bg-[#4b5563] hover:bg-[#6b7280]'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
