import Heading from "./Heading"

export default function Article({
    heading,
    className,
    children,
}: {
    heading: string
    className?: string
    children: React.ReactNode
}) {
    return (
        <>
            <div className={`w-full h-fit flex flex-col gap-4 ${className}`}>
                <Heading>{heading}</Heading>
                <div className="w-full h-fit flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </>
    )
}
