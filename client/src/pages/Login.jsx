import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/dashboard'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(form)
      navigate(redirectTo, { replace: true })
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
          <TrendingUp className="mx-auto h-8 w-8 text-[#00d181]" strokeWidth={2.5} />
          <h1 className="mt-6 text-3xl font-bold text-fg">Welcome back</h1>
          <p className="mt-2 text-muted">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

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
              placeholder="••••••••"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
            />
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm font-medium text-[#00d181] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Spinner className="h-4 w-4" />
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-[#00d181] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  )
}
