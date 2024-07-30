'use client'

import pageServices from '@/services/pages'
import contactServices from '@/services/contacts'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactPageSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import TextareaInput from '@/components/Form/TextareaInput'
import RadioInput from '@/components/Form/RadioInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import BackButton from '@/components/Button/BackButton'

type FormData = z.infer<typeof contactPageSchema>

export default function EditContact() {
    const [contacts, setContacts] = useState<Contact[] | null | undefined>(null)
    const [contactPage, setContactPage] = useState<Contact | null | undefined>(
        null
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(true)
    const {
        handleSubmit,
        register,
        control,
        reset,
        setValue,
        getFieldState,
        getValues,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(contactPageSchema),
    })

    const router = useRouter()
    const { showToast } = useToast()

    useEffect(() => {
        async function fetchData() {
            try {
                const responseContact = await pageServices.getPageById(
                    'contact'
                )
                const responseContacts = await contactServices.getAllContacts()
                setContactPage(responseContact.data.data)
                setContacts(responseContacts.data.data)
                reset(responseContact.data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [reset])

    async function onSubmit(data: FormData) {
        try {
            const response = await pageServices.updatePage('contact', data)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/pages')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        }
    }

    useEffect(() => {
        setValue('primaryContact', contactPage?.primaryContact ?? {})
    }, [contactPage?.primaryContact, setValue])

    useEffect(() => {
        setValue('secondaryContact', contactPage?.secondaryContact ?? {})
    }, [contactPage?.secondaryContact, setValue])

    useEffect(() => {
        if (contactPage) {
            reset({
                primaryContact: contactPage.primaryContact ?? '',
                secondaryContact: contactPage.secondaryContact ?? '',
            })
        }
    }, [contactPage, reset])

    return (
        <ActionLayout
            isLoading={loading}
            isEmpty={!contactPage}
            emptyMessage="Tidak dapat menemukan halaman."
            returnLink="/dashboard/pages"
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/pages'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Edit Halaman Kontak`}
                desc="Pastikan perubahan informasi halaman kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content>
                <form
                    className="w-full h-fit flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInput
                        {...register('title')}
                        label="Judul Halaman"
                        id="title"
                        type="text"
                        placeholder="Masukan judul halaman"
                        required
                        defaultValue={contactPage?.title}
                        className="lg:w-6/12"
                        error={errors?.title?.message}
                    />
                    <TextareaInput
                        {...register('desc')}
                        label="Deskripsi Halaman"
                        id="desc"
                        placeholder="Masukan deskripsi halaman"
                        required
                        rows={4}
                        defaultValue={contactPage?.desc}
                        className="lg:w-6/12"
                        error={errors?.desc?.message}
                    />
                    <RadioInput
                        label="Kontak Pertama"
                        error={errors?.primaryContact?.message}
                    >
                        {contacts?.map((contact) => (
                            <label
                                key={contact.id}
                                className="flex items-center"
                            >
                                <Controller
                                    name="primaryContact"
                                    control={control}
                                    render={({ field }) => {
                                        const isChecked =
                                            field.value.id === contact.id

                                        return (
                                            <input
                                                type="radio"
                                                value={contact}
                                                checked={isChecked}
                                                className="sr-only"
                                                onChange={() =>
                                                    field.onChange(contact)
                                                }
                                            />
                                        )
                                    }}
                                />
                                <span className="radio">{contact.type}</span>
                            </label>
                        ))}
                    </RadioInput>
                    <RadioInput
                        label="Kontak Kedua"
                        error={errors?.secondaryContact?.message}
                    >
                        {contacts?.map((contact) => (
                            <label
                                key={contact.id}
                                className="flex items-center"
                            >
                                <Controller
                                    name="secondaryContact"
                                    control={control}
                                    render={({ field }) => {
                                        const isChecked =
                                            field.value.id === contact.id

                                        return (
                                            <input
                                                type="radio"
                                                value={contact}
                                                checked={isChecked}
                                                className="sr-only"
                                                onChange={() =>
                                                    field.onChange(contact)
                                                }
                                            />
                                        )
                                    }}
                                />
                                <span className="radio">{contact.type}</span>
                            </label>
                        ))}
                    </RadioInput>
                    <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6">
                        <PrimaryButton
                            as="button"
                            type="reset"
                            theme="gray"
                            disabled={isSubmitting}
                            className="w-full grid place-items-center"
                        >
                            Reset
                        </PrimaryButton>
                        <PrimaryButton
                            as="button"
                            type="submit"
                            theme="black"
                            disabled={isSubmitting}
                            className="w-full grid place-items-center"
                        >
                            {isSubmitting ? <Loaders /> : 'Submit'}
                        </PrimaryButton>
                    </div>
                </form>
            </ActionLayout.Content>
        </ActionLayout>
    )
}
