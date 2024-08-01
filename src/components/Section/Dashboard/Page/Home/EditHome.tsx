'use client'

import { useEffect, useState, useRef } from 'react'
import ActionLayout from '@/components/Layout/ActionLayout'
import pageServices from '@/services/pages'
import BackButton from '@/components/Button/BackButton'
import PrimaryButton from '@/components/Button/PrimaryButton'
import FileInput from '@/components/Form/FileInput'
import TextareaInput from '@/components/Form/TextareaInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { homePageSchema } from '@/zodSchema/route'
import Loaders from '@/components/Other/Loader'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import { uploadFile } from '@/libs/firebase/service'
import * as z from 'zod'

type FormData = z.infer<typeof homePageSchema>

export default function HomeDetail() {
    const [homePage, setHomePage] = useState<Home | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [primaryPhotoPreview, setPrimaryPhotoPreview] = useState<string[]>([])
    const [secondaryPhotoPreview, setSecondaryPhotoPreview] = useState<
        string[]
    >([])
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(homePageSchema),
    })

    const router = useRouter()
    const { showToast } = useToast()
    const primaryPhotoRef = useRef<HTMLInputElement>(null)
    const secondaryPhotoRef = useRef<HTMLInputElement>(null)

    function handlePrimaryPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const files = e.target.files

        if (files) {
            const filePrimaryPhotoPreviews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            )
            setPrimaryPhotoPreview(filePrimaryPhotoPreviews)

            setValue('primaryPhoto', files)
        }
    }

    function handleRemovePrimaryPhotoPreview(index: number) {
        setPrimaryPhotoPreview((prev) => {
            const updatedPreviews = prev.filter((_, i) => i !== index)

            const currentFiles = getValues('primaryPhoto') as FileList
            if (!currentFiles) {
                return updatedPreviews
            }

            const newFileList = new DataTransfer()
            Array.from(currentFiles).forEach((file, i) => {
                if (i !== index) {
                    newFileList.items.add(file)
                }
            })

            setValue('primaryPhoto', newFileList.files)

            return updatedPreviews
        })
    }

    function handleSecondaryPhotoChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        e.preventDefault()
        const files = e.target.files

        if (files) {
            const fileSecondaryPhotoPreviews = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            )
            setSecondaryPhotoPreview(fileSecondaryPhotoPreviews)

            setValue('secondaryPhoto', files)
        }
    }

    function handleRemoveSecondaryPhotoPreview(index: number) {
        setSecondaryPhotoPreview((prev) => {
            const updatedPreviews = prev.filter((_, i) => i !== index)

            const currentFiles = getValues('secondaryPhoto') as FileList
            if (!currentFiles) {
                return updatedPreviews
            }

            const newFileList = new DataTransfer()
            Array.from(currentFiles).forEach((file, i) => {
                if (i !== index) {
                    newFileList.items.add(file)
                }
            })

            setValue('secondaryPhoto', newFileList.files)

            return updatedPreviews
        })
    }

    function resetForm() {
        reset()
        setPrimaryPhotoPreview([homePage?.primaryPhoto ?? ''] ?? [])
        setSecondaryPhotoPreview([homePage?.secondaryPhoto ?? ''] ?? [])
    }

    useEffect(() => {
        async function fetchHome() {
            try {
                const { data } = await pageServices.getPageById('home')
                setHomePage(data.data)
                setPrimaryPhotoPreview([data?.data?.primaryPhoto ?? ''])
                setSecondaryPhotoPreview([data?.data?.secondaryPhoto ?? ''])
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchHome()
    }, [])

    if (error) {
        return <></>
    }

    async function onSubmit(data: FormData) {
        try {
            const response = await pageServices.updatePage('home', data)

            const primaryPhotoFile = primaryPhotoRef.current?.files?.[0] ?? null
            const secondaryPhotoFile =
                secondaryPhotoRef.current?.files?.[0] ?? null

            if (response.data.status === true) {
                const pageId = response.data.pageId

                const uploadPromises: Promise<string | null>[] = []

                if (primaryPhotoFile) {
                    uploadPromises.push(
                        uploadFile('pages', pageId, primaryPhotoFile)
                    )
                }

                if (secondaryPhotoFile) {
                    uploadPromises.push(
                        uploadFile('pages', pageId, secondaryPhotoFile)
                    )
                }

                const uploadResults = await Promise.allSettled(uploadPromises)

                const photoUrls = uploadResults
                    .filter(
                        (
                            result
                        ): result is PromiseFulfilledResult<string | null> =>
                            result.status === 'fulfilled'
                    )
                    .map((result) => result.value)
                    .filter((url): url is string => url !== null)

                const updateData: any = {}
                if (photoUrls.length > 0) {
                    updateData.primaryPhoto = photoUrls.slice(0, 1)
                    if (photoUrls.length > 1) {
                        updateData.secondaryPhoto = photoUrls.slice(1)
                    }
                }

                if (Object.keys(updateData).length > 0) {
                    try {
                        const updateImage = await pageServices.updatePage(
                            pageId,
                            updateData
                        )

                        if (updateImage.data.status === true) {
                            showToast(
                                'Informasi halaman berhasil diperbarui!',
                                { type: 'success' }
                            )
                            router.push('/dashboard/pages')
                        } else {
                            showToast('Informasi halaman gagal diperbarui!', {
                                type: 'error',
                            })
                        }
                    } catch (error) {
                        showToast('Error saat memperbarui informasi halaman', {
                            type: 'error',
                        })
                    }
                } else {
                    showToast(response.data.message, { type: 'success' })
                    router.push('/dashboard/pages')
                }
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        }
    }

    return (
        <>
            <ActionLayout
                returnLink={'/dashboard/pages'}
                isLoading={loading}
                isEmpty={!homePage}
                emptyMessage="Halaman tidak ditemukan."
            >
                <ActionLayout.Buttons>
                    <BackButton href={'/dashboard/pages'} />
                </ActionLayout.Buttons>
                <ActionLayout.Header
                    title={`Edit Halaman Beranda`}
                    desc="Pastikan informasi halaman beranda yang akan ditampilkan kepada pengguna telah sesuai dengan yang diinginkan."
                />
                <ActionLayout.Content>
                    <form
                        action=""
                        method="post"
                        className={`w-full h-fit flex flex-col gap-6`}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FileInput
                            {...register('primaryPhoto')}
                            ref={primaryPhotoRef}
                            label="Foto 1"
                            id="primaryPhoto"
                            accept=".jpg,.png"
                            className="w-full lg:w-full"
                            previewClassName="w-6/12 lg:w-full"
                            preview={primaryPhotoPreview}
                            error={errors?.primaryPhoto?.message as string}
                            handleFileChange={handlePrimaryPhotoChange}
                            handleRemovePreview={
                                handleRemovePrimaryPhotoPreview
                            }
                        />
                        <FileInput
                            {...register('secondaryPhoto')}
                            ref={secondaryPhotoRef}
                            label="Foto 2"
                            id="secondaryPhoto"
                            accept=".jpg,.png"
                            className="w-full lg:w-full"
                            previewClassName="w-full lg:w-full"
                            preview={secondaryPhotoPreview}
                            error={errors?.secondaryPhoto?.message as string}
                            handleFileChange={handleSecondaryPhotoChange}
                            handleRemovePreview={
                                handleRemoveSecondaryPhotoPreview
                            }
                        />
                        <TextareaInput
                            {...register('heading')}
                            label="Heading"
                            id="heading"
                            className="lg:w-6/12"
                            rows={2}
                            defaultValue={homePage?.heading}
                            required
                            error={errors?.heading?.message}
                            placeholder="Masukan heading halaman"
                        />
                        <TextareaInput
                            {...register('subHeading')}
                            label="Sub Heading"
                            id="subHeading"
                            className="lg:w-6/12"
                            rows={4}
                            defaultValue={homePage?.subHeading}
                            required
                            error={errors?.subHeading?.message}
                            placeholder="Masukan sub heading halaman"
                        />
                        <TextareaInput
                            {...register('desc')}
                            label="Deskripsi"
                            id="desc"
                            className="lg:w-6/12"
                            rows={5}
                            defaultValue={homePage?.desc}
                            required
                            error={errors?.desc?.message}
                            placeholder="Masukan deskripsi halaman"
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
        </>
    )
}
