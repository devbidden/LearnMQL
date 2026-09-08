function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function wrapName(name) {
  const text = String(name || 'Student').trim() || 'Student'
  if (text.length <= 28) return { line1: text, line2: '' }
  const parts = text.split(' ')
  const mid = Math.ceil(parts.length / 2)
  return { line1: parts.slice(0, mid).join(' '), line2: parts.slice(mid).join(' ') }
}

function certificateId(name, courseTitle) {
  const seed = `${name}|${courseTitle}`
  let hash = 2166136261
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return `LM-${(hash >>> 0).toString(36).toUpperCase().padStart(8, 'X').slice(0, 8)}`
}

export function buildCertificateSvg({ name, courseTitle, dateLabel }) {
  const { line1, line2 } = wrapName(name)
  const title = escapeXml(courseTitle || 'LearnMQL5 Program')
  const date = escapeXml(dateLabel)
  const n1 = escapeXml(line1)
  const n2 = escapeXml(line2)
  const id = certificateId(name, courseTitle)
  const nameSize = (line1 + line2).length > 22 ? 54 : 68
  const nameY = n2 ? 390 : 418
  const bodyY = n2 ? 500 : 490
  const courseY = n2 ? 612 : 590

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1131" viewBox="0 0 1600 1131">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0e11"/>
      <stop offset="55%" stop-color="#10151c"/>
      <stop offset="100%" stop-color="#0c1a16"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5cffc0"/>
      <stop offset="50%" stop-color="#00d181"/>
      <stop offset="100%" stop-color="#00b86e"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00d181" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#00d181" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00d181" stop-opacity="0.04"/>
    </linearGradient>
    <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00d181" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#00d181" stop-opacity="0.04"/>
    </linearGradient>
    <linearGradient id="seal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12e394"/>
      <stop offset="100%" stop-color="#067a52"/>
    </linearGradient>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0 H0 V42" fill="none" stroke="#00d181" stroke-width="0.7" opacity="0.08"/>
    </pattern>
    <filter id="glow" x="-40%" y="-20%" width="180%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#00d181" flood-opacity="0.45"/>
    </filter>
  </defs>

  <rect width="1600" height="1131" fill="url(#bg)"/>
  <rect width="1600" height="1131" fill="url(#grid)"/>
  <rect x="28" y="28" width="1544" height="1075" fill="none" stroke="#00d181" stroke-opacity="0.22" stroke-width="1.5"/>
  <rect x="44" y="44" width="1512" height="1043" fill="none" stroke="#00d181" stroke-opacity="0.55" stroke-width="1"/>

  <g opacity="0.95" transform="translate(1180, -40)">
    <circle cx="280" cy="210" r="210" fill="url(#mark)"/>
    <circle cx="280" cy="210" r="148" fill="none" stroke="#00d181" stroke-width="18" stroke-opacity="0.22"/>
    <circle cx="280" cy="210" r="96" fill="none" stroke="#00d181" stroke-width="10" stroke-opacity="0.35"/>
    <path d="M280 40 A170 170 0 0 1 450 210" fill="none" stroke="#00d181" stroke-width="28" stroke-linecap="round" opacity="0.55"/>
    <path d="M280 70 A140 140 0 0 1 420 210" fill="none" stroke="#5cffc0" stroke-width="14" stroke-linecap="round" opacity="0.4"/>
    <path d="M110 210 A170 170 0 0 1 280 40" fill="none" stroke="#00b86e" stroke-width="10" stroke-linecap="round" opacity="0.35"/>
  </g>

  <text x="800" y="168" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="600" letter-spacing="10" fill="#9ca3af">COURSE CERTIFICATE</text>

  <text x="800" y="300" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" fill="#9ca3af">This is to certify that</text>

  <text x="800" y="${nameY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${nameSize}" font-weight="700" fill="#f8fafc">${n1}</text>
  ${n2 ? `<text x="800" y="${nameY + 68}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${nameSize}" font-weight="700" fill="#f8fafc">${n2}</text>` : ''}

  <text x="800" y="${bodyY}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#9ca3af">has successfully completed the course by demonstrating theoretical</text>
  <text x="800" y="${bodyY + 28}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="18" fill="#9ca3af">and practical understanding of</text>

  <text x="800" y="${courseY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="36" font-weight="700" fill="#f8fafc">${title}</text>
  <text x="800" y="${courseY + 42}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="16" fill="#00d181">MQL5 · Expert Advisors · risk-first automation</text>

  <path d="M0 820 L420 1131 H0 Z" fill="url(#stripe)"/>

  <g transform="translate(168, 868)">
    <circle r="86" fill="url(#seal)" filter="url(#glow)"/>
    <circle r="74" fill="none" stroke="#f8fafc" stroke-width="2" stroke-dasharray="3 7" opacity="0.85"/>
    <circle r="62" fill="none" stroke="#0b0e11" stroke-width="1.5" opacity="0.35"/>
    <text y="-8" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="2.2" fill="#f8fafc">COURSE</text>
    <text y="14" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" letter-spacing="2.2" fill="#f8fafc">COMPLETED</text>
    <text y="38" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#f8e7a8">★★★★★</text>
  </g>

  <g transform="translate(800, 980)">
    <text y="0" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="800" fill="#f8fafc">Learn<tspan fill="#00d181">MQL5</tspan></text>
    <text y="28" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" fill="#9ca3af">Certificate ${id}</text>
    <text y="50" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" fill="#9ca3af">Issued ${date}</text>
  </g>

  <g transform="translate(1288, 930)">
    <path d="M-90 8 C-50 -28, -10 24, 28 -10 S 78 22, 110 2" fill="none" stroke="#00d181" stroke-width="2.4" stroke-linecap="round"/>
    <text y="36" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="#f8fafc">Instructor</text>
    <text y="56" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#9ca3af">LearnMQL5</text>
  </g>
</svg>`
}

export async function downloadCertificate({ name, courseTitle, fileName }) {
  const dateLabel = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const svg = buildCertificateSvg({ name, courseTitle, dateLabel })
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  await new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 1600
      canvas.height = 1131
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#0b0e11'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0)
      canvas.toBlob((png) => {
        URL.revokeObjectURL(url)
        if (!png) {
          reject(new Error('Could not create certificate image'))
          return
        }
        const link = document.createElement('a')
        link.href = URL.createObjectURL(png)
        link.download = fileName || `LearnMQL5-Certificate.png`
        link.click()
        URL.revokeObjectURL(link.href)
        resolve()
      }, 'image/png')
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not render certificate'))
    }
    image.src = url
  })
}
