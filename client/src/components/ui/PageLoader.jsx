import Spinner from './Spinner'

export default function PageLoader({ label = 'Loading…' }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5" role="status" aria-live="polite">
      <Spinner className="h-8 w-8 text-[#00d181]" />
      <p className="text-sm text-muted">{label}</p>
    </section>
  )
}
