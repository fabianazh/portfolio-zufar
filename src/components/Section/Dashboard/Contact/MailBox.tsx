'use client'

import NotFound from '@/components/Other/NotFound'
import Table from '@/components/Other/Table'
import Heading from '@/components/Typography/Heading'
import { useEffect, useState } from 'react'
import { RxDotsVertical } from 'react-icons/rx'

export default function MailBox() {
    const [mails, setMails] = useState<Contact[] | null | undefined>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // useEffect(() => {
    //     async function fetchMails() {
    //         try {
    //             const { data } = await mailservices.getAllMails()
    //             setMails(data.data)
    //         } catch (error) {
    //             setError(true)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchMails()
    // }, [])

    if (error || !mails) {
        return <NotFound message="Belum ada pesan masuk." />
    }

    return (
        <>
            <section className="w-full h-auto flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <Heading>Pesan Masuk</Heading>
                    <div className="w-full h-fit flex justify-between gap-6">
                        <span className="w-full">
                            Anda dapat melihat dan menghapus pesan masuk yang
                            dikirimkan oleh pengguna.
                        </span>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-4">
                    {loading ? (
                        <div>loading</div>
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
                                    {mails.map((contact, index) => {
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
                                                    <RxDotsVertical />
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
