import Link from 'next/link'
import Heading from '@/components/Typography/Heading'
import { FaRegPenToSquare } from 'react-icons/fa6'

export default function Article({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col gap-2 ${className}`}>
                {children}
            </div>
        </>
    )
}

export function Title({
    className,
    children,
    editButton = false,
    editHref,
}: {
    className?: string
    children: React.ReactNode
    editButton?: boolean
    editHref?: string
}) {
    return (
        <>
            {editButton ? (
                <>
                    <div className="w-full items-center justify-between flex pr-1 group">
                        <Heading className={`text-xl lg:text-3xl ${className}`}>
                            {children}
                        </Heading>
                        <Link
                            href={editHref ?? ''}
                            className="opacity-0 transition-all duration-200 group-hover:opacity-100"
                        >
                            <FaRegPenToSquare className="text-base lg:text-lg" />
                        </Link>
                    </div>
                </>
            ) : (
                <Heading className={`text-xl lg:text-3xl ${className}`}>
                    {children}
                </Heading>
            )}
            <div className="h-0.5 w-full bg-stone-700 block lg: mb-2" />
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

Article.Title = Title
Article.Content = Content
