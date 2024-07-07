import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'

export default function Dropdown({ children }: { children: React.ReactNode }) {
    return <Menu>{children}</Menu>
}

export function Trigger({ children }: { children: React.ReactNode }) {
    return <MenuButton>{children}</MenuButton>
}

export function Items({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <MenuItems
            anchor="bottom"
            className={`z-50 bg-white shadow-sm rounded-md divide-y-2 divide-stone-200 border p-1.5 flex flex-col ${className}`}
        >
            {children}
        </MenuItems>
    )
}

export function Item({
    children,
    className,
    href,
    onClick,
}: {
    children: React.ReactNode
    className?: string
    href?: string
    onClick?: () => void
}) {
    return (
        <MenuItem>
            {href ? (
                <Link
                    href={href}
                    className={`py-1 px-2 w-auto min-w-24 rounded group hover:bg-stone-100 transition-colors duration-300 text-sm font-medium ${className}`}
                >
                    {children}
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={onClick}
                    className={`py-1 px-2 w-auto min-w-24 rounded group hover:bg-stone-100 transition-colors duration-300 text-sm font-medium ${className}`}
                >
                    {children}
                </button>
            )}
        </MenuItem>
    )
}

Dropdown.Trigger = Trigger
Dropdown.Items = Items
Dropdown.Item = Item
