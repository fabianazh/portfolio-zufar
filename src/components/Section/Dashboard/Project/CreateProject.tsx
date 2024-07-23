'use client'

import projectServices from '@/services/projects'
import toolServices from '@/services/tools'
import { useForm } from 'react-hook-form'
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
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { categoryOptions, monthOptions, yearOptions } from '@/constant/options'

type FormData = z.infer<typeof projectSchema>

export default function CreateProject() {
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    const router = useRouter()
    const { showToast } = useToast()
    const [previewImages, setPreviewImages] = useState<{
        thumbnail: string
        photos: string[]
    }>({ thumbnail: '', photos: [] })
    const [files, setFiles] = useState<{
        thumbnail: File | null
        photos: File[]
    }>({ thumbnail: null, photos: [] })

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    })

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            const photo = URL.createObjectURL(file)
            setValue('thumbnail', file)
            setFiles((prev) => ({
                ...prev,
                thumbnail: file,
            }))
            setPreviewImages((prev) => ({
                ...prev,
                thumbnail: photo,
            }))
        }
    }

    const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const photos = files.map((file) => URL.createObjectURL(file))
            setValue('photos', files)
            setFiles((prev) => ({
                ...prev,
                photos: files,
            }))
            setPreviewImages((prev) => ({
                ...prev,
                photos: photos,
            }))
        }
    }

    const handleImageRemove = (
        fieldName: 'thumbnail' | 'photos',
        index: number
    ) => {
        setPreviewImages((prev) => {
            if (fieldName === 'thumbnail') {
                setValue(fieldName, null as any)
                setFiles((prev) => ({
                    ...prev,
                    thumbnail: null,
                }))
                return { ...prev, thumbnail: '' }
            } else {
                const updatedPhotos = prev.photos.filter((_, i) => i !== index)
                const updatedFiles = files.photos.filter((_, i) => i !== index)
                setValue(fieldName, updatedFiles)
                setFiles((prev) => ({
                    ...prev,
                    photos: updatedFiles,
                }))
                return { ...prev, photos: updatedPhotos }
            }
        })
    }

    const resetForm = () => {
        reset()
        setPreviewImages({ thumbnail: '', photos: [] })
        setFiles({ thumbnail: null, photos: [] })
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
        console.log(data)
        // try {
        //     const response = await projectServices.createProject(data);
        //     console.log(response.data);
        //     if (response.data.status === true) {
        //         showToast(response.data.message, { type: 'success' });
        //         router.push('/dashboard/projects');
        //     } else {
        //         showToast(response.data.message, { type: 'error' });
        //     }
        // } catch (error) {
        //     showToast('Error', { type: 'error' });
        // }
    }

    console.log(errors)

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
                    <div className="h-fit flex flex-col gap-1.5">
                        <FileInput
                            {...register('thumbnail')}
                            onChange={handleThumbnailChange}
                            label="Thumbnail"
                            className="lg:w-6/12"
                            inputClassName={`${
                                previewImages.thumbnail ? 'sr-only' : ''
                            }`}
                            id="thumbnail"
                            accept=".jpg,.png"
                            error={errors?.thumbnail?.message}
                        />
                        {previewImages.thumbnail && (
                            <div className="w-6/12 relative">
                                <Image
                                    src={previewImages.thumbnail}
                                    alt="Thumbnail preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-fit object-cover border"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleImageRemove('thumbnail', 0)
                                    }
                                    className="absolute h-7 w-7 text-sm aspect-square top-2 right-2 bg-stone-200 opacity-90 text-black rounded-full font-semibold"
                                >
                                    &#10005;
                                </button>
                            </div>
                        )}
                    </div>
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
                        options={tools.map((tool) => ({
                            value: tool,
                            label: tool.name,
                        }))}
                        register={register('tools')}
                        error={errors?.tools?.message}
                    />
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
                    <div className="h-fit flex flex-col gap-1.5">
                        <FileInput
                            {...register('photos')}
                            onChange={handlePhotosChange}
                            label="Foto Projek"
                            className="lg:w-6/12"
                            inputClassName={`${
                                previewImages.photos &&
                                previewImages.photos.length !== 0
                                    ? 'sr-only'
                                    : ''
                            }`}
                            id="photos"
                            accept=".jpg,.png"
                            multiple
                            error={errors?.photos?.message}
                        />
                        {previewImages.photos && (
                            <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {previewImages.photos.map((src, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={src}
                                            alt="Photos preview"
                                            width={300}
                                            height={200}
                                            className="w-full h-fit object-cover border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleImageRemove(
                                                    'photos',
                                                    index
                                                )
                                            }
                                            className="absolute h-7 w-7 text-sm aspect-square top-2 right-2 bg-stone-200 opacity-90 text-black rounded-full font-semibold"
                                        >
                                            &#10005;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
