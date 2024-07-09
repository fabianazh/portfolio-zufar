import z from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const contactSchema = z.object({
    name: z.string().readonly(),
    displayName: z
        .string()
        .min(4, 'Nama tampilan minimal harus 4 karakter.')
        .max(28, 'Nama tampilan maksimal berisi 28 karakter.')
        .nonempty('Nama tampilan harus diisi.'),
    link: z
        .string()
        .min(4, 'Link minimal harus 4 karakter.')
        .nonempty('Link harus diisi.'),
})

export type User = z.infer<typeof loginSchema>
