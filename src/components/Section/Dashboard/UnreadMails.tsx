'use client'

import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import mailServices from '@/services/mails'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import TableSkeleton from '@/components/Skeleton/TableSkeleton'
import Empty from '@/components/Other/Empty'
import PrimaryButton from '@/components/Button/PrimaryButton'
import formatDate from '@/libs/utils/formatDate'

export default function UnreadMails() {
    const [mails, setMails] = useState<Mail[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { simpleFormatDate } = formatDate()

    useEffect(() => {
        async function fetchMails() {
            try {
                const { data } = await mailServices.getAllMails()
                setMails(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchMails()
    }, [])

    if (error) {
        return <NotFound message="Semua pesan telah dibaca." />
    }

    const unreadMails = mails
        .filter((mail) => mail.isUnread === true)
        .slice(0, 5)

    return (
        <>
            <section className="w-full flex flex-col gap-3 h-fit">
                <div className="w-full flex justify-between lg:items-end gap-6">
                    <div className="w-full flex flex-col">
                        <h2 className="text-2xl font-semibold">
                            Pesan belum dibaca
                        </h2>
                        <span className="font-medium text-sm lg:text-base">
                            Periksa pesan yang belum terbaca dari pengguna.
                        </span>
                    </div>
                    <PrimaryButton
                        theme="white"
                        href={`/dashboard/mails`}
                        className="shrink-0 truncate shadow-none"
                    >
                        Lihat Semua
                    </PrimaryButton>
                </div>
                {loading ? (
                    <TableSkeleton />
                ) : unreadMails.length < 1 ? (
                    <Empty message="Semua pesan telah dibaca." />
                ) : (
                    <Table className="py-0 px-0 overflow-hidden gap-0">
                        <Table.Head className="py-3 px-2">
                            <Table.Row>
                                <Table.Header className="w-1/12 text-center">
                                    #
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Nama
                                </Table.Header>
                                <Table.Header className="w-2/12 hidden lg:flex">
                                    Email
                                </Table.Header>
                                <Table.Header className="w-4/12">
                                    Pesan
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Tanggal
                                </Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body className="gap-0 pt-0">
                            <>
                                {mails.map((mail, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            href={`/dashboard/mails/${mail.id}`}
                                        >
                                            <Table.Row
                                                className={`py-2 px-2 transition-colors duration-300 ${
                                                    mail.isUnread
                                                        ? 'hover:bg-stone-50'
                                                        : 'bg-stone-100 hover:bg-stone-50'
                                                }`}
                                            >
                                                <Table.Data className="w-1/12 text-center">
                                                    {index + 1}
                                                </Table.Data>
                                                <Table.Data className="w-2/12 truncate">
                                                    {mail.name}
                                                </Table.Data>
                                                <Table.Data className="w-2/12 truncate hidden lg:flex">
                                                    {mail.email}
                                                </Table.Data>
                                                <Table.Data className="w-4/12 truncate">
                                                    {mail.message}
                                                </Table.Data>
                                                <Table.Data className="w-2/12 shrink-0">
                                                    {simpleFormatDate(
                                                        mail.created_at.seconds
                                                    )}
                                                </Table.Data>
                                            </Table.Row>
                                        </Link>
                                    )
                                })}
                            </>
                        </Table.Body>
                    </Table>
                )}
            </section>
        </>
    )
}
