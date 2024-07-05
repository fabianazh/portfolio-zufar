import Navbar from '@/components/Partials/Navbar'
import Footer from '@/components/Partials/Footer'
import AppIcon from '@/components/Icon/AppIcon'
import BottomMenu from '@/components/Partials/Dashboard/BottomMenu'

export default function Sidebar() {
    const navItems = [
        {
            text: 'Overview',
            href: '/dashboard',
        },
        {
            text: 'About',
            href: '/dashboard/about',
        },
        {
            text: 'Projects',
            href: '/dashboard/projects',
        },
        {
            text: 'Contact',
            href: '/dashboard/contact',
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
                <BottomMenu />
            </aside>
        </>
    )
}
