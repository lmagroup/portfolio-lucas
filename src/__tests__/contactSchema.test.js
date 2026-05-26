import { describe, it, expect } from 'vitest'
import { contactSchema } from '../lib/contactSchema'

const VALID = {
  name: 'Jean Dupont',
  email: 'jean@exemple.com',
  subject: 'Proposition de mission',
  message: "Bonjour, je souhaite discuter d'un projet React pour mon équipe.",
}

function parse(data) {
  return contactSchema.safeParse(data)
}

describe('contactSchema', () => {
  it('accepte des données valides', () => {
    const result = parse(VALID)
    expect(result.success).toBe(true)
  })

  // ─── name ───────────────────────────────────────────────────────────────────

  it('rejette un nom trop court (< 2 caractères)', () => {
    const result = parse({ ...VALID, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejette un nom trop long (> 80 caractères)', () => {
    const result = parse({ ...VALID, name: 'A'.repeat(81) })
    expect(result.success).toBe(false)
  })

  it('accepte un nom de 2 caractères (limite basse)', () => {
    const result = parse({ ...VALID, name: 'Jo' })
    expect(result.success).toBe(true)
  })

  // ─── email ──────────────────────────────────────────────────────────────────

  it('rejette un e-mail invalide', () => {
    const result = parse({ ...VALID, email: 'pas-un-email' })
    expect(result.success).toBe(false)
  })

  it('rejette un e-mail sans domaine', () => {
    const result = parse({ ...VALID, email: 'user@' })
    expect(result.success).toBe(false)
  })

  it('accepte un e-mail valide avec sous-domaine', () => {
    const result = parse({ ...VALID, email: 'user@mail.example.co.uk' })
    expect(result.success).toBe(true)
  })

  // ─── subject ────────────────────────────────────────────────────────────────

  it('rejette un sujet trop court (< 4 caractères)', () => {
    const result = parse({ ...VALID, subject: 'Hi' })
    expect(result.success).toBe(false)
  })

  it('rejette un sujet trop long (> 120 caractères)', () => {
    const result = parse({ ...VALID, subject: 'X'.repeat(121) })
    expect(result.success).toBe(false)
  })

  it('accepte un sujet de 4 caractères (limite basse)', () => {
    const result = parse({ ...VALID, subject: 'Test' })
    expect(result.success).toBe(true)
  })

  // ─── message ────────────────────────────────────────────────────────────────

  it('rejette un message trop court (< 20 caractères)', () => {
    const result = parse({ ...VALID, message: 'Bonjour!' })
    expect(result.success).toBe(false)
  })

  it('rejette un message trop long (> 2000 caractères)', () => {
    const result = parse({ ...VALID, message: 'A'.repeat(2001) })
    expect(result.success).toBe(false)
  })

  it('accepte un message de 20 caractères (limite basse)', () => {
    const result = parse({ ...VALID, message: 'A'.repeat(20) })
    expect(result.success).toBe(true)
  })

  it('accepte un message de 2000 caractères (limite haute)', () => {
    const result = parse({ ...VALID, message: 'A'.repeat(2000) })
    expect(result.success).toBe(true)
  })

  // ─── champs manquants ───────────────────────────────────────────────────────

  it('rejette si name est manquant', () => {
    // eslint-disable-next-line no-unused-vars
    const { name: _n, ...rest } = VALID
    const result = parse(rest)
    expect(result.success).toBe(false)
  })

  it('rejette si email est manquant', () => {
    // eslint-disable-next-line no-unused-vars
    const { email: _e, ...rest } = VALID
    const result = parse(rest)
    expect(result.success).toBe(false)
  })
})
