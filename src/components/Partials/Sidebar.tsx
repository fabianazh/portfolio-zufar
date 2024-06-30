import Navbar from '@/components/Partials/Navbar'
import Footer from '@/components/Partials/Footer'
import DashboardMenu from '@/components/Partials/DashboardMenu'
import AppIcon from '@/components/Other/AppIcon'

export default function Sidebar() {
    return (
        <>
            <aside
                className={`w-auto fixed h-screen overflow-hidden z-50 bg-white left-0 top-0 p-16 pr-12 hidden lg:flex flex-col gap-8`}
            >
                <AppIcon size="lg" />
                <Navbar />
                <Footer />
                <DashboardMenu />
            </aside>
        </>
    )
}
