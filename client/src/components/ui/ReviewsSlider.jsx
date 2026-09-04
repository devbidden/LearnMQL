import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

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
        const timer = setInterval(() => goTo(index + 1), 6000)
        return () => clearInterval(timer)
    }, [index, goTo, reviews.length])

    if (reviews.length === 0) return null

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {reviews.map((review) => (
                        <div key={review.id} className="w-full shrink-0 px-1">
                            <figure className="rounded-2xl border border-line bg-card p-8 text-center sm:p-10">
                                <div className="flex justify-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < review.rating ? 'fill-[#00d181] text-[#00d181]' : 'text-[#4b5563]'}
                                        />
                                    ))}
                                </div>
                                <blockquote className="mx-auto mt-5 max-w-2xl text-base leading-7 text-fg sm:text-lg">
                                    "{review.quote}"
                                </blockquote>
                                <figcaption className="mt-6">
                                    <p className="font-semibold text-fg">{review.name}</p>
                                    <p className="text-sm text-muted">{review.role}</p>
                                </figcaption>
                            </figure>
                        </div>
                    ))}
                </div>
            </div>

            {reviews.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        aria-label="Previous review"
                        className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-line bg-card p-2 text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181] sm:flex"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        aria-label="Next review"
                        className="absolute right-0 top-1/2 hidden translate-x-4 -translate-y-1/2 rounded-full border border-line bg-card p-2 text-fg transition hover:border-[#00d181]/40 hover:text-[#00d181] sm:flex"
                    >
                        <ChevronRight size={18} />
                    </button>

                    <div className="mt-6 flex justify-center gap-2">
                        {reviews.map((review, i) => (
                            <button
                                key={review.id}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to review ${i + 1}`}
                                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-[#00d181]' : 'w-2 bg-[#4b5563] hover:bg-[#6b7280]'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
