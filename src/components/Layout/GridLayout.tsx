import GridSkeleton from '@/components/Skeleton/GridSkeleton'
import Heading from '@/components/Typography/Heading'

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
    className = 'columns-1 lg:columns-3 gap-x-5',
    children,
    loading,
}: {
    className?: string
    children: React.ReactNode
    loading: boolean
}) {
    return (
        <>
            <div className={`w-full h-full ${className}`}>
                {loading ? <GridSkeleton /> : <>{children}</>}
            </div>
        </>
    )
}

GridLayout.Header = Header
GridLayout.Items = Items
