'use client'

import contactServices from '@/services/contacts'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import BackButton from '@/components/Button/BackButton'

type FormData = z.infer<typeof contactSchema>

export default function EditContact({ contactId }: { contactId: string }) {
    const [contact, setContact] = useState<Contact | null | undefined>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()
    const { showToast } = useToast()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(contactSchema),
    })

    useEffect(() => {
        async function getContactDetail() {
            try {
                const { data } = await contactServices.getContactById(contactId)
                setContact(data.data)
                reset(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        getContactDetail()
    }, [contactId, reset])

    async function onSubmit(data: FormData) {
        try {
            const response = await contactServices.updateContact(
                contactId,
                data
            )
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/contacts')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        }
    }

    return (
        <ActionLayout
            isLoading={loading}
            isEmpty={!contact}
            emptyMessage="Tidak dapat menemukan kontak."
            returnLink="/dashboard/contacts"
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/contacts'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Edit Info ${contact?.type}`}
                desc="Pastikan perubahan informasi kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content>
                <form
                    className="w-full lg:w-6/12 h-fit flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInput
                        {...register('type')}
                        label="Jenis Kontak"
                        id="type"
                        type="text"
                        required
                        defaultValue={contact?.type}
                        error={errors?.type?.message}
                        disabled
                    />
                    <TextInput
                        {...register('displayName')}
                        label="Nama Tampilan"
                        id="displayName"
                        type="text"
                        placeholder="Masukan nama tampilan"
                        required
                        defaultValue={contact?.displayName}
                        error={errors?.displayName?.message}
                    />
                    <TextInput
                        {...register('link')}
                        label="Link"
                        id="link"
                        type="text"
                        placeholder="Masukan link kontak"
                        required
                        defaultValue={contact?.link}
                        error={errors?.link?.message}
                    />
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