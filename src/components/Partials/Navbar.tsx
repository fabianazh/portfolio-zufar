'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLink({
    children,
    href,
}: {
    children: React.ReactNode
    href: string
}) {
    const pathname = usePathname()
    let navActive
    const isRootPage = ['/', '/dashboard']

    if (isRootPage) {
        navActive = pathname === href
    } else {
        navActive = pathname.startsWith(href)
    }

    return (
        <>
            <Link
                href={href}
                className={`text-xl lg:text-base relative w-fit inline-block font-medium group`}
            >
                {children}
                <div
                    className={`absolute w-full h-0.5 bottom-0 left-0 bg-black origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left ${
                        navActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                />
            </Link>
        </>
    )
}

export default function Navbar() {
    const pathname = usePathname()

    const items = [
        {
            text: 'Home',
            href: '/',
            isDashboardMenu: false,
        },
        {
            text: 'About',
            href: '/about',
            isDashboardMenu: false,
        },
        {
            text: 'Projects',
            href: '/projects',
            isDashboardMenu: false,
        },
        {
            text: 'Contact',
            href: '/contact',
            isDashboardMenu: false,
        },
        {
            text: 'Dashboard',
            href: '/dashboard',
            isDashboardMenu: true,
        },
        {
            text: 'About',
            href: '/dashboard/about',
            isDashboardMenu: true,
        },
        {
            text: 'Projects',
            href: '/dashboard/projects',
            isDashboardMenu: true,
        },
        {
            text: 'Contact',
            href: '/dashboard/contact',
            isDashboardMenu: true,
            isRootPage: true,
        },
    ]

    return (
        <>
            <nav className="w-full h-fit">
                <ul className="flex flex-col w-fit lg:w-full h-fit gap-4 lg:gap-3 justify-between lg:justify-normal items-start">
                    {items.map((item) => {
                        if (
                            pathname.startsWith('/dashboard') &&
                            item.isDashboardMenu === false
                        ) {
                            return
                        } else if (
                            !pathname.includes('/dashboard') &&
                            item.isDashboardMenu === true
                        ) {
                            return
                        }

                        return (
                            <li key={item.href} className={`w-fit`}>
                                <NavLink href={item.href}>{item.text}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
