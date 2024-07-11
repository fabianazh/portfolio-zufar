'use client'

import { useToast } from '@/app/context/ToastContext'
import mailServices from '@/services/mails'
import { mailSchema } from '@/zodSchema/route'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type FormData = z.infer<typeof mailSchema>

export default function ContactForm() {
    const { showToast } = useToast()

    const {
        handleSubmit,
        register,
        resetField,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(mailSchema),
    })

    async function onSubmit(data: FormData) {
        try {
            const response = await mailServices.sendMail(data)

            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                resetField('name')
                resetField('email')
                resetField('message')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-fit flex flex-col gap-4 z-0"
            >
                <div className="w-full h-fit flex flex-col gap-6">
                    <fieldset className="w-full h-fit relative flex flex-col gap-1">
                        <label
                            htmlFor="name"
                            className="absolute -top-2.5 left-0 bg-white z-10 px-2 lg:px-3 text-sm"
                        >
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-white valid:bg-white py-3 px-4 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-sm border border-black autofill:bg-white"
                            {...register('name')}
                            placeholder="Masukan nama anda"
                            required
                            autoComplete={'off'}
                        />
                        {errors?.name?.message && (
                            <span className="text-red-600 text-sm">
                                {errors?.name?.message}
                            </span>
                        )}
                    </fieldset>

                    <fieldset className="w-full h-fit relative flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="absolute -top-2.5 left-0 bg-white z-10 px-2 lg:px-3 text-sm"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full bg-white valid:bg-white py-3 px-4 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-sm border border-black autofill:bg-white"
                            {...register('email')}
                            placeholder="Masukan email anda"
                            required
                            autoComplete={'off'}
                        />
                        {errors?.email?.message && (
                            <span className="text-red-600 text-sm">
                                {errors?.email?.message}
                            </span>
                        )}
                    </fieldset>

                    <fieldset className="w-full h-fit relative flex flex-col gap-1">
                        <label
                            htmlFor="message"
                            className="absolute -top-2.5 left-0 bg-white z-10 px-2 lg:px-3 text-sm"
                        >
                            Pesan
                        </label>
                        <textarea
                            id="message"
                            rows={6}
                            className="w-full bg-white valid:bg-white py-3 px-4 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-sm border border-black autofill:bg-white resize-none"
                            {...register('message')}
                            placeholder="Masukan pesan anda"
                            required
                            autoComplete={'off'}
                        ></textarea>
                        {errors?.message?.message && (
                            <span className="text-red-600 text-sm">
                                {errors?.message?.message}
                            </span>
                        )}
                    </fieldset>
                </div>
                <div className="border border-black w-fit py-2 px-16">
                    <button type="submit" disabled={isSubmitting}>
                        Kirim
                    </button>
                </div>
            </form>
        </>
    )
}
