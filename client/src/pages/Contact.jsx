import { useState } from 'react'
import { Send } from 'lucide-react'
import Spinner from '../components/ui/Spinner'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message || 'Could not send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-lg px-5 lg:px-8">
        <div className="text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="display-title mt-4 text-5xl font-bold text-fg">Get in touch</h1>
          <p className="mt-4 text-muted">Have a question? Send us a message.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-muted">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
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
              className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-muted">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              placeholder="How can we help?"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm text-fg outline-none placeholder:text-muted focus:border-[#00d181]/50"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00d181] px-6 py-3 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? <Spinner className="h-4 w-4" /> : <Send size={16} />}
            {submitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
