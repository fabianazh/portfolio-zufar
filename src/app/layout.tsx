import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/Partials/Sidebar"
import { urbanist } from "./fonts"
import { Header } from "@/components/Partials/Header"

export const metadata: Metadata = {
    metadataBase: new URL("https://zufarms.vercel.app"),
    keywords: [
        "Zufar Syabana",
        "Zufar Muhammad Ali Syabana",
        "ZufarSyabana",
        "Zufar Syabana Terdekat",
        "Syabana Terdekat",
        "Zufar Portfolio",
        "Zufar Portofolio",
        "Zufar Syabana Portfolio",
    ],
    title: {
        default: "Zufar Syabana",
        template: "%s | Zufar Syabana",
    },
    description: "Drafter Arsitektur",
    openGraph: {
        title: "Zufar Syabana",
        description: "Drafter Arsitektur",
        url: "https://zufarms.vercel.app",
        siteName: "Zufar Syabana",
        locale: "id_ID",
        type: "website",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={urbanist.className}>
                {/* <GradientBackground /> */}
                <Header />
                <Sidebar />
                <main className="min-h-screen relative py-24 lg:py-20 z-10 px-5 lg:pr-10 lg:pl-96">
                    {children}
                </main>
            </body>
        </html>
    )
}
