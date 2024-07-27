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
import { FileInputHandle } from '@/interfaces/component'

type FormData = z.infer<typeof projectSchema>

export default function EditProject({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const {
        handleSubmit,
        control,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
        // defaultValues: {
        //     thumbnail: project?.thumbnail,
        //     name: project?.name,
        //     desc: project?.desc,
        //     category: project?.category,
        //     month: project?.date.split(' ')[0],
        //     year: project?.date.split(' ')[1],
        //     tools: project?.tools,
        //     photos: project?.photos,
        // },
    })

    const router = useRouter()
    const { showToast } = useToast()

    const thumbnailRef = useRef<FileInputHandle>(null)
    const photosRef = useRef<FileInputHandle>(null)

    function resetForm() {
        reset()
        thumbnailRef.current?.resetPreview()
        photosRef.current?.resetPreview()
    }

    async function fetchData() {
        try {
            const toolsResponse = await toolServices.getAllTools()
            const projectResponse = await projectServices.getProjectById(
                projectId
            )
            setProject(projectResponse.data.data)
            setTools(toolsResponse.data.data)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function onSubmit(data: FormData) {
        try {
            const response = await projectServices.createProject(data)

            if (response.data.status === true) {
                const projectId = response.data.projectId

                const uploadPromises: Promise<string | null>[] = []

                const thumbnailFiles = thumbnailRef.current?.getFiles() ?? []
                if (thumbnailFiles.length > 0) {
                    const thumbnailFile = thumbnailFiles[0]
                    uploadPromises.push(
                        uploadFile('projects', projectId, thumbnailFile)
                    )
                }

                const photosFiles = photosRef.current?.getFiles()
                const filesArray = photosFiles ? Array.from(photosFiles) : []

                for (const file of filesArray) {
                    if (file) {
                        uploadPromises.push(
                            uploadFile('projects', projectId, file)
                        )
                    }
                }

                const uploadResults = await Promise.allSettled(uploadPromises)

                const thumbnailUrl =
                    uploadResults[0].status === 'fulfilled'
                        ? uploadResults[0].value
                        : null
                const results = await Promise.allSettled(uploadPromises)

                const photoUrls = results
                    .filter(
                        (
                            result
                        ): result is PromiseFulfilledResult<string | null> =>
                            result.status === 'fulfilled'
                    )
                    .map((result) => result.value)

                const updateData: any = {}
                if (thumbnailUrl) {
                    updateData.thumbnail = thumbnailUrl
                }
                if (photoUrls.length > 0) {
                    updateData.photos = photoUrls
                }

                if (Object.keys(updateData).length > 0) {
                    try {
                        const updateImage = await projectServices.updateProject(
                            projectId,
                            updateData
                        )

                        if (updateImage.data.status === true) {
                            showToast('Projek berhasil dibuat!', {
                                type: 'success',
                            })
                            router.push('/dashboard/projects')
                        } else {
                            showToast('Projek gagal dibuat!', { type: 'error' })
                        }
                    } catch (error) {
                        showToast('Error saat pembuatan projek', {
                            type: 'error',
                        })
                    }
                }
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error saat pembuatan projek', { type: 'error' })
        }
    }

    return (
        <ActionLayout
            returnLink="/dashboard/projects"
            isLoading={loading}
            isEmpty={!project}
            emptyMessage="Projek tidak ditemukan."
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/projects'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Edit Projek ${project?.name}`}
                desc="Pastikan perubahan informasi projek yang akan ditampilkan kepada pengguna telah sesuai dengan yang diinginkan."
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
                        defaultValue={project?.name}
                    />
                    <TextareaInput
                        {...register('desc')}
                        label="Deskripsi"
                        id="desc"
                        className="lg:w-6/12"
                        placeholder="Masukan deskripsi projek"
                        required
                        rows={4}
                        error={errors?.desc?.message}
                        defaultValue={project?.desc}
                    />
                    <SelectInput
                        {...register('category')}
                        label="Kategori"
                        id="category"
                        className="lg:w-6/12"
                        error={errors?.category?.message}
                    >
                        {categoryOptions.map((category, index) => (
                            <option
                                value={category.value}
                                key={index}
                                selected={category.value === project?.category}
                            >
                                {category.label}
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
                            {monthOptions.map((month, index) => (
                                <option
                                    value={month.value}
                                    key={index}
                                    selected={
                                        month.value ===
                                        project?.date.split(' ')[0]
                                    }
                                >
                                    {month.label}
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
                            {yearOptions.map((year, index) => (
                                <option
                                    value={year.value}
                                    key={index}
                                    selected={
                                        year.value ===
                                        project?.date.split(' ')[1]
                                    }
                                >
                                    {year.label}
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
