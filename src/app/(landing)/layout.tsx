'use client'

import Sidebar from '@/components/Partials/Landing/Sidebar'
import Header from '@/components/Partials/Landing/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ToastProvider } from '@/context/ToastContext'
import { urbanist } from '@/app/fonts'
import { useState, useEffect } from 'react'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false)

    const threshold = 200

    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY

            if (scrollPosition >= threshold) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [threshold])

    return (
        <>
            <ToastProvider>
                <Header isScrolled={isScrolled} />
                <Sidebar />
                <main
                    className={
                        'min-h-screen relative py-24 lg:py-20 z-10 px-5 lg:pr-10 lg:pl-96'
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
        </>
    )
}
