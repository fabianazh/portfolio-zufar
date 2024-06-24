import { LinkPreview } from "@/components/Other/LinkPreview."

export default function LinkText({
    href,
    children,
    className,
}: {
    href: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <>
            <LinkPreview
                url={href}
                className={`text-blue-800 inline-block mx-0.5 font-medium ${className}`}
            >
                {children}
            </LinkPreview>
        </>
    )
}
