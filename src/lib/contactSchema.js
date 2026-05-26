import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Au moins 2 caractères').max(80, 'Maximum 80 caractères'),
  email: z.string().email('Adresse e-mail invalide'),
  subject: z.string().min(4, 'Au moins 4 caractères').max(120, 'Maximum 120 caractères'),
  message: z.string().min(20, 'Au moins 20 caractères').max(2000, 'Maximum 2000 caractères'),
})
