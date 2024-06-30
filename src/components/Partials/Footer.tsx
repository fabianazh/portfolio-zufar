import Link from 'next/link'
import SocialMediaLinks from '@/components/Partials/SocialMediaLinks'

export default function Footer() {
    return (
        <>
            <div className="w-full flex flex-col gap-6">
                <SocialMediaLinks />
                <div className="w-full text-sm lg:text-xs font-medium">
                    <span>
                        &copy; {new Date().getFullYear()}{' '}
                        <Link href={'https://fabianazh.vercel.app'}>
                            Fabianazh
                        </Link>
                        . All rights reserved.
                    </span>
                </div>
            </div>
        </>
    )
}
