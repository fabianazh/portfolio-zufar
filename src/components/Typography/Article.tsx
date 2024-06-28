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
            <div className={`w-full h-fit flex flex-col gap-2 ${className}`}>
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
            <Heading className={`${className}`}>{children}</Heading>
            <div className="h-0.5 w-full bg-stone-700 block lg: mb-2" />
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
