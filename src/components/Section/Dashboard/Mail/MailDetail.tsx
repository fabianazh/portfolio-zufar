'use client'

import mailServices from '@/services/mails'
import { useEffect, useState } from 'react'
import ActionLayout from '@/components/Layout/ActionLayout'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'

export default function MailDetail({ mailId }: { mailId: string }) {
    const [mail, setMail] = useState<Mail | null | undefined>(null)
    const [loading, setLoading] = useState(true)

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

    return (
        <ActionLayout returnLink={`/dashboard/mails`} loading={loading}>
            <ActionLayout.Header
                title={`Pesan dari ${mail?.name}`}
                desc="Pastikan perubahan informasi kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content className="bg-white rounded-md w-full h-fit shadow-sm p-6 pb-10">
                <div className="w-full flex justify-between h-fit">
                    <div className="h-fit w-fit flex gap-1">
                        <div className="flex flex-grow aspect-square"></div>
                        <div className="flex flex-col text-xs lg:text-sm font-medium">
                            <span>{mail?.name}</span>
                            <span>{mail?.email}</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items center">
                        <span className="">{mail?.created_at}</span>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <RxDotsVertical />
                            </Dropdown.Trigger>
                            <Dropdown.Items>
                                <Dropdown.Item>Hapus</Dropdown.Item>
                            </Dropdown.Items>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <span>{mail?.message}</span>
                </div>
            </ActionLayout.Content>
        </ActionLayout>
    )
}
