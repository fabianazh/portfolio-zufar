'use client'

import TableLayout from '@/components/Layout/TableLayout'
import Dropdown from '@/components/Other/Dropdown'
import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import contactServices from '@/services/contacts'
import { useEffect, useState } from 'react'
import { RxDotsVertical } from 'react-icons/rx'

export default function ContactList() {
    const [contacts, setContacts] = useState<Contact[]>([])
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

    if (error) {
        return <></>
    }

    return (
        <>
            <TableLayout>
                <TableLayout.Header
                    title="List Kontak"
                    desc="Anda dapat melihat, dan mengubah informasi kontak
                            yang akan ditampilkan kepada pengguna."
                />
                <TableLayout.Content
                    isLoading={loading}
                    isEmpty={contacts.length < 1}
                    emptyMessage="Belum ada data kontak."
                >
                    <Table>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header className="w-1/12 text-center">
                                    #
                                </Table.Header>
                                <Table.Header className="w-2/12">
                                    Jenis Kontak
                                </Table.Header>
                                <Table.Header className="w-3/12">
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
                                                {contact.type}
                                            </Table.Data>
                                            <Table.Data className="w-3/12">
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
                                                        <Dropdown.Item
                                                            href={`/dashboard/contacts/${contact.id}/edit`}
                                                        >
                                                            Ubah
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
                </TableLayout.Content>
            </TableLayout>
        </>
    )
}
