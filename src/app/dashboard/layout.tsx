import type { Metadata } from 'next'
import '../globals.css'
import Sidebar from '@/components/Partials/Sidebar'
import { urbanist } from '../fonts'
import { Header } from '@/components/Partials/Header'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
