import GridSkeleton from '@/components/Skeleton/GridSkeleton'
import Heading from '@/components/Typography/Heading'
import Empty from '@/components/Other/Empty'

export default function GridLayout({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <section
                className={`w-full h-full min-h-screen flex flex-col gap-6 ${className}`}
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

function Items({
    className = 'columns-1 lg:columns-3 gap-x-5 gap-y-5 lg:gap-y-0',
    children,
    isLoading,
    isEmpty,
    emptyMessage = 'Belum ada data.',
}: {
    className?: string
    children: React.ReactNode
    isLoading?: boolean
    isEmpty?: boolean
    emptyMessage?: string
}) {
    return (
        <>
            <div className={`w-full h-full ${className}`}>
                {isLoading ? (
                    <GridSkeleton />
                ) : isEmpty ? (
                    <Empty message={emptyMessage} />
                ) : (
                    children
                )}
            </div>
        </>
    )
}

GridLayout.Header = Header
GridLayout.Items = Items
