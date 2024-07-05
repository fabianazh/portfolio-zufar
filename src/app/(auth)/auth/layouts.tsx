import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SessionProvider>
            <main className="w-screen h-screen flex relative">{children}</main>
        </SessionProvider>
    )
}
