'use client'

import projectServices from '@/services/projects'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import BackButton from '@/components/Button/BackButton'

type FormData = z.infer<typeof projectSchema>

export default function CreateProject() {
    const router = useRouter()
    const { showToast } = useToast()
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    })

    async function onSubmit(data: FormData) {
        try {
            const response = await projectServices.createProject(data)
            console.log(response.data)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/projects')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        }
    }

    return (
        <ActionLayout returnLink="/dashboard/projects">
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/projects'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Tambah Projek`}
                desc="Pastikan informasi projek yang akan
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
                        label="Nama Projek"
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Masukan nama projek"
                        required
                        inputClassName="bg-stone-200/50"
                        error={errors?.name?.message}
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
