import { useMemo, useState } from 'react'
import { Award, Download } from 'lucide-react'
import { buildCertificateSvg, downloadCertificate } from '../../utils/certificate'

export default function CertificateCard({ name, courseTitle }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const preview = useMemo(() => {
    const dateLabel = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    return buildCertificateSvg({ name, courseTitle, dateLabel }).replace(/^<\?xml[^>]*>\s*/, '')
  }, [name, courseTitle])

  async function handleDownload() {
    setError('')
    setBusy(true)
    try {
      const safe = String(courseTitle || 'course')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      await downloadCertificate({
        name,
        courseTitle,
        fileName: `LearnMQL5-${safe || 'certificate'}.png`,
      })
    } catch (err) {
      setError(err.message || 'Download failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#00d181]/25 bg-card p-6 shadow-[0_20px_50px_rgba(0,209,129,0.08)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#00d181]">
            <Award size={14} />
            Program complete
          </p>
          <h2 className="mt-3 text-2xl font-bold text-fg">Your certificate is ready</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Awarded to <span className="font-semibold text-fg">{name}</span> for completing{' '}
            <span className="font-semibold text-fg">{courseTitle}</span>. Download a print-ready PNG to share or keep.
          </p>
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          <button
            type="button"
            onClick={handleDownload}
            disabled={busy}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#00d181] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#00e891] disabled:opacity-60"
          >
            <Download size={16} />
            {busy ? 'Preparing…' : 'Download certificate'}
          </button>
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-line bg-[#0b0e11] shadow-xl lg:max-w-sm">
          <div
            className="certificate-preview aspect-[1600/1131] w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      </div>
    </div>
  )
}
