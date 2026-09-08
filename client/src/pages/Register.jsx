import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'
import BrandLogo from '../components/layout/BrandLogo'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(form)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <BrandLogo compact />
          <h1 className="mt-6 text-3xl font-bold text-fg">Create an account</h1>
          <p className="mt-2 text-muted">Start your trading journey</p>
        </div>

        <p className="mt-6 rounded-lg border border-[#00d181]/20 bg-[#00d181]/5 px-4 py-3 text-center text-xs text-muted">
          We'll send a verification link to your email. You can sign in right away, but you'll need to verify
          your email before enrolling in a course.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Your full name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Spinner className="h-4 w-4" />
                Creating account…
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#00d181] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}
