'use client'

import TableLayout from '@/components/Layout/TableLayout'
import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import mailServices from '@/services/mails'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RxDotsVertical } from 'react-icons/rx'

export default function MailBox() {
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
        return <NotFound message="Belum ada data pesan." />
    }

    return (
        <>
            <TableLayout>
                <TableLayout.Header
                    title="Pesan Masuk"
                    desc="Anda dapat melihat dan menghapus pesan yang dikirim dari pengguna."
                />
                <TableLayout.Content loading={loading}>
                    <Table className="py-0 px-0 overflow-hidden">
                        <Table.Head className="py-3">
                            <Table.Row>
                                <Table.Header className="w-1/12 text-center">
                                    #
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Nama
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Email
                                </Table.Header>
                                <Table.Header className="w-6/12">
                                    Pesan
                                </Table.Header>
                                {/* <Table.Header className="w-1/12 text-center">
                                    Aksi
                                </Table.Header> */}
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
                                                className={`py-2 px-0 transition-colors duration-300 ${
                                                    mail.isUnread
                                                        ? 'bg-stone-100'
                                                        : 'hover:bg-stone-100'
                                                }`}
                                            >
                                                <Table.Data className="w-1/12 text-center">
                                                    {index + 1}
                                                </Table.Data>
                                                <Table.Data className="w-2/12 truncate">
                                                    {mail.name}
                                                </Table.Data>
                                                <Table.Data className="w-2/12 truncate">
                                                    {mail.email}
                                                </Table.Data>
                                                <Table.Data className="w-6/12 truncate">
                                                    {mail.message}
                                                </Table.Data>
                                            </Table.Row>
                                        </Link>
                                    )
                                })}
                            </>
                        </Table.Body>
                    </Table>
                </TableLayout.Content>
            </TableLayout>
        </>
    )
}
