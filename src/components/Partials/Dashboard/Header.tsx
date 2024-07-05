'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiX } from 'react-icons/bi'
import { disableScroll, enableScroll } from '@/libs/utils/controllScroll'
import AppIcon from '@/components/Icon/AppIcon'
import Navbar from '@/components/Partials/Navbar'
import Footer from '@/components/Partials/Footer'
import BottomMenu from './BottomMenu'

export const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

    const pathname = usePathname()

    function openNav() {
        setIsNavOpen((isNavOpen) => !isNavOpen)
    }

    useEffect(() => {
        isNavOpen === true ? disableScroll() : enableScroll()
    }, [isNavOpen])

    useEffect(() => {
        setIsNavOpen(false)
    }, [pathname])

    const navItems = [
        {
            text: 'Overview',
            href: '/dashboard',
        },
        {
            text: 'About',
            href: '/dashboard/about',
        },
        {
            text: 'Projects',
            href: '/dashboard/projects',
        },
        {
            text: 'Contact',
            href: '/dashboard/contact',
        },
    ]

    return (
        <>
            <header
                className={`bg-white fixed items-center w-screen h-14 z-40 top-0 left-0 shadow flex lg:hidden`}
            >
                <div className="grid grid-cols-2 justify-between w-full relative gap-x-10 top-0 px-6">
                    <AppIcon size="sm" />

                    <div
                        onClick={() => openNav()}
                        className="flex relative text-2xl xl:hidden z-50"
                    >
                        <BiX
                            className={`text-3xl absolute top-1/2 -translate-y-1/2 -right-0.5 transition-all ${
                                isNavOpen ? 'scale-100' : 'scale-0'
                            }`}
                        />
                        <RxHamburgerMenu
                            className={`absolute top-1/2 -translate-y-1/2 right-0 transition-all ${
                                isNavOpen ? 'scale-0' : 'scale-100'
                            }`}
                        />
                    </div>
                </div>
                <div
                    className={`transition-all absolute w-8/12 duration-500 h-screen flex flex-col top-0 right-0 bg-white pt-16 pb-24 px-8 justify-between ${
                        isNavOpen
                            ? '-translate-x-0 opacity-100'
                            : 'translate-x-full opacity-50'
                    }`}
                >
                    <div className="flex flex-col gap-8 w-full">
                        <AppIcon size="lg" />

                        <Navbar items={navItems} />

                        <Footer />
                    </div>
                    <BottomMenu />
                </div>
            </header>

            {/* Overlay */}
            <div
                onClick={() => openNav()}
                className={`-translate-x-0 w-screen flex transition-all fixed duration-[200] left-0 top-0 h-screen bg-black/60 ${
                    isNavOpen ? 'opacity-100 z-30' : 'opacity-0 z-0'
                }`}
            ></div>
            {/* End Overlay */}
        </>
    )
}
