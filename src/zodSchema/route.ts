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
    id: z.string(),
    thumbnail: z.object({
        photo: z.string().nonempty('Foto thumbnail harus diisi.'),
        desc: z.string().nonempty('Deskripsi thumbnail harus diisi.'),
    }),
    date: z.string().nonempty('Tanggal harus diisi.'),
    name: z
        .string()
        .min(4, 'Nama projek minimal harus berisi 4 karakter.')
        .max(90, 'Nama projek maksimal berisi 90 karakter.')
        .nonempty('Nama projek harus diisi.'),
    desc: z.string().nonempty('Deskripsi projek harus diisi.'),
    category: z.string().nonempty('Kategori harus diisi.'),
    tools: z
        .array(
            z.object({
                name: z.string().nonempty('Nama perangkat harus diisi.'),
                url: z
                    .string()
                    .url('URL perangkat tidak valid')
                    .nonempty('URL perangkat harus diisi.'),
            })
        )
        .nonempty('Perangkat harus diisi.'),
    photos: z
        .array(
            z.object({
                photo: z.string(),
                desc: z.string().optional(),
            })
        )
        .optional(),
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
