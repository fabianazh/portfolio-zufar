export default function PrimaryButton({
    onClick,
    className,
    children,
    type = 'button' || 'reset' || 'submit',
    disabled,
}: {
    onClick?: () => void
    className?: string
    children: React.ReactNode
    type: 'button' | 'reset' | 'submit'
    disabled?: boolean
}) {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`w-full py-2 max-h-9 px-4 text-xs lg:text-sm text-center rounded shadow-sm bg-black text-white ${className}`}
            >
                {children}
            </button>
        </>
    )
}
