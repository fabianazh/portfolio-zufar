"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink({
    children,
    href,
    className,
}: {
    children: React.ReactNode
    href: string
    className?: string
}) {
    const pathname = usePathname()
    let navActive

    if (pathname !== "/" && href !== "/") {
        navActive = pathname.startsWith(href)
    } else {
        navActive = pathname === href
    }

    return (
        <>
            <Link
                href={href}
                className={`text-xl lg:text-base relative w-fit inline-block font-medium group ${className}`}
            >
                {children}
                <div
                    className={`absolute w-full h-0.5 bottom-0 left-0 bg-black origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left ${
                        navActive ? "scale-x-100" : "scale-x-0"
                    }`}
                />
            </Link>
        </>
    )
}
