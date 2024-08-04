import Link from 'next/link'

export default function PrimaryButton({
    onClick,
    className,
    children,
    type,
    disabled,
    theme,
    href,
    as = 'link',
}: {
    onClick?: () => void
    className?: string
    children: React.ReactNode
    type?: 'button' | 'reset' | 'submit'
    disabled?: boolean
    theme: 'black' | 'gray' | 'white' | 'red'
    href?: string
    as?: 'link' | 'button'
}) {
    let bgColor
    switch (theme) {
        case 'gray':
            bgColor =
                'bg-stone-200 text-black font-medium border-stone-200 hover:bg-stone-300 hover:border-stone-300'
            break
        case 'white':
            bgColor =
                'bg-white text-black font-medium border-stone-200 hover:bg-stone-100 shadow-none'
            break
        case 'red':
            bgColor =
                'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700'
            break
        default:
            bgColor = 'bg-black text-white hover:opacity-90 border-black'
    }

    if (as === 'link') {
        return (
            <>
                <Link
                    href={href ?? ''}
                    className={`py-2 max-h-9 px-4 text-xs lg:text-sm text-center rounded transition-all duration-300 shadow-sm border opacity-100 disabled:opacity-80 ${bgColor} ${className}`}
                >
                    {children}
                </Link>
            </>
        )
    }

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`py-2 max-h-9 px-4 text-xs lg:text-sm text-center rounded transition-all duration-300 shadow-sm border opacity-100 disabled:opacity-80 ${bgColor} ${className}`}
            >
                {children}
            </button>
        </>
    )
}
