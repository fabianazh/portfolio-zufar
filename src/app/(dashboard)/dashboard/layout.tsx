'use client'

import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/Partials/Dashboard/Sidebar'
import { Header } from '@/components/Partials/Dashboard/Header'

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
                    'min-h-screen relative py-24 lg:py-20 z-10 px-5 lg:pr-6 bg-stone-50/60 lg:pl-96'
                }
            >
                {children}
            </main>
        </SessionProvider>
    )
}
