import Link from "next/link"

export default function AppIcon({ className }: { className?: string }) {
    return (
        <>
            <Link
                href={"https://zufarms.vercel.app"}
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
