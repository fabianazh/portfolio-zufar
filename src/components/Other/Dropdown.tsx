import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'

export default function Dropdown({ children }: { children: React.ReactNode }) {
    return <Menu>{children}</Menu>
}

export function Trigger({ children }: { children: React.ReactNode }) {
    return <MenuButton className={'z-50'}>{children}</MenuButton>
}

export function Items({
    children,
    className,
    anchor = 'bottom',
}: {
    children: React.ReactNode
    className?: string
    anchor?: 'bottom' | 'bottom start'
}) {
    return (
        <MenuItems
            anchor={anchor}
            className={`z-50 -translate-x-4 bg-white shadow-sm rounded-md divide-stone-200 border p-1.5 flex flex-col ${className}`}
        >
            {children}
        </MenuItems>
    )
}

export function Divider({ className }: { className?: string }) {
    return <div className={`w-full h-0.5 bg-stone-200 my-1 ${className}`} />
}

export function Item({
    children,
    className,
    href,
    onClick,
    as = 'link',
}: {
    children: React.ReactNode
    className?: string
    href?: string
    onClick?: () => void
    as?: 'link' | 'delete'
}) {
    return (
        <MenuItem>
            {href ? (
                <Link
                    href={href}
                    className={`py-1 px-2 w-full truncate min-w-24 rounded group transition-colors duration-300 text-sm font-medium ${
                        as === 'link'
                            ? 'bg-transparent hover:bg-stone-100'
                            : 'bg-red-500 text-white hover:bg-red-600'
                    } ${className}`}
                >
                    {children}
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={onClick}
                    className={`py-1 px-2 w-full truncate min-w-24 rounded group transition-colors duration-300 text-sm font-medium flex justify-start ${
                        as === 'link'
                            ? 'bg-transparent hover:bg-stone-100'
                            : 'bg-red-500 text-white hover:bg-red-600'
                    } ${className}`}
                >
                    {children}
                </button>
            )}
        </MenuItem>
    )
}

Dropdown.Trigger = Trigger
Dropdown.Items = Items
Dropdown.Divider = Divider
Dropdown.Item = Item
