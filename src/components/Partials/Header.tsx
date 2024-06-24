"use client"

import { useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import { BiX } from "react-icons/bi"
import Link from "next/link"
import { disableScroll, enableScroll } from "@/utils/controllScroll"

export const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

    let icon = <></>

    isNavOpen
        ? (icon = <BiX className="text-3xl translate-x-1" />)
        : (icon = <RxHamburgerMenu />)

    function openNav(value: boolean) {
        value === true ? disableScroll() : enableScroll()
        setIsNavOpen(value)
    }

    return (
        <>
            <header className="bg-white h-16 grid lg:hidden grid-cols-2 items-center justify-between w-screen px-6 z-50">
                <div className="flex w-fit gap-x-10">
                    <div className="w-fit h-full flex place-items-center">
                        <span className="text-xl font-black">ZS.</span>
                    </div>
                    <nav className="w-fit hidden xl:flex">
                        <ul className="flex justify-between items-center gap-x-7">
                            <li className="flex p-0">
                                <Link
                                    href="/"
                                    className="text-[black] text-[15px] tracking-widest font-black transition-colors duration-300"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="flex p-0">
                                <Link
                                    href="/about"
                                    className="text-[black] text-[15px] tracking-widest font-black transition-colors duration-300"
                                >
                                    About
                                </Link>
                            </li>
                            <li className="flex p-0">
                                <Link
                                    href="/projects"
                                    className="text-[black] text-[15px] tracking-widest font-black transition-colors duration-300"
                                >
                                    Projects
                                </Link>
                            </li>
                            <li className="flex p-0">
                                <Link
                                    href="/contact"
                                    className="text-[black] text-[15px] tracking-widest font-black transition-colors duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div
                    onClick={(isNavOpen) => openNav(!isNavOpen)}
                    className="flex justify-end text-2xl xl:hidden"
                >
                    {icon}
                </div>
            </header>

            {/* Overlay */}
            <div
                onClick={(isNavOpen) => setIsNavOpen(!isNavOpen)}
                className={`nav__burger__overlay opacity-0 ${isNavOpen}`}
            ></div>
            {/* End Overlay */}
        </>
    )
}
