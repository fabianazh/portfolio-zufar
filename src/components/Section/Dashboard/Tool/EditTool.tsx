'use client'

import toolServices from '@/services/tools'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toolSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import BackButton from '@/components/Button/BackButton'
import { useSession } from 'next-auth/react'

type FormData = z.infer<typeof toolSchema>

export default function EditTool({ toolId }: { toolId: string }) {
    const [tool, setTool] = useState<Tool | null | undefined>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const { showToast } = useToast()
    const session = useSession()

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(toolSchema),
    })

    useEffect(() => {
        async function getToolDetail() {
            try {
                const { data } = await toolServices.getToolById(toolId)
                setTool(data.data)
                reset(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getToolDetail()
    }, [toolId, reset])

    async function onSubmit(data: FormData) {
        try {
            const response = await toolServices.updateTool(toolId, data)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/tools')
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
            isEmpty={!tool}
            emptyMessage="Tidak dapat menemukan data perangkat."
            returnLink="/dashboard/tools"
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/tools'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Edit Info Perangkat ${tool?.name}`}
                desc="Pastikan perubahan informasi perangkat yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content>
                <form
                    className="w-full lg:w-6/12 h-fit flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInput
                        {...register('name')}
                        label="Nama"
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="Masukan nama perangkat"
                        inputClassName="bg-stone-200/50"
                        defaultValue={tool?.name}
                        error={errors?.name?.message}
                    />
                    <TextInput
                        {...register('link')}
                        label="Link"
                        id="link"
                        type="text"
                        name="link"
                        placeholder="Masukan link perangkat"
                        required
                        inputClassName="bg-stone-200/50"
                        defaultValue={tool?.link}
                        error={errors?.link?.message}
                    />
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
