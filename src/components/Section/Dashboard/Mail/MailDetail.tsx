'use client'

import mailServices from '@/services/mails'
import { useEffect, useState } from 'react'
import ActionLayout from '@/components/Layout/ActionLayout'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import Image from 'next/image'
import MailDetailSkeleton from '@/components/Skeleton/MailDetailSkeleton'
import { useRouter } from 'next/navigation'
import { useToast } from '@/context/ToastContext'
import WarnModal from '@/components/Modal/WarnModal'
import BackButton from '@/components/Button/BackButton'
import formatDate from '@/libs/utils/formatDate'

export default function MailDetail({ mailId }: { mailId: string }) {
    const [mail, setMail] = useState<Mail | null | undefined>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    const router = useRouter()
    const { showToast } = useToast()
    const { detailedFormatDate } = formatDate()

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    useEffect(() => {
        async function getMailDetail() {
            try {
                const { data } = await mailServices.getMailById(mailId)
                setMail(data.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        getMailDetail()
    }, [mailId])

    async function handleDelete(id: string) {
        try {
            setSubmitLoading(true)
            const response = await mailServices.deleteMail(id)
            if (response.data.status === true) {
                showToast(response.data.message, { type: 'success' })
                router.push('/dashboard/mails')
            } else {
                showToast(response.data.message, { type: 'error' })
            }
        } catch (error) {
            showToast('Error', { type: 'error' })
        } finally {
            setSubmitLoading(false)
            closeModal()
        }
    }

    return (
        <ActionLayout
            isLoading={loading}
            isEmpty={!mail}
            emptyMessage={'Tidak dapat menemukan pesan.'}
            loadingSkeleton={<MailDetailSkeleton />}
            returnLink="/dashboard/mails"
        >
            <ActionLayout.Buttons>
                <BackButton href={'/dashboard/mails'} />
            </ActionLayout.Buttons>
            <ActionLayout.Header
                title={`Pesan dari ${mail?.name}`}
                desc="Anda dapat menandai dan menghapus pesan yang dikirim dari pengguna."
            />
            <ActionLayout.Content className="bg-white rounded-md w-full h-fit shadow-sm px-6 pt-4 pb-8">
                <div className="w-full flex justify-between h-fit">
                    <div className="h-fit w-fit flex gap-2.5">
                        <div className="flex flex-grow aspect-square shrink-0 items-center justify-center">
                            <Image
                                src={'/img/avatar/default.png'}
                                alt="Default Avatar"
                                height={100}
                                width={100}
                                className="w-full h-fit aspect-square rounded-full shrink-0"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-black">
                                {mail?.name}
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-stone-700">
                                {mail?.email}
                            </span>
                            <span className="block lg:hidden text-xs lg:text-sm font-medium">
                                {detailedFormatDate(
                                    mail?.created_at.seconds ?? 0
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="hidden lg:block text-sm font-medium">
                            {detailedFormatDate(mail?.created_at.seconds ?? 0)}
                        </span>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <RxDotsVertical />
                            </Dropdown.Trigger>
                            <Dropdown.Items>
                                <Dropdown.Item>Tandai</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item
                                    as="delete"
                                    onClick={() => openModal()}
                                >
                                    Hapus
                                </Dropdown.Item>
                            </Dropdown.Items>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <span>{mail?.message}</span>
                </div>
            </ActionLayout.Content>
            <WarnModal
                isOpen={isModalOpen}
                close={closeModal}
                confirmButtonColor="red"
                title={`Apakah kamu yakin ingin menghapus pesan dari ${mail?.name}?`}
                content={`Dengan menghapus pesan ini, seluruh data dan aset dari pesan ini akan dihapus permanen dan tidak dapat dikembalikan.`}
                onSubmit={() => handleDelete(mail?.id ?? '')}
                loading={submitLoading}
            />
        </ActionLayout>
    )
}
