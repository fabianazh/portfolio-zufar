import Heading from '@/components/Typography/Heading'
import FormSkeleton from '@/components/Skeleton/FormSkeleton'
import Empty from '@/components/Other/Empty'
import BackButton from '@/components/Button/BackButton'

export default function ActionLayout({
    className,
    children,
    isLoading,
    isEmpty,
    emptyMessage = 'Belum ada data.',
    loadingSkeleton = <FormSkeleton />,
    returnLink,
}: {
    className?: string
    children: React.ReactNode
    isLoading?: boolean
    isEmpty?: boolean
    emptyMessage?: string
    loadingSkeleton?: React.ReactNode
    returnLink: string
}) {
    return (
        <>
            <section
                className={`w-full h-auto flex flex-col gap-8 mb-14 ${className}`}
            >
                {!isLoading ? (
                    <>
                        <Buttons>
                            <BackButton href={returnLink} />
                        </Buttons>
                        {loadingSkeleton}
                    </>
                ) : isEmpty ? (
                    <>
                        <Buttons>
                            <BackButton href={returnLink} />
                        </Buttons>
                        <Empty fullPage message={emptyMessage} />
                    </>
                ) : (
                    children
                )}
            </section>
        </>
    )
}

function Buttons({
    children,
    className,
}: {
    children?: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={`w-full h-fit items-center justify-between flex z-50 ${className}`}
        >
            {children}
        </div>
    )
}

function Header({ title, desc }: { title: string; desc: string }) {
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

function Content({
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

ActionLayout.Buttons = Buttons
ActionLayout.Header = Header
ActionLayout.Content = Content
