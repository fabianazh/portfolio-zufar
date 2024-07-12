'use client'

import TableLayout from '@/components/Layout/TableLayout'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import mailServices from '@/services/mails'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
    format,
    isToday,
    isThisYear,
    isSameYear,
    differenceInHours,
} from 'date-fns'
import TableSkeleton from '@/components/Skeleton/TableSkeleton'
import PrimaryButton from '@/components/Button/PrimaryButton'

export default function UnreadMails() {
    const [mails, setMails] = useState<Mail[] | null | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

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

    if (error || !mails) {
        return <NotFound message="Semua pesan telah dibaca." />
    }

    function formatDate(timestamp: { seconds: number; nanoseconds: number }) {
        const date = new Date(timestamp.seconds * 1000)
        const now = new Date()

        if (isToday(date)) {
            return format(date, 'HH:mm')
        } else if (isThisYear(date) && differenceInHours(now, date) >= 24) {
            return format(date, 'd MMM')
        } else if (isSameYear(date, now)) {
            return format(date, 'd MMM')
        } else {
            return format(date, 'dd/MM/yyyy')
        }
    }

    return (
        <>
            <section className="w-full flex flex-col gap-3 h-fit">
                <div className="w-full flex justify-between items-end gap-6">
                    <div className="w-full flex flex-col">
                        <h2 className="text-2xl font-semibold">
                            Pesan belum dibaca
                        </h2>
                        <span className="font-medium text-sm lg:text-base">
                            Periksa pesan yang belum terbaca dari pengguna.
                        </span>
                    </div>
                    <Link
                        href={`/dashboard/mails`}
                        className="text-[0.65rem] lg:text-xs h-fit py-2 px-4 bg-black text-white hover:bg-opacity-80 transition-all duration-300 rounded shrink-0 w-fit truncate inline-block"
                    >
                        Lihat Semua
                    </Link>
                </div>
                {loading ? (
                    <TableSkeleton />
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
                                {mails
                                    .filter((mail) => mail.isUnread === true)
                                    .slice(0, 5)
                                    .map((mail, index) => {
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
                                                        {formatDate(
                                                            mail.created_at
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
