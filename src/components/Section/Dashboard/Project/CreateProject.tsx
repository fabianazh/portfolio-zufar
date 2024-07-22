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
import { useState, useEffect } from 'react'
import Image from 'next/image'

type FormData = z.infer<typeof projectSchema>

export default function CreateProject() {
    const router = useRouter()
    const { showToast } = useToast()
    const [previewImages, setPreviewImages] = useState<
        Record<string, string[]>
    >({})

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(projectSchema),
    })

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: 'thumbnail' | 'photos'
    ) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const photosWithDesc = files.map((file) => ({
                photo: URL.createObjectURL(file),
                desc: file.name,
            }))
            setValue(fieldName, photosWithDesc)
            setPreviewImages((prev) => ({
                ...prev,
                [fieldName]: photosWithDesc.map((photo) => photo.photo),
            }))
        }
    }

    const handleImageRemove = (
        fieldName: 'thumbnail' | 'photos',
        index: number
    ) => {
        setPreviewImages((prev) => {
            const updatedField = prev[fieldName].filter((_, i) => i !== index)
            if (updatedField.length === 0) {
                setValue(fieldName, [])
            }
            return {
                ...prev,
                [fieldName]: updatedField,
            }
        })
    }

    const resetForm = () => {
        reset()
        setPreviewImages({})
    }

    const categoryOptions = [
        { value: 'Desain Arsitektur', label: 'Desain Arsitektur' },
        { value: 'Desain Interior', label: 'Desain Interior' },
        { value: 'Struktur Bangunan', label: 'Struktur Bangunan' },
        { value: 'Instalasi Listrik & Air', label: 'Instalasi Listrik & Air' },
    ]

    const monthOptions = [
        { value: 'Jan', label: 'Januari' },
        { value: 'Feb', label: 'Februari' },
        { value: 'Mar', label: 'Maret' },
        { value: 'Apr', label: 'April' },
        { value: 'May', label: 'Mei' },
        { value: 'Jun', label: 'Juni' },
        { value: 'Jul', label: 'Juli' },
        { value: 'Aug', label: 'Agustus' },
        { value: 'Sep', label: 'September' },
        { value: 'Oct', label: 'Oktober' },
        { value: 'Nov', label: 'November' },
        { value: 'Dec', label: 'Desember' },
    ]

    const currentYear = new Date().getFullYear()
    const yearOptions = Array.from({ length: currentYear - 2020 }, (_, i) => ({
        value: `${2021 + i}`,
        label: `${2021 + i}`,
    }))

    // useEffect(() => {
    //     const subscription = watch((value, { name }) => {
    //         if (name === 'month' || name === 'year') {
    //             if (value.month && value.year) {
    //                 const date = new Date(`${value.month} 1, ${value.year}`)
    //                 setValue('date', date.toISOString().split('T')[0])
    //             }
    //         }
    //     })
    //     return () => subscription.unsubscribe()
    // }, [watch, setValue])

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
                            onChange={(e) => handleFileChange(e, 'thumbnail')}
                            label="Thumbnail"
                            className="lg:w-6/12"
                            inputClassName={`${
                                previewImages.thumbnail &&
                                previewImages.thumbnail.length !== 0
                                    ? 'sr-only'
                                    : ''
                            }`}
                            id="thumbnail"
                            accept=".jpg,.png"
                            error={errors?.thumbnail?.message}
                        />
                        {previewImages.thumbnail && (
                            <div className="w-6/12 relative">
                                {previewImages.thumbnail.map((src, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={src}
                                            alt="Thumbnail preview"
                                            width={300}
                                            height={200}
                                            className="w-full h-fit object-cover border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleImageRemove(
                                                    'thumbnail',
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
                    <TextInput
                        {...register('desc')}
                        label="Deskripsi"
                        id="desc"
                        className="lg:w-6/12"
                        type="text"
                        placeholder="Masukan deskripsi projek"
                        required
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
                    <SelectInput
                        {...register('tools')}
                        label="Perangkat"
                        id="tools"
                        className="lg:w-6/12"
                        error={errors?.tools?.message}
                    >
                        <option value="">Pilih perangkat</option>
                        {categoryOptions.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.label}
                            </option>
                        ))}
                    </SelectInput>
                    <div className="w-6/12 flex flex-col gap-1.5">
                        <div className="w-full grid grid-cols-2 gap-6">
                            <SelectInput
                                // {...register('month')}
                                label="Bulan"
                                id="month"
                                error={``}
                                // error={errors?.date?.message}
                            >
                                <option value="">Pilih bulan pengerjaan</option>
                                {monthOptions.map((item, index) => (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                ))}
                            </SelectInput>
                            <SelectInput
                                // {...register('year')}
                                label="Tahun"
                                id="year"
                                error={``}
                                // error={errors?.date?.message}
                            >
                                <option value="">Pilih tahun pengerjaan</option>
                                {yearOptions.map((item, index) => (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                ))}
                            </SelectInput>
                        </div>
                    </div>
                    <input type="hidden" {...register('date')} />
                    <div className="h-fit flex flex-col gap-1.5">
                        <FileInput
                            {...register('photos')}
                            onChange={(e) => handleFileChange(e, 'photos')}
                            label="Gambar Lain"
                            className="lg:w-6/12"
                            id="photos"
                            accept=".jpg,.png"
                            multiple
                            error={errors?.photos?.message}
                            inputClassName={`${
                                previewImages.photos &&
                                previewImages.photos.length !== 0
                                    ? 'sr-only'
                                    : ''
                            }`}
                        />
                        {previewImages.photos && (
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
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
