'use client'

import NotFound from '@/components/Other/NotFound'
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
                        <table>
                            <thead>
                                <tr className="w-full text-left">
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Nama Tampilan</th>
                                    <th>Link</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {contacts.map((contact, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{contact.name}</td>
                                                <td>{contact.displayName}</td>
                                                <td>{contact.link}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </>
    )
}
