import Link from 'next/link'

export default function AppIcon({
    className,
    size = 'lg' || 'sm',
}: {
    className?: string
    size: string
}) {
    return (
        <>
            <Link href={`/`} className="w-fit h-fit flex place-items-center">
                {size === 'lg' && (
                    <div className="flex flex-col gap-6 lg:gap-8">
                        <h1 className="font-black text-5xl lg:text-6xl">
                            Zufar <span className="block"></span> Syabana
                        </h1>
                        <div className="flex divide-x-2 divide-stone-200">
                            <span className="text-xl font-medium text-stone-500">
                                Drafter
                            </span>
                        </div>
                    </div>
                )}
                {size === 'sm' && (
                    <span className={`text-xl font-black ${className}`}>
                        ZS
                        <span className="text-yellow-600 inline-block">.</span>
                    </span>
                )}
            </Link>
        </>
    )
}
