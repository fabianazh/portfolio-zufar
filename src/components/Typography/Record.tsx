export default function Record({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <div
                className={`w-full flex justify-between items-start gap-14 ${className}`}
            >
                {children}
            </div>
        </>
    )
}

export function Description({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
        </>
    )
}

export function Year({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <span className={`block text-end text-sm ${className}`}>
                {children}
            </span>
        </>
    )
}

Record.Description = Description
Record.Year = Year
