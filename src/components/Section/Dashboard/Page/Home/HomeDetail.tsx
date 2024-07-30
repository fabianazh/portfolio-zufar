'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import HomeSkeleton from '@/components/Skeleton/HomeSkeleton'
import ImageDetailModal from '@/components/Modal/ImageDetailModal'
import ActionLayout from '@/components/Layout/ActionLayout'
import pageServices from '@/services/pages'
import BackButton from '@/components/Button/BackButton'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import FileInput from '@/components/Form/FileInput'
import TextareaInput from '@/components/Form/TextareaInput'

export default function HomeDetail() {
    const [homePage, setHomePage] = useState<Home | null | undefined>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState({ photo: '', alt: '' })
    const [previewMode, setPreviewMode] = useState<boolean>(false)

    useEffect(() => {
        async function fetchHome() {
            try {
                const { data } = await pageServices.getPageById('home')
                setHomePage(data.data)
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

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
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
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="w-7 lg:w-8 h-7 lg:h-8 grid place-items-center rounded-full bg-stone-200 transition-all duration-300 bg-stone-100 shadow-sm">
                                <RxDotsVertical />
                            </div>
                        </Dropdown.Trigger>
                        <Dropdown.Items>
                            <Dropdown.Item
                                onClick={() => setPreviewMode(!previewMode)}
                            >
                                {previewMode ? 'Mode Form' : 'Mode Preview'}
                            </Dropdown.Item>
                            <Dropdown.Item
                                href={`/dashboard/pages/${homePage?.id}/edit`}
                            >
                                Edit
                            </Dropdown.Item>
                        </Dropdown.Items>
                    </Dropdown>
                </ActionLayout.Buttons>
                {!previewMode && (
                    <ActionLayout.Header
                        title={`Detail Halaman Beranda`}
                        desc="Anda dapat mengubah informasi halaman beranda yang akan ditampilkan kepada pengguna."
                    />
                )}
                <ActionLayout.Content
                    className={`w-full h-fit flex flex-col ${
                        previewMode ? 'gap-2.5' : ' gap-3 lg:gap-5 mb-10'
                    }`}
                >
                    {previewMode ? (
                        <>
                            <div className="relative w-full h-72 lg:h-[28rem] flex gap-3 mb-2 lg:mb-5">
                                <div className="w-3/12 shrink-0 h-full relative">
                                    <Image
                                        src="/img/z/z7.png"
                                        alt="Zufar"
                                        width={300}
                                        height={800}
                                        onClick={() => {
                                            openModal()
                                            setModalData({
                                                photo: `${homePage?.primaryPhoto}`,
                                                alt: `Zufar Syabana`,
                                            })
                                        }}
                                        className="w-full top-0 left-0 absolute h-full object-cover"
                                    />
                                </div>
                                <div className="w-9/12 h-full relative">
                                    <Image
                                        src="/img/bg/bg1.avif"
                                        alt="Zufar"
                                        layout="fill"
                                        onClick={() => {
                                            openModal()
                                            setModalData({
                                                photo: `${homePage?.secondaryPhoto}`,
                                                alt: `Zufar Syabana`,
                                            })
                                        }}
                                        className="absolute top-0 left-0 object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="block text-2xl lg:text-3xl font-extrabold lg:font-bold">
                                    {homePage?.heading}
                                </span>
                                <span className="block text-lg lg:text-2xl font-semibold">
                                    {homePage?.subHeading}
                                </span>
                            </div>

                            <div className="w-full lg:w-full flex h-fit">
                                <span className="text-base font-base lg:font-medium">
                                    {homePage?.desc}
                                </span>
                            </div>
                            {/* End Images */}
                        </>
                    ) : (
                        <>
                            <TextareaInput
                                label="Heading"
                                id="heading"
                                className="lg:w-6/12"
                                rows={2}
                                defaultValue={homePage?.heading}
                                readOnly
                            />
                            <TextareaInput
                                label="Sub Heading"
                                id="subHeading"
                                className="lg:w-6/12"
                                rows={2}
                                defaultValue={homePage?.subHeading}
                                readOnly
                            />
                            <TextareaInput
                                label="Deskripsi"
                                id="desc"
                                className="lg:w-6/12"
                                rows={5}
                                defaultValue={homePage?.desc}
                                readOnly
                            />
                            <div className="w-9/12 flex gap-6">
                                <FileInput
                                    label="Foto 1"
                                    id="primaryPhoto"
                                    accept=".jpg,.png"
                                    className="w-3/12 lg:w-3/12 shrink-0"
                                    previewClassName="w-full lg:w-full"
                                    inputClassName="w-full lg:w-full"
                                    preview={[homePage?.primaryPhoto ?? '']}
                                />
                                <FileInput
                                    label="Foto 2"
                                    id="secondaryPhoto"
                                    accept=".jpg,.png"
                                    className="w-9/12 lg:w-9/12 shrink-0"
                                    previewClassName="w-full lg:w-full"
                                    inputClassName="w-full lg:w-full"
                                    preview={[homePage?.secondaryPhoto ?? '']}
                                />
                            </div>
                        </>
                    )}
                </ActionLayout.Content>
            </ActionLayout>
            {/* Modal */}
            <ImageDetailModal
                isOpen={isModalOpen}
                close={closeModal}
                photo={`${modalData.photo}`}
                alt={modalData.alt}
            />
            {/* End Modal */}
        </>
    )
}
