'use client'

import Navbar from '@/components/Partials/Navbar'
import Footer from '@/components/Partials/Footer'
import DashboardMenu from '@/components/Partials/DashboardMenu'
import AppIcon from '@/components/Icon/AppIcon'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <>
            <aside
                className={`w-auto fixed h-screen overflow-hidden z-50 bg-white left-0 top-0 p-16 pr-12  flex-col gap-8 ${
                    pathname.startsWith('/auth') ? 'hidden' : 'hidden lg:flex'
                }`}
            >
                <AppIcon size="lg" />
                <Navbar />
                <Footer />
                <DashboardMenu />
            </aside>
        </>
    )
}
