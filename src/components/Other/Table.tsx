export default function Table({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <table
                className={`w-full h-fit flex flex-col gap-3 border p-3 rounded-md bg-white ${className}`}
            >
                {children}
            </table>
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
            <tr className={`w-full h-fit flex items-center gap-4 ${className}`}>
                {children}
            </tr>
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
        <thead
            className={`w-full text-left h-fit flex justify-between gap-3 ${className}`}
        >
            {children}
        </thead>
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
        <th className={`h-fit justify-between gap-1 text-left ${className}`}>
            {children}
        </th>
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
        <tbody className={`w-full h-fit gap-2 flex flex-col ${className}`}>
            {children}
        </tbody>
    )
}

export function Data({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return <td className={`h-auto ${className}`}>{children}</td>
}

Table.Head = Head
Table.Row = Row
Table.Header = Header
Table.Body = Body
Table.Data = Data
