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

export function buildCertificateSvg({ name, courseTitle, dateLabel }) {
  const { line1, line2 } = wrapName(name)
  const title = escapeXml(courseTitle || 'LearnMQL5 Program')
  const date = escapeXml(dateLabel)
  const n1 = escapeXml(line1)
  const n2 = escapeXml(line2)
  const nameY = n2 ? 520 : 545
  const nameSize = (line1 + line2).length > 22 ? 52 : 64

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1131" viewBox="0 0 1600 1131">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fbf6ea"/>
      <stop offset="50%" stop-color="#f4ead2"/>
      <stop offset="100%" stop-color="#efe2c4"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8e7a8"/>
      <stop offset="45%" stop-color="#c9a227"/>
      <stop offset="100%" stop-color="#8a6a12"/>
    </linearGradient>
    <linearGradient id="seal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12d48a"/>
      <stop offset="100%" stop-color="#067a52"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#8a6a12" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="1600" height="1131" fill="url(#bg)"/>
  <rect x="38" y="38" width="1524" height="1055" fill="none" stroke="url(#gold)" stroke-width="14"/>
  <rect x="62" y="62" width="1476" height="1007" fill="none" stroke="#c9a227" stroke-width="2.5"/>
  <rect x="78" y="78" width="1444" height="975" fill="none" stroke="#0b3d2e" stroke-width="1" opacity="0.35"/>

  <path d="M110 110 h90 v18 h-72 v72 h-18 z" fill="url(#gold)"/>
  <path d="M1490 110 h-90 v18 h72 v72 h18 z" fill="url(#gold)"/>
  <path d="M110 1021 h90 v-18 h-72 v-72 h-18 z" fill="url(#gold)"/>
  <path d="M1490 1021 h-90 v-18 h72 v-72 h18 z" fill="url(#gold)"/>

  <circle cx="800" cy="188" r="58" fill="url(#seal)" filter="url(#soft)"/>
  <circle cx="800" cy="188" r="48" fill="none" stroke="#f8e7a8" stroke-width="2"/>
  <text x="800" y="176" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#fbf6ea" letter-spacing="3">LEARN</text>
  <text x="800" y="204" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="700" fill="#fbf6ea">MQL5</text>

  <text x="800" y="290" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="10" fill="#8a6a12">CERTIFICATE OF COMPLETION</text>
  <path d="M560 318 H1040" stroke="url(#gold)" stroke-width="2"/>
  <circle cx="560" cy="318" r="4" fill="#c9a227"/>
  <circle cx="1040" cy="318" r="4" fill="#c9a227"/>

  <text x="800" y="390" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" font-style="italic" fill="#4a3f2a">This is to certify that</text>

  <text x="800" y="${nameY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', Palatino, serif" font-size="${nameSize}" font-style="italic" font-weight="700" fill="#0b3d2e">${n1}</text>
  ${n2 ? `<text x="800" y="${nameY + 64}" text-anchor="middle" font-family="Georgia, 'Times New Roman', Palatino, serif" font-size="${nameSize}" font-style="italic" font-weight="700" fill="#0b3d2e">${n2}</text>` : ''}

  <path d="M430 ${n2 ? 610 : 575} H1170" stroke="#c9a227" stroke-width="1.4" opacity="0.8"/>

  <text x="800" y="${n2 ? 660 : 625}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" fill="#4a3f2a">has successfully completed the program</text>
  <text x="800" y="${n2 ? 720 : 685}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="32" font-weight="700" fill="#0b3d2e">${title}</text>
  <text x="800" y="${n2 ? 770 : 735}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="18" fill="#4a3f2a">demonstrating mastery of practical MQL5 trading systems and risk-first automation.</text>

  <text x="430" y="900" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="16" fill="#8a6a12">DATE</text>
  <text x="430" y="932" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" fill="#0b3d2e">${date}</text>
  <path d="M320 948 H540" stroke="#c9a227" stroke-width="1.2"/>

  <text x="1170" y="900" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="16" fill="#8a6a12">ISSUED BY</text>
  <text x="1170" y="932" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" fill="#0b3d2e">LearnMQL5</text>
  <path d="M1060 948 H1280" stroke="#c9a227" stroke-width="1.2"/>

  <text x="800" y="1020" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="3" fill="#8a6a12">PREMIUM TRADING EDUCATION  ·  AUTOMATED SYSTEMS</text>
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
      ctx.fillStyle = '#f4ead2'
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
