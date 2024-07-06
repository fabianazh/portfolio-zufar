import Link from 'next/link'

export default function TotalDataCard({
    title,
    totalData,
    href,
}: {
    title: string
    totalData: number
    href: string
}) {
    return (
        <Link
            href={href}
            className="w-full h-auto border bg-white p-5 rounded-md flex flex-col gap-1"
        >
            <span className="font-medium">{title}</span>
            <div className="w-full flex">
                <span className="font-bold text-3xl block">{totalData}</span>
            </div>
        </Link>
    )
}
