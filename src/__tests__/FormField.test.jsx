import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FormField from '../components/ui/FormField'
import Input from '../components/ui/Input'

describe('FormField', () => {
  it('affiche le label associé au champ', () => {
    render(
      <FormField label="Votre nom" htmlFor="test-name">
        <Input id="test-name" />
      </FormField>
    )
    expect(screen.getByLabelText('Votre nom')).toBeInTheDocument()
  })

  it('affiche un astérisque quand required=true', () => {
    render(
      <FormField label="E-mail" htmlFor="test-email" required>
        <Input id="test-email" />
      </FormField>
    )
    // L'astérisque est aria-hidden — on vérifie sa présence dans le DOM
    const asterisk = document.querySelector('[aria-hidden="true"]')
    expect(asterisk).toHaveTextContent('*')
  })

  it("n'affiche pas d'astérisque quand required est absent", () => {
    render(
      <FormField label="Champ optionnel" htmlFor="test-opt">
        <Input id="test-opt" />
      </FormField>
    )
    const asterisk = document.querySelector('[aria-hidden="true"]')
    expect(asterisk).toBeNull()
  })

  it('affiche le texte hint quand fourni', () => {
    render(
      <FormField label="Message" htmlFor="test-msg" hint="Entre 20 et 2000 caractères">
        <Input id="test-msg" />
      </FormField>
    )
    expect(screen.getByText('Entre 20 et 2000 caractères')).toBeInTheDocument()
  })

  it("n'affiche pas de hint quand absent", () => {
    render(
      <FormField label="Sujet" htmlFor="test-subj">
        <Input id="test-subj" />
      </FormField>
    )
    // Pas de paragraphe de hint
    expect(screen.queryByRole('paragraph')).toBeNull()
  })

  it("affiche le message d'erreur quand error est fourni", () => {
    render(
      <FormField label="E-mail" htmlFor="test-err" error="Adresse e-mail invalide">
        <Input id="test-err" error />
      </FormField>
    )
    expect(screen.getByText('Adresse e-mail invalide')).toBeInTheDocument()
  })

  it("n'affiche pas de message d'erreur quand error est absent", () => {
    render(
      <FormField label="Nom" htmlFor="test-noerr">
        <Input id="test-noerr" />
      </FormField>
    )
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('passe errorId au children via render prop', () => {
    let receivedErrorId = null
    render(
      <FormField label="Nom" htmlFor="test-rp" error="Requis">
        {({ errorId }) => {
          receivedErrorId = errorId
          return <Input id="test-rp" aria-describedby={errorId} />
        }}
      </FormField>
    )
    expect(receivedErrorId).toBe('test-rp-error')
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'test-rp-error')
  })

  it("passe errorId=undefined au render prop quand pas d'erreur", () => {
    let receivedErrorId = 'sentinel'
    render(
      <FormField label="Nom" htmlFor="test-noerr2">
        {({ errorId }) => {
          receivedErrorId = errorId
          return <Input id="test-noerr2" />
        }}
      </FormField>
    )
    expect(receivedErrorId).toBeUndefined()
  })
})
