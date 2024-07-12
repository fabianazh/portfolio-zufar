import Heading from '@/components/Typography/Heading'
import FormSkeleton from '@/components/Skeleton/FormSkeleton'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

export default function ActionLayout({
    className,
    children,
    returnLink,
    loading,
    loadingSkeleton = <FormSkeleton />,
}: {
    className?: string
    children: React.ReactNode
    returnLink: string
    loading: boolean
    loadingSkeleton?: React.ReactNode
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
                {!loading ? loadingSkeleton : children}
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

ActionLayout.Header = Header
ActionLayout.Content = Content
