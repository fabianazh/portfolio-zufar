import Heading from '@/components/Typography/Heading'
import TableSkeleton from '@/components/Skeleton/TableSkeleton'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

export default function FormLayout({
    className,
    children,
    returnLink,
    loading,
}: {
    className?: string
    children: React.ReactNode
    returnLink: string
    loading: boolean
}) {
    return (
        <>
            <section
                className={`w-full h-auto flex flex-col gap-8 mb-14 ${className}`}
            >
                <div className="w-full h-fit items-center justify-between flex">
                    <Link
                        href={returnLink}
                        className="flex w-fit h-fit gap-2 items-center text-lg"
                    >
                        <IoArrowBack />
                        <span className="font-medium">Kembali</span>
                    </Link>
                </div>
                {loading ? <TableSkeleton /> : <>{children}</>}
            </section>
        </>
    )
}

export function Header({ title, desc }: { title: string; desc: string }) {
    return (
        <>
            <div className="flex flex-col gap-1">
                <Heading className="normal-case">{title}</Heading>
                <div className="w-full h-fit flex justify-between gap-6">
                    <span className="w-full">{desc}</span>
                </div>
            </div>
        </>
    )
}

export function Content({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col gap-4 ${className}`}>
                {children}
            </div>
        </>
    )
}

FormLayout.Header = Header
FormLayout.Content = Content
