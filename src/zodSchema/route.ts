import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const contactSchema = z.object({
    name: z.string().nonempty('Nama harus diisi.'),
    displayName: z.string().nonempty('Nama tampilan harus diisi.'),
    link: z.string().nonempty('Link harus diisi.'),
})

export type User = z.infer<typeof loginSchema>
