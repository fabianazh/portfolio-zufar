import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <SessionProvider>{children}</SessionProvider>
}
