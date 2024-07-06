'use client'

import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import TableSkeleton from '@/components/Skeleton/TableSkeleton'
import Heading from '@/components/Typography/Heading'
import contactServices from '@/services/contacts'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RxDotsVertical } from 'react-icons/rx'

export default function ContactInfo() {
    const [contacts, setContacts] = useState<Contact[] | null | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchContacts() {
            try {
                const { data } = await contactServices.getAllContacts()
                setContacts(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchContacts()
    }, [])

    if (error || !contacts) {
        return <NotFound message="Belum ada data kontak." />
    }

    return (
        <>
            <section className="w-full h-auto flex flex-col gap-8 mb-14">
                <div className="flex flex-col gap-1">
                    <Heading className="normal-case">Info Kontak</Heading>
                    <div className="w-full h-fit flex justify-between gap-6">
                        <span className="w-full">
                            Anda dapat melihat, dan mengubah informasi kontak
                            yang akan ditampilkan kepada pengguna.
                        </span>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-4">
                    {loading ? (
                        <TableSkeleton />
                    ) : (
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header className="w-1/12 text-center">
                                        #
                                    </Table.Header>
                                    <Table.Header className="w-2/12">
                                        Nama
                                    </Table.Header>
                                    <Table.Header className="w-4/12">
                                        Nama Tampilan
                                    </Table.Header>
                                    <Table.Header className="w-4/12">
                                        Link
                                    </Table.Header>
                                    <Table.Header className="w-1/12 text-center">
                                        Aksi
                                    </Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <>
                                    {contacts.map((contact, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Data className="w-1/12 text-center">
                                                    {index + 1}
                                                </Table.Data>
                                                <Table.Data className="w-2/12">
                                                    {contact.name}
                                                </Table.Data>
                                                <Table.Data className="w-4/12">
                                                    {contact.displayName}
                                                </Table.Data>
                                                <Table.Data className="w-4/12">
                                                    {contact.link}
                                                </Table.Data>
                                                <Table.Data className="w-1/12 grid place-items-center">
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <RxDotsVertical />
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Items>
                                                            <Dropdown.Item>
                                                                <Link
                                                                    href={`/dashboard/contact/${contact.id}/edit`}
                                                                >
                                                                    Ubah
                                                                </Link>
                                                            </Dropdown.Item>
                                                        </Dropdown.Items>
                                                    </Dropdown>
                                                </Table.Data>
                                            </Table.Row>
                                        )
                                    })}
                                </>
                            </Table.Body>
                        </Table>
                    )}
                </div>
            </section>
        </>
    )
}
