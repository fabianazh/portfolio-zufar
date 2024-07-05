'use client'

import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/Partials/Sidebar'
import { Header } from '@/components/Partials/Header'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SessionProvider>
            <Header />
            <Sidebar />
            <main
                className={
                    'min-h-screen relative py-24 lg:py-20 z-10 px-5 lg:pr-10 lg:pl-96'
                }
            >
                {children}
            </main>
        </SessionProvider>
    )
}
