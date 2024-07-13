'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import contactServices from '@/services/contacts'

export default function SocialMediaLinks() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(false)

    const pathname = usePathname()

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

    const facebook = contacts.find((contact) => contact.id === 'facebook')
    const instagram = contacts.find((contact) => contact.id === 'instagram')
    const linkedin = contacts.find((contact) => contact.id === 'linkedin')

    return (
        <>
            <div
                className={`${
                    pathname.startsWith('/dashboard') ? 'hidden' : 'flex'
                } w-full gap-2.5 items-center`}
            >
                <Link href={facebook?.link ?? ''}>
                    <BsFacebook />
                </Link>
                <Link href={instagram?.link ?? ''}>
                    <BsInstagram />
                </Link>
                <Link href={linkedin?.link ?? ''}>
                    <BsLinkedin />
                </Link>
            </div>
        </>
    )
}
