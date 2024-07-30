'use client'

import pageServices from '@/services/pages'
import { useEffect, useState } from 'react'
import ActionLayout from '@/components/Layout/ActionLayout'
import TextInput from '@/components/Form/TextInput'
import TextareaInput from '@/components/Form/TextareaInput'
import RadioInput from '@/components/Form/RadioInput'
import PrimaryButton from '@/components/Button/PrimaryButton'
import BackButton from '@/components/Button/BackButton'
import Link from 'next/link'
import Heading from '@/components/Typography/Heading'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'

export default function ContactDetail() {
    const [contactPage, setContactPage] = useState<Page | null | undefined>(
        null
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [previewMode, setPreviewMode] = useState<boolean>(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await pageServices.getPageById('contact')
                setContactPage(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <ActionLayout
            isLoading={loading}
            isEmpty={!contactPage}
            emptyMessage="Tidak dapat menemukan halaman."
            returnLink="/dashboard/pages"
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
                            href={`/dashboard/pages/${contactPage?.id}/edit`}
                        >
                            Edit
                        </Dropdown.Item>
                    </Dropdown.Items>
                </Dropdown>
            </ActionLayout.Buttons>
            {!previewMode && (
                <ActionLayout.Header
                    title={`Edit Halaman Kontak`}
                    desc="Anda dapat mengubah informasi halaman kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
                />
            )}
            <ActionLayout.Content>
                {previewMode ? (
                    <>
                        <section className="w-full flex flex-col px-0 lg:px-24 items-start gap-3 mb-10">
                            <Heading>{contactPage?.title}</Heading>
                            <span>{contactPage?.desc}</span>
                            <div className="flex gap-2">
                                <Link
                                    target={'_blank'}
                                    href={contactPage?.primaryContact?.link}
                                >
                                    {contactPage?.primaryContact?.displayName}
                                </Link>
                                <span> | </span>
                                <Link
                                    target={'_blank'}
                                    href={contactPage?.secondaryContact?.link}
                                >
                                    {contactPage?.secondaryContact?.displayName}
                                </Link>
                            </div>
                        </section>
                    </>
                ) : (
                    <form className="w-full h-fit flex flex-col gap-6">
                        <TextInput
                            label="Judul Halaman"
                            id="title"
                            type="text"
                            placeholder="Masukan judul halaman"
                            readOnly
                            defaultValue={contactPage?.title}
                            className="lg:w-6/12"
                        />
                        <TextareaInput
                            label="Deskripsi Halaman"
                            id="desc"
                            rows={4}
                            defaultValue={contactPage?.desc}
                            className="lg:w-6/12"
                            readOnly
                        />
                        <RadioInput label="Kontak Pertama">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value={''}
                                    checked
                                    className="sr-only"
                                />
                                <span className="radio">
                                    {contactPage?.primaryContact.type}
                                </span>
                            </label>
                        </RadioInput>
                        <RadioInput label="Kontak Kedua">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value={''}
                                    checked
                                    className="sr-only"
                                />
                                <span className="radio">
                                    {contactPage?.secondaryContact.type}
                                </span>
                            </label>
                        </RadioInput>
                        <div className="w-full lg:w-6/12 grid grid-cols-2 gap-6">
                            <PrimaryButton
                                as="link"
                                href={`/dashboard/pages/contact/edit`}
                                theme="gray"
                                className="w-full grid place-items-center"
                            >
                                Edit
                            </PrimaryButton>
                        </div>
                    </form>
                )}
            </ActionLayout.Content>
        </ActionLayout>
    )
}
