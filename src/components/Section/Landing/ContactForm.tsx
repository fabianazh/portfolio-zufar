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
                <div className="w-full h-fit flex flex-col">
                    <div className="w-full grid grid-flow-row lg:grid-flow-col h-fit">
                        <div className="w-full border border-b-0 lg:border-b lg:border-r-0 border-black h-fit flex-grow">
                            <input
                                type="text"
                                id="name"
                                className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                {...register('name')}
                                placeholder="Nama"
                                required
                            />
                        </div>
                        <div className="w-full border border-black h-fit flex-grow">
                            <input
                                type="text"
                                id="email"
                                className="w-full py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                                {...register('email')}
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full h-fit border border-t-0 border-black">
                        <textarea
                            id="message"
                            rows={6}
                            className="w-full h-fit resize-none py-3 px-4 focus:border-0 focus:outline-0 focus:ring-0 placeholder:font-normal placeholder:text-stone-500 text-sm lg:text-base"
                            {...register('message')}
                            placeholder="Pesan"
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="border border-black w-fit py-2 px-8">
                    <button type="submit" disabled={isSubmitting}>
                        Kirim
                    </button>
                </div>
            </form>
        </>
    )
}
