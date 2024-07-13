'use client'

import Link from 'next/link'
import Heading from '@/components/Typography/Heading'
import { useEffect, useState } from 'react'
import contactServices from '@/services/contacts'

export default function ContactInfo() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchContacts() {
            try {
                const { data } = await contactServices.getAllContacts()
                setContacts(data.data)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }

        fetchContacts()
    }, [])

    const email = contacts.find((contact) => contact.id === 'email')
    const whatsapp = contacts.find((contact) => contact.id === 'whatsapp')

    return (
        <section className="w-full flex flex-col px-0 lg:px-24 items-start gap-3 mb-10">
            <Heading>Kontak Saya</Heading>
            <span>
                Saya sangat tertarik untuk mendiskusikan peluang karir lebih
                lanjut dan bagaimana saya dapat berkontribusi pada proyek-proyek
                Anda. Jangan ragu untuk menghubungi saya melalui kontak atau
                formulir di bawah ini.
            </span>
            <div className="flex gap-2">
                <Link
                    target={'_blank'}
                    href={`mailto:${email?.link}?subject=${encodeURIComponent(
                        'Subject Anda'
                    )}&body=${encodeURIComponent(
                        'Halo, saya tertarik untuk mendiskusikan lebih lanjut...'
                    )}`}
                >
                    {email?.displayName}
                </Link>
                {!loading && <span> | </span>}
                <Link
                    target={'_blank'}
                    href={`${whatsapp?.link}?text=${encodeURIComponent(
                        'Halo, saya tertarik untuk mendiskusikan lebih lanjut...'
                    )}`}
                >
                    {whatsapp?.displayName}
                </Link>
            </div>
        </section>
    )
}
