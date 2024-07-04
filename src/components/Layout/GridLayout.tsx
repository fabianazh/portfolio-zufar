export default function GridLayout({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div
                className={`w-full h-full columns-1 lg:columns-3 gap-x-5 ${className}`}
            >
                {children}
            </div>
        </>
    )
}
