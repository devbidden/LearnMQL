import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as enrollmentService from '../services/enrollmentService'
import { useProgress } from '../hooks/useProgress'
import PageLoader from '../components/ui/PageLoader'
import Seo from '../components/seo/Seo'

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
        <Seo title="Payment" description="Payment status for your LearnMQL5 enrollment." noindex />
        <h1 className="text-2xl font-bold text-fg">Payment not completed</h1>
        <p className="mt-4 text-sm text-red-400">{error}</p>
        <Link to="/courses" className="mt-8 inline-block text-[#00d181] hover:underline">
          Back to courses
        </Link>
      </section>
    )
  }

  return (
    <>
      <Seo title="Payment" description="Confirming your LearnMQL5 payment." noindex />
      <PageLoader label="Confirming your payment…" />
    </>
  )
}
