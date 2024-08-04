'use client'

import Link from 'next/link'
import Heading from '@/components/Typography/Heading'
import { useEffect, useState } from 'react'
import pageServices from '@/services/pages'
import ContactPageSkeleton from '@/components/Skeleton/ContactPageSkeleton'

export default function ContactInfo() {
    const [contactPage, setContactPage] = useState<Page | null | undefined>(
        null
    )
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        async function fetchContacts() {
            try {
                const { data } = await pageServices.getPageById('contact')
                setContactPage(data.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchContacts()
    }, [])

    return (
        <section className="w-full flex flex-col px-0 lg:px-24 items-start gap-3 mb-10">
            {loading ? (
                <ContactPageSkeleton />
            ) : (
                <>
                    <Heading>Kontak Saya</Heading>
                    <span>{contactPage?.desc}</span>
                    <div className="flex gap-2">
                        <Link
                            target={'_blank'}
                            href={contactPage?.primaryContact?.link}
                        >
                            {contactPage?.primaryContact?.displayName}
                        </Link>
                        <span> | </span>
                        <Link
                            target={'_blank'}
                            href={contactPage?.secondaryContact?.link}
                        >
                            {contactPage?.secondaryContact?.displayName}
                        </Link>
                    </div>
                </>
            )}
        </section>
    )
}
