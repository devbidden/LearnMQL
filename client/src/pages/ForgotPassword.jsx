import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'
import BrandLogo from '../components/layout/BrandLogo'
import Seo from '../components/seo/Seo'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const { forgotPassword } = useAuth()

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setMessage('')
        setSubmitting(true)
        try {
            const data = await forgotPassword(email)
            setMessage(data.message)
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-5 py-16">
            <Seo title="Forgot password" description="Reset your LearnMQL5 password." noindex />
            <div className="w-full max-w-md">
                <div className="text-center">
                    <BrandLogo compact />
                    <h1 className="mt-6 text-3xl font-bold text-fg">Forgot password</h1>
                    <p className="mt-2 text-muted">We&apos;ll send you a reset link</p>
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
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-muted">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
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
                                Sending…
                            </>
                        ) : (
                            'Send reset link'
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
