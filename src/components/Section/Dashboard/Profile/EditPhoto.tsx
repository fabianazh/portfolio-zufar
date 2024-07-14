'use client'

import profileServices from '@/services/profiles'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { photoSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'

type FormData = z.infer<typeof photoSchema>

export default function EditPhoto() {
    const [profile, setProfile] = useState<Profile | null | undefined>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const { showToast } = useToast()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(photoSchema),
    })

    const profileId = 'photo'

    useEffect(() => {
        async function getProfileDetail() {
            try {
                const { data } = await profileServices.getProfileById(profileId)
                setProfile(data.data)
                reset(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getProfileDetail()
    }, [profileId, reset])

    async function onSubmit(data: FormData) {
        try {
            const response = await profileServices.updateProfile(
                profileId,
                data
            )
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/profiles')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        }
    }

    return (
        <ActionLayout
            returnLink={`/dashboard/profiles`}
            isLoading={loading}
            isEmpty={!profile}
            emptyMessage="Tidak dapat menemukan foto profil."
        >
            <ActionLayout.Header
                title={`Edit Foto Profil`}
                desc="Pastikan perubahan foto profil yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content>
                <form
                    className="w-full lg:w-6/12 h-fit flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/*   <TextInput
                        {...register('link')}
                        label="Link"
                        id="link"
                        type="text"
                        name="link"
                        placeholder="Masukan Link Kontak"
                        required
                        inputClassName="bg-stone-200/50"
                        defaultValue={profile?.link}
                        error={errors?.link?.message}
                    /> */}
                    <div className="w-full lg:w-8/12 grid grid-cols-2 gap-6">
                        <PrimaryButton
                            type="reset"
                            theme="gray"
                            disabled={isSubmitting}
                            className="w-full grid place-items-center"
                        >
                            Reset
                        </PrimaryButton>
                        <PrimaryButton
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
