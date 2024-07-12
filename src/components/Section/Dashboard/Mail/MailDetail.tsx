'use client'

import mailServices from '@/services/mails'
import { useEffect, useState } from 'react'
import ActionLayout from '@/components/Layout/ActionLayout'
import Dropdown from '@/components/Other/Dropdown'
import { RxDotsVertical } from 'react-icons/rx'
import {
    format,
    differenceInMinutes,
    differenceInSeconds,
    differenceInHours,
    differenceInDays,
} from 'date-fns'
import { id } from 'date-fns/locale'
import Image from 'next/image'
import MailSkeleton from '@/components/Skeleton/MailSkeleton'

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

    function formatDate(seconds: number) {
        const date = new Date(seconds * 1000)
        const now = new Date()
        const dayDifference = differenceInDays(now, date)
        const hourDifference = differenceInHours(now, date)
        const minuteDifference = differenceInMinutes(now, date)
        const secondDifference = differenceInSeconds(now, date)

        if (dayDifference < 30) {
            if (hourDifference < 24) {
                if (minuteDifference < 60) {
                    if (secondDifference < 60) {
                        return `${format(date, 'eee, dd MMM yyyy, HH:mm', {
                            locale: id,
                        })} (${secondDifference} detik yang lalu)`
                    } else {
                        return `${format(date, 'eee, dd MMM yyyy, HH:mm', {
                            locale: id,
                        })} (${minuteDifference} menit yang lalu)`
                    }
                } else {
                    return `${format(date, 'eee, dd MMM yyyy, HH:mm', {
                        locale: id,
                    })} (${hourDifference} jam yang lalu)`
                }
            } else {
                return `${format(date, 'eee, dd MMM yyyy, HH:mm', {
                    locale: id,
                })} (${dayDifference} hari yang lalu)`
            }
        } else {
            return format(date, 'eee, dd MMM yyyy, HH:mm', { locale: id })
        }
    }

    return (
        <ActionLayout
            returnLink={`/dashboard/mails`}
            loading={loading}
            loadingSkeleton={<MailSkeleton />}
        >
            <ActionLayout.Header
                title={`Pesan dari ${mail?.name}`}
                desc="Pastikan perubahan informasi kontak yang akan
                            ditampilkan kepada pengguna telah sesuai dengan yang
                            diinginkan."
            />
            <ActionLayout.Content className="bg-white rounded-md w-full h-fit shadow-sm px-6 pt-4 pb-8">
                <div className="w-full flex justify-between h-fit">
                    <div className="h-fit w-fit flex gap-2.5">
                        <div className="flex flex-grow aspect-square items-center justify-center">
                            <Image
                                src={'/img/avatar/default.png'}
                                alt="Default Avatar"
                                height={100}
                                width={100}
                                className="w-full h-fit aspect-square rounded-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm lg:text-base font-semibold text-black">
                                {mail?.name}
                            </span>
                            <span className="text-xs lg:text-sm font-medium text-stone-700">
                                {mail?.email}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="text-sm font-medium">
                            {formatDate(mail?.created_at.seconds ?? 0)}
                        </span>
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
