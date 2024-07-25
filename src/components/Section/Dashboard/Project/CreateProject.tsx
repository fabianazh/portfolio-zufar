'use client'

import projectServices from '@/services/projects'
import toolServices from '@/services/tools'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema } from '@/zodSchema/route'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import TextareaInput from '@/components/Form/TextareaInput'
import SelectInput from '@/components/Form/SelectInput'
import CheckboxInput from '@/components/Form/CheckboxInput'
import FileInput from '@/components/Form/FileInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import Loaders from '@/components/Other/Loader'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import BackButton from '@/components/Button/BackButton'
import { useState, useEffect, useRef } from 'react'
import { categoryOptions, monthOptions, yearOptions } from '@/constant/options'
import { uploadFile } from '@/libs/firebase/service'

type FormData = z.infer<typeof projectSchema>

export default function CreateProject() {
    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    })
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()
    const { showToast } = useToast()

    const thumbnailRef = useRef<HTMLInputElement>(null)
    const photosRef = useRef<HTMLInputElement>(null)

    const resetForm = () => {
        reset()
    }

    async function fetchTools() {
        try {
            const { data } = await toolServices.getAllTools()
            setTools(data.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTools()
    }, [])

    async function onSubmit(data: FormData) {
        try {
            const response = await projectServices.createProject(data)

            if (response.data.status === true) {
                const projectId = response.data.projectId

                const thumbnailFiles = thumbnailRef.current?.files ?? []
                let thumbnailUrl: string | null = null

                if (thumbnailFiles.length > 0) {
                    const thumbnailFile = thumbnailFiles[0]
                    thumbnailUrl = await uploadFile(
                        'projects',
                        projectId,
                        thumbnailFile
                    )
                }

                const photosFiles = photosRef.current?.files ?? []
                const photoUploadPromises = Array.from(photosFiles).map(
                    (file) => {
                        uploadFile('projects', projectId, file)
                    }
                )
                const photoUrls = await Promise.all(photoUploadPromises)

                const updateData: any = {}
                if (thumbnailUrl) {
                    updateData.thumbnail = thumbnailUrl
                }
                if (photoUrls.length > 0) {
                    updateData.photos = photoUrls
                }

                if (Object.keys(updateData).length > 0) {
                    try {
                        const responseUpdate =
                            await projectServices.updateProject(
                                projectId,
                                updateData
                            )

                        if (responseUpdate.data.status === true) {
                            showToast(response.data.message, {
                                type: 'success',
                            })
                            router.push('/dashboard/projects')
                        } else {
                            showToast(response.data.message, { type: 'error' })
                        }
                    } catch (error) {
                        showToast('Error', { type: 'error' })
                    }
                }
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
                desc="Pastikan informasi projek yang akan ditampilkan kepada pengguna telah sesuai dengan yang diinginkan."
            />
            <ActionLayout.Content>
                <form
                    className="w-full h-fit flex flex-col gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <FileInput
                        {...register('thumbnail')}
                        ref={thumbnailRef}
                        label="Thumbnail"
                        id="thumbnail"
                        accept=".jpg,.png"
                        className="w-full"
                        inputClassName="w-full lg:w-6/12"
                        error={errors?.thumbnail?.message as string}
                    />
                    <TextInput
                        {...register('name')}
                        label="Nama Projek"
                        id="name"
                        className="lg:w-6/12"
                        type="text"
                        placeholder="Masukan nama projek"
                        required
                        error={errors?.name?.message}
                    />
                    <TextareaInput
                        {...register('desc')}
                        label="Deskripsi"
                        id="desc"
                        className="lg:w-6/12"
                        type="text"
                        placeholder="Masukan deskripsi projek"
                        required
                        rows={4}
                        error={errors?.desc?.message}
                    />
                    <SelectInput
                        {...register('category')}
                        label="Kategori"
                        id="category"
                        className="lg:w-6/12"
                        error={errors?.category?.message}
                    >
                        <option value="">Pilih kategori</option>
                        {categoryOptions.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.label}
                            </option>
                        ))}
                    </SelectInput>
                    <CheckboxInput
                        label="Perangkat"
                        error={errors?.tools?.message}
                    >
                        {tools.map((tool, index) => (
                            <label
                                key={index}
                                className="flex items-center gap-2 text-sm"
                            >
                                <Controller
                                    name="tools"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            value={tool.id}
                                            checked={field.value?.some(
                                                (t: Tool) => t.id === tool.id
                                            )}
                                            onChange={(e) => {
                                                const newTools = e.target
                                                    .checked
                                                    ? [
                                                          ...(field.value ||
                                                              []),
                                                          tool,
                                                      ]
                                                    : field.value.filter(
                                                          (t: Tool) =>
                                                              t.id !== tool.id
                                                      )
                                                field.onChange(newTools)
                                            }}
                                        />
                                    )}
                                />
                                {tool.name}
                            </label>
                        ))}
                    </CheckboxInput>
                    <div className="w-full lg:w-6/12 flex flex-row gap-4">
                        <SelectInput
                            {...register('month')}
                            label="Bulan"
                            id="month"
                            error={errors?.month?.message}
                            className="w-full"
                        >
                            <option value="">Pilih bulan</option>
                            {monthOptions.map((item, index) => (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            ))}
                        </SelectInput>
                        <SelectInput
                            {...register('year')}
                            label="Tahun"
                            id="year"
                            error={errors?.year?.message}
                            className="w-full"
                        >
                            <option value="">Pilih tahun</option>
                            {yearOptions.map((item, index) => (
                                <option value={item.value} key={index}>
                                    {item.label}
                                </option>
                            ))}
                        </SelectInput>
                    </div>
                    <FileInput
                        {...register('photos')}
                        ref={photosRef}
                        label="Gambar projek"
                        id="photos"
                        multiple
                        accept=".jpg,.png"
                        className="w-full"
                        inputClassName="w-full lg:w-6/12"
                        error={errors?.photos?.message as string}
                    />
                    <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6">
                        <PrimaryButton
                            type="button"
                            theme="gray"
                            disabled={isSubmitting}
                            className="w-full grid place-items-center"
                            onClick={resetForm}
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
