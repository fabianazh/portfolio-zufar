import Link from 'next/link'

export default function AppIcon({ className }: { className?: string }) {
    return (
        <>
            <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
                className="w-fit h-full flex place-items-center"
            >
                <span className={`text-xl font-black ${className}`}>
                    ZS
                    <span className="text-yellow-600 inline-block">.</span>
                </span>
            </Link>
        </>
    )
}
