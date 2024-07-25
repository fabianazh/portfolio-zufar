import z from 'zod'
import { zfd } from 'zod-form-data'

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
    name: z.string().nonempty('Nama projek harus diisi'),
    desc: z.string().nonempty('Deskripsi projek harus diisi'),
    category: z.string().nonempty('Kategori projek harus diisi'),
    tools: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                link: z.string(),
            })
        )
        .min(1, 'Minimal satu alat harus dipilih'),
    thumbnail: z.any(),
    // .length(1, { message: 'Thumbnail harus berisi 1 file.' })
    // .refine((files) => files[0]?.size < 5000000, {
    //     message: "Thumbnail file can't be bigger than 5MB.",
    // })
    photos: z.any(),
    // .min(1, 'Gambar harus diisi dengan lebih dari satu file.')
    // .refine((files) => files.every((file) => file.size < 5000000), {
    //     message: "Each photo file can't be bigger than 5MB.",
    // })
    month: z.string().nonempty('Bulan harus diisi'),
    year: z.string().nonempty('Tahun harus diisi'),
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
