import Heading from '@/components/Typography/Heading'
import TableSkeleton from '@/components/Skeleton/TableSkeleton'
import Empty from '@/components/Other/Empty'
import Error from '@/components/Other/Error'

export default function TableLayout({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <section
                className={`w-full h-auto flex flex-col gap-6 ${className}`}
            >
                {children}
            </section>
        </>
    )
}

export function Header({ title, desc }: { title: string; desc: string }) {
    return (
        <>
            <div className="flex flex-col gap-1">
                <Heading className="normal-case">{title}</Heading>
                <span className="w-fit block">{desc}</span>
            </div>
        </>
    )
}

export function Buttons({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex justify-end ${className}`}>
                {children}
            </div>
        </>
    )
}

export function Content({
    className,
    children,
    isLoading,
    isEmpty,
    isError = false,
    emptyMessage = 'Belum ada data.',
}: {
    className?: string
    children: React.ReactNode
    isLoading: boolean
    isEmpty: boolean
    emptyMessage: string
    isError?: boolean
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col gap-4 ${className}`}>
                {isLoading ? (
                    <TableSkeleton />
                ) : isError ? (
                    <Error />
                ) : isEmpty ? (
                    <Empty message={emptyMessage} />
                ) : (
                    children
                )}
            </div>
        </>
    )
}

TableLayout.Header = Header
TableLayout.Buttons = Buttons
TableLayout.Content = Content
