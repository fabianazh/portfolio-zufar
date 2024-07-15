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

export function Content({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <div className={`flex flex-col gap-1 ${className}`}>{children}</div>
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

export function Title({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <span className={`font-semibold ${className}`}>{children}</span>
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
            <span className={`${className}`}>{children}</span>
        </>
    )
}

export function List({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <ul className={`flex flex-col gap-1 ${className}`}>{children}</ul>
        </>
    )
}

export function ListItem({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <li className={`text-base list-disc list-inside ${className}`}>
                {children}
            </li>
        </>
    )
}

Record.Content = Content
Record.Title = Title
Record.Description = Description
Record.List = List
Record.ListItem = ListItem
Record.Year = Year
