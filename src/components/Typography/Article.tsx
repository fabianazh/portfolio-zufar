import Heading from "./Heading"

export default function Article({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col gap-4 ${className}`}>
                {children}
            </div>
        </>
    )
}

export function Title({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <Heading className={className}>{children}</Heading>
        </>
    )
}

export function Content({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col gap-4 ${className}`}>
                {children}
            </div>
        </>
    )
}

Article.Title = Title
Article.Content = Content
