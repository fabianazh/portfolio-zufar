'use client'

import { SessionProvider } from 'next-auth/react'
import Sidebar from '@/components/Partials/Dashboard/Sidebar'
import { Header } from '@/components/Partials/Dashboard/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastProvider } from '@/app/context/ToastContext'
import { urbanist } from '@/app/fonts'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <SessionProvider>
            <ToastProvider>
                <Header />
                <Sidebar />
                <main
                    className={
                        'min-h-screen relative py-24 lg:py-20 z-10 px-5 lg:pr-6 bg-stone-50/60 lg:pl-96'
                    }
                >
                    {children}
                </main>
                <ToastContainer
                    position="bottom-center"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className={'font-bold'}
                    bodyClassName={() =>
                        `text-base font-medium flex items-center text-black font-black ${urbanist.className}`
                    }
                />
            </ToastProvider>
        </SessionProvider>
    )
}
