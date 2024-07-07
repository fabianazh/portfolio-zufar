import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const contactSchema = z.object({
    name: z.string(),
    displayName: z.string().min(8),
    link: z.string().min(8).url(),
})

export type User = z.infer<typeof loginSchema>
