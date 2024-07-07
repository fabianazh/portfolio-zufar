import Link from 'next/link'

export default function PrimaryButton({
    onClick,
    className,
    children,
    type,
    disabled,
    theme,
    href,
}: {
    onClick?: () => void
    className?: string
    children: React.ReactNode
    type?: 'button' | 'reset' | 'submit'
    disabled?: boolean
    theme: 'black' | 'gray' | 'white' | 'red'
    href?: string
}) {
    let bgColor
    switch (theme) {
        case 'gray':
            bgColor = 'bg-stone-200 text-black font-medium border-stone-200'
            break
        case 'white':
            bgColor = 'bg-white text-black font-medium'
            break
        case 'red':
            bgColor = 'bg-red-500 text-white border-red-500'
            break
        default:
            bgColor = 'bg-black text-white hover:opacity-90 border-black'
    }

    return (
        <>
            {href ? (
                <Link
                    href={href}
                    className={`py-2 max-h-9 px-4 text-xs lg:text-sm text-center rounded transition-all duration-300 shadow-sm border-2 ${bgColor} ${className}`}
                >
                    {children}
                </Link>
            ) : (
                <button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    className={`py-2 max-h-9 px-4 text-xs lg:text-sm text-center rounded transition-all duration-300 shadow-sm ${bgColor} ${className}`}
                >
                    {children}
                </button>
            )}
        </>
    )
}
