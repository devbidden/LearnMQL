import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Spinner from '../components/ui/Spinner'
import BrandLogo from '../components/layout/BrandLogo'

export default function VerifyEmail() {
    const { token } = useParams()
    const { verifyEmail } = useAuth()
    const [status, setStatus] = useState('verifying')
    const [message, setMessage] = useState('')

    useEffect(() => {
        let cancelled = false
        verifyEmail(token)
            .then(() => {
                if (!cancelled) setStatus('success')
            })
            .catch((err) => {
                if (!cancelled) {
                    setStatus('error')
                    setMessage(err.message)
                }
            })
        return () => {
            cancelled = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-5 py-16">
            <div className="w-full max-w-md text-center">
                <BrandLogo compact />

                {status === 'verifying' && (
                    <>
                        <Spinner className="mx-auto mt-6 h-8 w-8" />
                        <h1 className="mt-6 text-2xl font-bold text-fg">Verifying your email…</h1>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle2 className="mx-auto mt-6 h-10 w-10 text-[#00d181]" />
                        <h1 className="mt-6 text-3xl font-bold text-fg">Email verified</h1>
                        <p className="mt-3 text-muted">Your account is now active. You're signed in and ready to go.</p>
                        <Link
                            to="/dashboard"
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
                        >
                            Go to dashboard
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="mx-auto mt-6 h-10 w-10 text-red-400" />
                        <h1 className="mt-6 text-3xl font-bold text-fg">Verification failed</h1>
                        <p className="mt-3 text-muted">{message}</p>
                        <Link
                            to="/login"
                            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891]"
                        >
                            Back to login
                        </Link>
                    </>
                )}
            </div>
        </section>
    )
}
