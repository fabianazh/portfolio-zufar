import Sidebar from '@/components/Partials/Landing/Sidebar'
import { Header } from '@/components/Partials/Landing/Header'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Header />
            <Sidebar />
            <main
                className={
                    'min-h-screen relative py-24 lg:py-20 z-10 px-5 lg:pr-10 lg:pl-96'
                }
            >
                {children}
            </main>
        </>
    )
}
