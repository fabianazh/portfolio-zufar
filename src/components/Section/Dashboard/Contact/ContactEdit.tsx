'use client'

import Heading from '@/components/Typography/Heading'
import contactServices from '@/services/contacts'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/zodSchema/route'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

type FormData = z.infer<typeof contactSchema>

export default function ContactEdit({ contactId }: { contactId: string }) {
    const [contact, setContact] = useState<Contact | null | undefined>(null)
    const [loading, setLoading] = useState(true)

    const {
        handleSubmit,
        register,
        reset,
        setError,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(contactSchema),
    })

    useEffect(() => {
        async function getContactDetail() {
            try {
                const { data } = await contactServices.getContactDetail(
                    contactId
                )
                setContact(data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        getContactDetail()
    }, [contactId])

    return (
        <>
            <section className="w-full h-auto flex flex-col gap-8 mb-14">
                <div className="w-full h-fit items-center justify-between flex">
                    <Link
                        href={'/projects'}
                        className="flex w-fit h-fit gap-2 items-center text-lg"
                    >
                        <IoArrowBack />
                        <span className="font-medium">Kembali</span>
                    </Link>
                </div>
                <div className="flex flex-col gap-1">
                    <Heading className="normal-case">
                        Edit Info {contact?.name}
                    </Heading>
                    <div className="w-full h-fit flex justify-between gap-6">
                        <span className="w-full">
                            Pastikan perubahan informasi kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan.
                        </span>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-4"></div>
            </section>
        </>
    )
}
