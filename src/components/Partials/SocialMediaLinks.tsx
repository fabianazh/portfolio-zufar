'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs'

export default function SocialMediaLinks() {
    const pathname = usePathname()
    return (
        <>
            <div
                className={`${
                    pathname.startsWith('/dashboard') ? 'hidden' : 'flex'
                } w-full gap-2.5 items-center`}
            >
                <Link href={'https://www.facebook.com/zufar.ali.393'}>
                    <BsFacebook />
                </Link>
                <Link href={'https://www.instagram.com/zufarrr._'}>
                    <BsInstagram />
                </Link>
                <Link href={'https://www.linkedin.com/in/zufar-ms'}>
                    <BsLinkedin />
                </Link>
            </div>
        </>
    )
}
