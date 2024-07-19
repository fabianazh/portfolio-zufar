import z from 'zod'

export const mailSchema = z.object({
    name: z
        .string()
        .min(4, 'Nama minmal harus berisi 4 karakter.')
        .max(64, 'Nama maksimal berisi 64 karakter.'),
    email: z.string().email().nonempty('Email tampilan harus diisi.'),
    message: z
        .string()
        .min(4, 'Pesan minimal harus 4 karakter.')
        .max(255, 'Pesan maksimal berisi 255 karakter.')
        .nonempty('Pesan harus diisi.'),
})

export const toolSchema = z.object({
    name: z
        .string()
        .min(4, 'Nama perangkat minmal harus berisi 4 karakter.')
        .max(20, 'Nama perangkat maksimal berisi 20 karakter.'),
    link: z
        .string()
        .url('Link tidak valid.')
        .nonempty('Link tampilan harus diisi.'),
})

export const projectSchema = z.object({
    name: z
        .string()
        .min(4, 'Nama projek minmal harus berisi 10 karakter.')
        .max(90, 'Nama projek maksimal berisi 90 karakter.'),
})

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
