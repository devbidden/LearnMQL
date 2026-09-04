import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as enrollmentService from '../services/enrollmentService'
import { useProgress } from '../hooks/useProgress'
import PageLoader from '../components/ui/PageLoader'

export default function PaymentCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { refresh } = useProgress()
  const [error, setError] = useState('')

  useEffect(() => {
    const reference =
      searchParams.get('checkout_id') ||
      searchParams.get('reference') ||
      searchParams.get('trxref')
    if (!reference) {
      setError('Missing payment reference. Please try checkout again.')
      return
    }

    let cancelled = false
    enrollmentService
      .verifyPayment(reference)
      .then(async (data) => {
        if (cancelled) return
        await refresh()
        const course = data.enrollment?.course
        const slug = typeof course === 'object' ? course.slug : null
        navigate(slug ? `/dashboard/courses/${slug}` : '/dashboard', { replace: true })
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Payment could not be verified.')
      })

    return () => {
      cancelled = true
    }
  }, [navigate, refresh, searchParams])

  if (error) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="text-2xl font-bold text-fg">Payment not completed</h1>
        <p className="mt-4 text-sm text-red-400">{error}</p>
        <Link to="/courses" className="mt-8 inline-block text-[#00d181] hover:underline">
          Back to courses
        </Link>
      </section>
    )
  }

  return <PageLoader label="Confirming your payment…" />
}
