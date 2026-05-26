import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Button from '../components/ui/Button'

describe('Button', () => {
  it('affiche son texte enfant', () => {
    render(<Button>Envoyer</Button>)
    expect(screen.getByRole('button', { name: /envoyer/i })).toBeInTheDocument()
  })

  it('a le type "button" par défaut', () => {
    render(<Button>OK</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('accepte type="submit"', () => {
    render(<Button type="submit">Envoyer</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('est désactivé quand disabled=true', () => {
    render(<Button disabled>Action</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })

  it('est désactivé quand loading=true', () => {
    render(<Button loading>En cours</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-disabled', 'true')
  })

  it('affiche le spinner quand loading=true', () => {
    render(<Button loading>En cours</Button>)
    // Le spinner est un span aria-hidden avec animate-spin
    const spinner = document.querySelector('[aria-hidden="true"]')
    expect(spinner).toBeInTheDocument()
  })

  it('applique une className supplémentaire', () => {
    render(<Button className="w-full">OK</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('applique la variante primary par défaut', () => {
    render(<Button>Primaire</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-brand-500')
  })

  it('applique la variante secondary', () => {
    render(<Button variant="secondary">Secondaire</Button>)
    expect(screen.getByRole('button')).toHaveClass('border')
  })

  it('applique la variante ghost', () => {
    render(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')
  })

  it('applique la taille lg', () => {
    render(<Button size="lg">Grand</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-12')
  })

  it('applique la taille sm', () => {
    render(<Button size="sm">Petit</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-8')
  })
})
