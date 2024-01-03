import z from 'zod'

export const addSchema = z.object({
  url: z.string().min(12).url(),
  config: z.string().regex(/^[1-6]$/, 'Config must be a number between 1 and 6')
})