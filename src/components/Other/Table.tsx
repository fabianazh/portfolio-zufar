export default function Table({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col ${className}`}>
                {children}
            </div>
        </>
    )
}

export function Row({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit ${className}`}>{children}</div>
        </>
    )
}

export function Head({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={`w-full text-left h-fit flex justify-between gap-3 ${className}`}
        >
            {children}
        </div>
    )
}

export function Header({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={`w-full h-fit justify-between gap-1 flex flex-col ${className}`}
        >
            {children}
        </div>
    )
}

export function Body({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={`w-full h-fit justify-between gap-1 flex flex-col ${className}`}
        >
            {children}
        </div>
    )
}

export function Data({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={`w-full h-fit justify-between gap-1 flex flex-col ${className}`}
        >
            {children}
        </div>
    )
}

Table.Head = Head
Table.Row = Row
Table.Header = Header
Table.Body = Body
Table.Data = Data
