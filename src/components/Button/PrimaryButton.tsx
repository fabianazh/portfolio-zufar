export default function PrimaryButton({
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
                className={`w-full py-2 px-4 text-sm text-center rounded shadow-sm bg-black text-white ${className}`}
            >
                {children}
            </button>
        </>
    )
}
