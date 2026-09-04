import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TrendingUp } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'

export default function ResetPassword() {
    const [form, setForm] = useState({ password: '', confirmPassword: '' })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { resetPassword } = useAuth()
    const { token } = useParams()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setMessage('')
        setSubmitting(true)
        try {
            const data = await resetPassword(token, form.password, form.confirmPassword)
            setMessage(data.message)
            setTimeout(() => navigate('/login'), 1500)
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
                    <h1 className="mt-6 text-3xl font-bold text-fg">Reset password</h1>
                    <p className="mt-2 text-muted">Choose a new password for your account</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                    {error && (
                        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </p>
                    )}
                    {message && (
                        <p className="rounded-lg border border-[#00d181]/30 bg-[#00d181]/10 px-4 py-3 text-sm text-[#00d181]">
                            {message}
                        </p>
                    )}

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-muted">
                            New password
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

                    <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-muted">
                            Confirm password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            required
                            minLength={8}
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                            className="w-full rounded-lg border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? (
                            <>
                                <Spinner className="h-4 w-4" />
                                Resetting…
                            </>
                        ) : (
                            'Reset password'
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-muted">
                    Remembered your password?{' '}
                    <Link to="/login" className="font-medium text-[#00d181] hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    )
}
