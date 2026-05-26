import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(4).max(120),
  message: z.string().min(20).max(2000),
})

// Rate limiting in-memory (best-effort, resets on cold start)
const rateMap = new Map()
const RATE_WINDOW_MS = 30_000
const RATE_LIMIT = 1

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT) return true

  entry.count += 1
  return false
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  // Rate limiting par IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Trop de requêtes. Réessayez dans 30 secondes.' })
  }

  // Validation
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'Données invalides.' })
  }

  const { name, email, subject, message } = parsed.data

  // Honeypot vérifié côté client — double vérification si transmis
  if (req.body.website) {
    return res.status(200).json({ ok: true })
  }

  const apiKey = process.env.MAILJET_API_KEY
  const apiSecret = process.env.MAILJET_API_SECRET
  const fromEmail = process.env.MAILJET_FROM_EMAIL
  const toEmail = process.env.MAILJET_TO_EMAIL

  if (!apiKey || !apiSecret || !fromEmail || !toEmail) {
    console.error('Mailjet env vars manquantes')
    return res.status(500).json({ ok: false, error: 'Configuration serveur incorrecte.' })
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  const body = {
    Messages: [
      {
        From: { Email: fromEmail, Name: 'Portfolio Contact' },
        To: [{ Email: toEmail, Name: 'Lucas Marie-Anne' }],
        ReplyTo: { Email: email, Name: name },
        Subject: `[Portfolio] ${subject}`,
        TextPart: `De : ${name} <${email}>\n\n${message}`,
        HTMLPart: `<p><strong>De :</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br>')}</p>`,
      },
    ],
  }

  try {
    const mjRes = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!mjRes.ok) {
      const text = await mjRes.text()
      console.error('Mailjet error:', text)
      return res.status(502).json({ ok: false, error: "Erreur lors de l'envoi de l'e-mail." })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('fetch error:', err)
    return res.status(500).json({ ok: false, error: 'Erreur serveur inattendue.' })
  }
}
