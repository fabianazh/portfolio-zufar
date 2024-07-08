'use client'

import contactServices from '@/services/contacts'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/zodSchema/route'
import FormLayout from '@/components/Layout/FormLayout'
import TextInput from '@/components/Form/TextInput'

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

    async function onSubmit(data: FormData) {
        try {
            // const res = await signIn('credentials', {
            //     redirect: false,
            //     email: data.email,
            //     password: data.password,
            //     callbackUrl: '/dashboard',
            // })
            // if (!res?.error) {
            //     reset()
            //     redirect('/dashboard')
            // } else {
            //     setError('root', {
            //         message: 'Email atau password salah!',
            //     })
            // }
            console.log(data)
        } catch (error) {
            reset()
        }
    }

    return (
        <>
            <FormLayout returnLink={`/dashboard/contact`} loading={loading}>
                <FormLayout.Header
                    title={`Edit Info ${contact?.name}`}
                    desc="Pastikan perubahan informasi kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
                />
                <FormLayout.Content>
                    <>
                        <form
                            action=""
                            className="w-6/12 h-fit flex flex-col gap-6"
                            method="POST"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextInput>
                                <TextInput.Label id="name">
                                    Nama
                                </TextInput.Label>
                                <TextInput.Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Masukan Nama"
                                    register={register}
                                    required={true}
                                    className="bg-stone-200/50"
                                    value={contact?.name}
                                    disabled
                                />
                            </TextInput>
                            <TextInput>
                                <TextInput.Label id="displayName">
                                    Nama Tampilan
                                </TextInput.Label>
                                <TextInput.Input
                                    id="displayName"
                                    type="text"
                                    name="displayName"
                                    placeholder="Masukan Nama Tampilan"
                                    register={register}
                                    required={true}
                                    className="bg-stone-200/50"
                                    value={contact?.displayName}
                                />
                            </TextInput>
                            <TextInput>
                                <TextInput.Label id="link">
                                    Link
                                </TextInput.Label>
                                <TextInput.Input
                                    id="link"
                                    type="text"
                                    name="link"
                                    placeholder="Masukan Nama Tampilan"
                                    register={register}
                                    required={true}
                                    className="bg-stone-200/50"
                                    value={contact?.link}
                                />
                            </TextInput>
                        </form>
                    </>
                </FormLayout.Content>
            </FormLayout>
        </>
    )
}
