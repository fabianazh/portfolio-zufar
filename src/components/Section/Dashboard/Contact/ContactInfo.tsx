'use client'

import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import Heading from '@/components/Typography/Heading'
import contactServices from '@/services/contacts'
import { useEffect, useState } from 'react'

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
            <section className="w-full h-auto flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <Heading>Info Kontak</Heading>
                    <div className="w-full h-fit flex justify-between gap-6">
                        <span className="w-full">
                            Anda dapat melihat, mengubah, dan menghapus
                            informasi kontak yang akan ditampilkan kepada
                            pengguna.
                        </span>
                        <span>aosdamsdkmdkm</span>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-4">
                    {loading ? (
                        <div>loading</div>
                    ) : (
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>No</Table.Header>
                                    <Table.Header>Nama</Table.Header>
                                    <Table.Header>Nama Tampilan</Table.Header>
                                    <Table.Header>Link</Table.Header>
                                    <Table.Header>Aksi</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <>
                                    {contacts.map((contact, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <div>{index + 1}</div>
                                                <div>{contact.name}</div>
                                                <div>{contact.displayName}</div>
                                                <div>{contact.link}</div>
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
