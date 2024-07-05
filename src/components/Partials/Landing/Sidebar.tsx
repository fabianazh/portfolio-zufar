'use client'

import Navbar from '@/components/Partials/Navbar'
import Footer from '@/components/Partials/Footer'
import AppIcon from '@/components/Icon/AppIcon'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()

    const navItems = [
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
        },
    ]
    return (
        <>
            <aside
                className={`w-auto fixed h-screen overflow-hidden z-50 bg-white left-0 top-0 p-16 pr-12  flex-col gap-8 hidden lg:flex`}
            >
                <AppIcon size="lg" />
                <Navbar items={navItems} />
                <Footer />
            </aside>
        </>
    )
}
