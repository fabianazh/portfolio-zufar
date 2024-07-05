export default function SecondaryButton({
    onClick,
    className,
    children,
    type = 'button' || 'reset' || 'submit',
}: {
    onClick?: () => void
    className?: string
    children: React.ReactNode
    type: 'button' | 'reset' | 'submit'
}) {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={`w-full py-2 px-4 text-sm text-center rounded shadow-sm bg-stone-200 ${className}`}
            >
                {children}
            </button>
        </>
    )
}
