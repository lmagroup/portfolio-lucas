import PropTypes from 'prop-types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { contactSchema as schema } from '../lib/contactSchema'
import { GithubIcon, LinkedinIcon } from '../components/ui/icons'
import SectionHeader from '../components/ui/SectionHeader'
import FormField from '../components/ui/FormField'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: 'E-mail',
    value: 'business.lucasmarieanne@gmail.com',
    href: 'mailto:business.lucasmarieanne@gmail.com',
  },
  {
    Icon: MapPin,
    label: 'Localisation',
    value: 'Paris, France (remote)',
    href: null,
  },
  {
    Icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/lucasmarieanne',
    href: 'https://github.com/lucasmarieanne',
  },
  {
    Icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/lucas-marie-anne',
    href: 'https://www.linkedin.com/in/lucas-marie-anne/',
  },
]

function StatusMessage({ status, errorMessage }) {
  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-start gap-3 p-4 rounded-xl bg-brand-50 border border-brand-200 text-brand-700"
      >
        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold">Message envoyé !</p>
          <p className="text-sm mt-0.5">
            {'Je vous répondrai dans les plus brefs délais. Merci pour votre message.'}
          </p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700"
      >
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold">Erreur lors de l&apos;envoi</p>
          <p className="text-sm mt-0.5">
            {errorMessage ||
              'Une erreur est survenue. Vous pouvez me contacter directement par e-mail.'}
          </p>
          <a
            href="mailto:business.lucasmarieanne@gmail.com"
            className="text-sm font-medium underline underline-offset-4 hover:text-red-800 transition-colors mt-1 inline-block"
          >
            business.lucasmarieanne@gmail.com
          </a>
        </div>
      </div>
    )
  }

  return <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" />
}

StatusMessage.propTypes = {
  status: PropTypes.oneOf(['idle', 'submitting', 'success', 'error']).isRequired,
  errorMessage: PropTypes.string,
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  async function onSubmit(data) {
    setSubmitStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      let json
      try {
        json = await res.json()
      } catch {
        throw new Error('Réponse serveur invalide.')
      }

      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Erreur serveur')
      }

      setSubmitStatus('success')
      reset()
    } catch (err) {
      setSubmitStatus('error')
      setErrorMessage(err.message || 'Une erreur inattendue est survenue.')
    }
  }

  const isSuccess = submitStatus === 'success'

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20 lg:py-28 bg-neutral-0">
      <div className="container-main">
        <SectionHeader
          eyebrow="Contact"
          title="Travaillons ensemble"
          lead="Un projet, une question, une opportunité ? Je suis disponible et réponds sous 24 h."
          titleAs="h2"
          id="contact-heading"
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Formulaire */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <StatusMessage status="success" />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulaire de contact">
                {/* Honeypot anti-spam — ne jamais afficher à l'utilisateur */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                />

                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label="Nom complet"
                      htmlFor="contact-name"
                      error={errors.name?.message}
                      required
                    >
                      {({ errorId }) => (
                        <Input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jean Dupont"
                          error={!!errors.name}
                          aria-describedby={errorId}
                          {...register('name')}
                        />
                      )}
                    </FormField>

                    <FormField
                      label="Adresse e-mail"
                      htmlFor="contact-email"
                      error={errors.email?.message}
                      required
                    >
                      {({ errorId }) => (
                        <Input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          placeholder="jean@exemple.com"
                          error={!!errors.email}
                          aria-describedby={errorId}
                          {...register('email')}
                        />
                      )}
                    </FormField>
                  </div>

                  <FormField
                    label="Sujet"
                    htmlFor="contact-subject"
                    error={errors.subject?.message}
                    required
                  >
                    {({ errorId }) => (
                      <Input
                        id="contact-subject"
                        type="text"
                        placeholder="Proposition de mission, question..."
                        error={!!errors.subject}
                        aria-describedby={errorId}
                        {...register('subject')}
                      />
                    )}
                  </FormField>

                  <FormField
                    label="Message"
                    htmlFor="contact-message"
                    error={errors.message?.message}
                    required
                    hint="Entre 20 et 2000 caractères"
                  >
                    {({ errorId }) => (
                      <Textarea
                        id="contact-message"
                        rows={6}
                        placeholder="Décrivez votre projet ou votre question..."
                        error={!!errors.message}
                        aria-describedby={errorId}
                        {...register('message')}
                      />
                    )}
                  </FormField>

                  {submitStatus === 'error' && (
                    <StatusMessage status="error" errorMessage={errorMessage} />
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Carte contact */}
          <aside className="lg:col-span-5" aria-label="Informations de contact directes">
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 h-full">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Disponible pour de nouvelles missions
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed mb-8">
                {
                  "Freelance front-end React, ouvert aux missions longue durée et aux postes en CDI. N'hésitez pas à me contacter pour discuter de votre projet."
                }
              </p>

              <ul className="space-y-5" aria-label="Coordonnées">
                {CONTACT_ITEMS.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon className="w-4 h-4 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={cn(
                            'text-sm text-neutral-700 hover:text-brand-600 transition-colors',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 rounded-sm'
                          )}
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-700">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
