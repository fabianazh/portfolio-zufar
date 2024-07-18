import type { Metadata } from 'next'
import './globals.css'
import { urbanist } from './fonts'

export const metadata: Metadata = {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    keywords: [
        'Zufar Syabana',
        'Zufar Muhammad Ali Syabana',
        'ZufarSyabana',
        'Zufar Syabana Terdekat',
        'Syabana Terdekat',
        'Zufar Portfolio',
        'Zufar Portofolio',
        'Zufar Syabana Portfolio',
    ],
    title: {
        default: 'Zufar Syabana',
        template: '%s | Zufar Syabana',
    },
    description: 'Drafter Arsitektur',
    openGraph: {
        title: 'Zufar Syabana',
        description: 'Drafter Arsitektur',
        url: process.env.NEXT_PUBLIC_BASE_URL,
        siteName: 'Zufar Syabana',
        locale: 'id_ID',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={urbanist.className}>{children}</body>
        </html>
    )
}
