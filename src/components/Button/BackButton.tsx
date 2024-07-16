import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

export default function BackButton({ href }: { href: string }) {
    return (
        <Link
            href={href}
            className="flex w-fit h-fit gap-2 items-center text-lg"
        >
            <IoArrowBack />
            <span className="font-medium">Kembali</span>
        </Link>
    )
}
