'use client'

import projectServices from '@/services/projects'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import SelectInput from '@/components/Form/SelectInput'
import FileInput from '@/components/Form/FileInput'
import DateInput from '@/components/Form/DateInput'
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
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const photosWithDesc = files.map((file) => ({
                photo: URL.createObjectURL(file),
                desc: 'Default description',
            }))
            setValue('photos', photosWithDesc)
        }
    }

    const categoryOptions = [
        {
            value: 'Desain Arsitektur',
            label: 'Desain Arsitektur',
        },
        {
            value: 'Desain Interior',
            label: 'Desain Interior',
        },
        {
            value: 'Struktur Bangunan',
            label: 'Struktur Bangunan',
        },
        {
            value: 'Instalasi Listrik & Air',
            label: 'Instalasi Listrik & Air',
        },
    ]

    async function onSubmit(data: FormData) {
        console.log(data)
        // try {
        //     const response = await projectServices.createProject(data)
        //     console.log(response.data)
        //     if (response.data.status === true) {
        //         showToast(response.data.message, { type: 'success' })
        //         router.push('/dashboard/projects')
        //     } else {
        //         showToast(response.data.message, { type: 'error' })
        //     }
        // } catch (error) {
        //     showToast('Error', { type: 'error' })
        // }
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
                    encType="multipart/form-data"
                >
                    <FileInput
                        onChange={handleFileChange}
                        label="Thumbnail"
                        id="thumbnail"
                        accept=".jpg,.png"
                        error={errors?.thumbnail?.message}
                    />
                    <TextInput
                        {...register('name')}
                        label="Nama Projek"
                        id="name"
                        type="text"
                        placeholder="Masukan nama projek"
                        required
                        error={errors?.name?.message}
                    />
                    <TextInput
                        {...register('desc')}
                        label="Deskripsi"
                        id="desc"
                        type="text"
                        placeholder="Masukan nama projek"
                        required
                        error={errors?.desc?.message}
                    />
                    <SelectInput
                        {...register('category')}
                        label="Kategori"
                        id="category"
                        defaultValue="Pilih Kategori"
                        error={errors?.category?.message}
                        options={categoryOptions}
                    />
                    <DateInput
                        label="Tanggal Pengerjaan"
                        id="date"
                        min="2021-01-01"
                        error={errors.date?.message}
                    />
                    <FileInput
                        onChange={handleFileChange}
                        label="Gambar Lain"
                        id="photos"
                        accept=".jpg,.png"
                        multiple
                        error={errors?.photos?.message}
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
