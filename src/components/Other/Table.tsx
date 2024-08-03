export default function Table({
    className = 'py-3 px-3 lg:px-5',
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <table
                className={`w-full h-fit flex flex-col divide-y-2 border rounded-md bg-white ${className}`}
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
            <tr
                className={`w-full h-fit flex items-center gap-2 lg:gap-4 ${className}`}
            >
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
            className={`w-full text-left h-fit flex justify-between gap-3 pb-3 ${className}`}
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
        <th className={`h-fit shrink-0 text-sm lg:text-base text-left ${className}`}>{children}</th>
    )
}

export function Body({
    className = 'gap-2 pt-3',
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <tbody className={`w-full h-fit flex flex-col ${className}`}>
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
    return (
        <td className={`h-auto text-sm lg:text-base shrink-0 ${className}`}>
            {children}
        </td>
    )
}

Table.Head = Head
Table.Row = Row
Table.Header = Header
Table.Body = Body
Table.Data = Data
