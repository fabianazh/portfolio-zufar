import { urbanist } from "@/app/fonts"

export default function Heading({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <h1
            className={`text-4xl inline-block w-fit uppercase font-semibold ${urbanist.className} ${className}`}
        >
            {children}
        </h1>
    )
}
