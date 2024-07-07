import Link from 'next/link'

export default function AppIcon({
    className,
    size = 'lg' || 'sm',
    role = true,
}: {
    className?: string
    size: string
    role?: boolean
}) {
    return (
        <>
            {size === 'lg' && (
                <div className="flex w-fit h-fit flex-col gap-6 lg:gap-8">
                    <Link
                        href={`/`}
                        className="font-black text-5xl lg:text-6xl"
                    >
                        Zufar <span className="block"></span> Syabana
                    </Link>
                    <div className="flex divide-x-2 divide-stone-200">
                        <span className="text-xl lg:text-lg font-medium text-stone-500">
                            {role && 'Drafter'}
                        </span>
                    </div>
                </div>
            )}
            {size === 'sm' && (
                <Link href={`/`} className={`text-xl font-black ${className}`}>
                    ZS
                    <span className="text-yellow-600 inline-block">.</span>
                </Link>
            )}
        </>
    )
}
