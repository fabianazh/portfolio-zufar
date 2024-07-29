'use client'

import { useEffect, useState } from 'react'
import ImageDetailModal from '@/components/Modal/ImageDetailModal'
import ActionLayout from '@/components/Layout/ActionLayout'
import pageServices from '@/services/pages'
import BackButton from '@/components/Button/BackButton'
import FileInput from '@/components/Form/FileInput'
import TextareaInput from '@/components/Form/TextareaInput'

export default function HomeDetail() {
    const [homeData, setHomeData] = useState<Home | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchHome() {
            try {
                const { data } = await pageServices.getPageById('home')
                setHomeData(data.data)
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
    return (
        <>
            <ActionLayout
                returnLink={'/dashboard/pages'}
                isLoading={loading}
                isEmpty={!homeData}
                emptyMessage="Halaman tidak ditemukan."
            >
                <ActionLayout.Buttons>
                    <BackButton href={'/dashboard/pages'} />
                </ActionLayout.Buttons>
                <ActionLayout.Header
                    title={`Edit Halaman Beranda`}
                    desc="Pastikan informasi halaman beranda yang akan ditampilkan kepada pengguna telah sesuai dengan yang diinginkan."
                />
                <ActionLayout.Content
                    className={`w-full h-fit flex flex-col gap-2.5`}
                >
                    <TextareaInput
                        label="Heading"
                        id="heading"
                        className="lg:w-6/12"
                        rows={2}
                        defaultValue={homeData?.heading}
                    />
                    <TextareaInput
                        label="Sub Heading"
                        id="subHeading"
                        className="lg:w-6/12"
                        rows={2}
                        defaultValue={homeData?.subHeading}
                    />
                    <TextareaInput
                        label="Deskripsi"
                        id="desc"
                        className="lg:w-6/12"
                        rows={5}
                        defaultValue={homeData?.desc}
                    />
                    <div className="w-9/12 flex gap-6">
                        <FileInput
                            label="Foto 1"
                            id="primaryPhoto"
                            accept=".jpg,.png"
                            className="w-3/12 lg:w-3/12 shrink-0"
                            previewClassName="w-full lg:w-full"
                            inputClassName="w-full lg:w-full"
                            preview={[homeData?.primaryPhoto ?? '']}
                        />
                        <FileInput
                            label="Foto 2"
                            id="secondaryPhoto"
                            accept=".jpg,.png"
                            className="w-9/12 lg:w-9/12 shrink-0"
                            previewClassName="w-full lg:w-full"
                            inputClassName="w-full lg:w-full"
                            preview={[homeData?.secondaryPhoto ?? '']}
                        />
                    </div>
                </ActionLayout.Content>
            </ActionLayout>
        </>
    )
}
