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

export default function EditProject({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project | null | undefined>(null)
    const [tools, setTools] = useState<Tool[]>([])
    const [loadingProject, setLoadingProject] = useState<boolean>(true)
    const [loadingTools, setLoadingTools] = useState<boolean>(true)
    const [errorProject, setErrorProject] = useState<boolean>(false)
    const [errorTools, setErrorTools] = useState<boolean>(false)
    const [thumbnailPreview, setThumbnailPreview] = useState<string[]>([])
    const [photosPreview, setPhotosPreview] = useState<string[]>([])
    const {
        handleSubmit,
        control,
        register,
        setValue,
        getValues,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project?.name || '',
            desc: project?.desc || '',
            category: project?.category || '',
            tools: project?.tools || [],
            month: project?.month || '',
            year: project?.year || '',
            thumbnail: project?.thumbnail || [],
            photos: project?.photos || [],
        },
    })

    const router = useRouter()
    const { showToast } = useToast()

    const thumbnailRef = useRef<HTMLInputElement>(null)
    const photosRef = useRef<HTMLInputElement>(null)

    function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const files = e.target.files

        if (files) {
            const fileThumbnailPreviews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            )
            setThumbnailPreview(fileThumbnailPreviews)

            setValue('thumbnail', files)
        }
    }

    function handleRemoveThumbnailPreview(index: number) {
        setThumbnailPreview((prev) => {
            const updatedPreviews = prev.filter((_, i) => i !== index)

            const currentFiles = getValues('thumbnail') as FileList
            if (!currentFiles) {
                return updatedPreviews
            }

            const newFileList = new DataTransfer()
            Array.from(currentFiles).forEach((file, i) => {
                if (i !== index) {
                    newFileList.items.add(file)
                }
            })

            setValue('thumbnail', newFileList.files)

            return updatedPreviews
        })
    }

    function handlePhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const files = e.target.files

        if (files) {
            const filePhotosPreviews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            )
            setPhotosPreview(filePhotosPreviews)

            setValue('photos', files)
        }
    }

    function handleRemovePhotosPreview(index: number) {
        setPhotosPreview((prev) => {
            const updatedPhotos = prev.filter((_, i) => i !== index)

            const photosValue = getValues('photos')

            if (
                Array.isArray(photosValue) &&
                photosValue.every((item) => typeof item === 'string')
            ) {
                setValue('photos', updatedPhotos)
            } else {
                const photosInput = photosRef.current
                if (photosInput) {
                    const currentFiles = photosInput.files
                    if (currentFiles) {
                        const newFileList = new DataTransfer()

                        Array.from(currentFiles).forEach((file, i) => {
                            if (i !== index) {
                                newFileList.items.add(file)
                            }
                        })

                        photosInput.files = newFileList.files
                        setValue('photos', newFileList.files)
                    }
                }
            }

            return updatedPhotos
        })
    }

    function resetForm() {
        reset()
        setThumbnailPreview(project?.thumbnail ?? [])
        setPhotosPreview(project?.photos ?? [])
    }

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await projectServices.getProjectById(projectId)
                const projectData = response.data.data
                setProject(projectData)

                reset({
                    name: projectData.name,
                    desc: projectData.desc,
                    category: projectData.category,
                    tools: projectData.tools,
                    month: projectData.month,
                    year: projectData.year,
                    thumbnail: projectData.thumbnail,
                    photos: projectData.photos,
                })
                setThumbnailPreview(projectData?.thumbnail)
                setPhotosPreview(projectData?.photos)
            } catch (error) {
                setErrorProject(true)
            } finally {
                setLoadingProject(false)
            }
        }

        fetchProject()
    }, [projectId])

    useEffect(() => {
        async function fetchTools() {
            try {
                const response = await toolServices.getAllTools()
                setTools(response.data.data)
            } catch (error) {
                setErrorTools(true)
            } finally {
                setLoadingTools(false)
            }
        }

        fetchTools()
    }, [projectId])

    useEffect(() => {
        setValue('tools', project?.tools ?? [])
    }, [project?.tools, setValue])

    async function onSubmit(data: FormData) {
        const thumbnailFiles = thumbnailRef.current?.files ?? []
        const photosFiles = photosRef.current?.files ?? []

        try {
            if (thumbnailFiles.length < 1 && photosFiles.length < 1) {
                const response = await projectServices.updateProject(
                    projectId,
                    data
                )

                if (response.data.status === true) {
                    showToast(response.data.message, {
                        type: 'success',
                    })
                    router.push(`/dashboard/projects/${projectId}`)
                } else {
                    showToast(response.data.message, {
                        type: 'error',
                    })
                }
            } else if (thumbnailFiles.length > 0 || photosFiles.length > 0) {
                const uploadPromises: Promise<string | null>[] = []

                if (thumbnailFiles.length > 0) {
                    Array.from(thumbnailFiles).forEach((file) => {
                        uploadPromises.push(
                            uploadFile('projects', projectId, file)
                        )
                    })
                }

                if (photosFiles.length > 0) {
                    Array.from(photosFiles).forEach((file) => {
                        uploadPromises.push(
                            uploadFile('projects', projectId, file)
                        )
                    })
                }

                const uploadResults = await Promise.allSettled(uploadPromises)

                const thumbnailUrls = uploadResults
                    .slice(0, thumbnailFiles.length)
                    .filter(
                        (
                            result
                        ): result is PromiseFulfilledResult<string | null> =>
                            result.status === 'fulfilled'
                    )
                    .map((result) => result.value) as string[]

                const photoUrls = uploadResults
                    .slice(thumbnailFiles.length)
                    .filter(
                        (
                            result
                        ): result is PromiseFulfilledResult<string | null> =>
                            result.status === 'fulfilled'
                    )
                    .map((result) => result.value) as string[]

                const updateData: any = {}
                if (thumbnailUrls.length > 0) {
                    updateData.thumbnail = thumbnailUrls
                }
                if (photoUrls.length > 0) {
                    updateData.photos = photoUrls
                }

                if (Object.keys(updateData).length > 0) {
                    try {
                        const updateImage = await projectServices.updateProject(
                            projectId,
                            {
                                ...data,
                                thumbnail: updateData.thumbnail,
                                photos: updateData.photos,
                            }
                        )

                        if (updateImage.data.status === true) {
                            showToast('Projek berhasil diperbarui!', {
                                type: 'success',
                            })
                            router.push(`/dashboard/projects/${projectId}`)
                        } else {
                            showToast('Projek gagal diperbarui!', {
                                type: 'error',
                            })
                        }
                    } catch (error) {
                        showToast('Error saat memperbarui projek', {
                            type: 'error',
                        })
                    }
                }
            }
        } catch (error) {
            showToast('Error saat memperbarui projek', { type: 'error' })
        }
    }

    return (
        <ActionLayout
            returnLink={`/dashboard/projects/${projectId}`}
            isLoading={loadingProject}
            isEmpty={!project}
            emptyMessage="Projek tidak ditemukan."
            isError={errorProject || errorTools}
        >
            <ActionLayout.Buttons>
                <BackButton href={`/dashboard/projects/${projectId}`} />
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
                        error={errors?.thumbnail?.message as string}
                        handleFileChange={handleThumbnailChange}
                        handleRemovePreview={handleRemoveThumbnailPreview}
                        preview={thumbnailPreview}
                        required={getValues('thumbnail').length === 0}
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
                        {categoryOptions.map((category, index) => (
                            <option value={category.value} key={index}>
                                {category.label}
                            </option>
                        ))}
                    </SelectInput>
                    <CheckboxInput
                        label="Perangkat"
                        error={errors?.tools?.message}
                    >
                        {tools.map((tool, index) => (
                            <label key={index} className="chip__container">
                                <Controller
                                    name="tools"
                                    control={control}
                                    render={({ field }) => {
                                        const isChecked = field.value?.some(
                                            (t: Tool) => t.id === tool.id
                                        )

                                        return (
                                            <input
                                                type="checkbox"
                                                value={tool.id}
                                                checked={isChecked}
                                                className="sr-only"
                                                onChange={(e) => {
                                                    const isChecked =
                                                        e.target.checked
                                                    const currentTools =
                                                        field.value || []

                                                    const newTools = isChecked
                                                        ? [
                                                              ...currentTools,
                                                              tool,
                                                          ]
                                                        : currentTools.filter(
                                                              (t: Tool) =>
                                                                  t.id !==
                                                                  tool.id
                                                          )

                                                    field.onChange(newTools)
                                                }}
                                            />
                                        )
                                    }}
                                />
                                <span className="chip">{tool.name}</span>
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
                                <option value={month.value} key={index}>
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
                                <option value={year.value} key={index}>
                                    {year.label}
                                </option>
                            ))}
                        </SelectInput>
                    </div>
                    <FileInput
                        {...register('photos')}
                        ref={photosRef}
                        label="Gambar Projek"
                        id="photos"
                        multiple
                        accept=".jpg,.png"
                        className="w-full lg:w-full"
                        error={errors?.photos?.message as string}
                        handleFileChange={handlePhotosChange}
                        handleRemovePreview={handleRemovePhotosPreview}
                        preview={photosPreview}
                        required={getValues('photos').length === 0}
                    />
                    <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6">
                        <PrimaryButton
                            as="button"
                            type="button"
                            theme="gray"
                            disabled={isSubmitting}
                            className="w-full grid place-items-center"
                            onClick={resetForm}
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
