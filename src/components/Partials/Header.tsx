"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { RxHamburgerMenu } from "react-icons/rx"
import { BiX } from "react-icons/bi"
import Link from "next/link"
import { disableScroll, enableScroll } from "@/utils/controllScroll"
import NavLink from "./NavLink"
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs"

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

    return (
        <>
            <header className="bg-white fixed flex lg:hidden items-center w-screen h-14 z-40 top-0 left-0 shadow">
                <div className="grid grid-cols-2 justify-between w-full relative gap-x-10 top-0 px-6">
                    <div className="w-fit h-full flex place-items-center">
                        <span className="text-xl font-black">
                            ZS
                            <span className="text-yellow-600 inline-block">
                                .
                            </span>
                        </span>
                    </div>

                    <div
                        onClick={() => openNav()}
                        className="flex relative text-2xl xl:hidden z-50"
                    >
                        <BiX
                            className={`text-3xl absolute top-1/2 -translate-y-1/2 -right-0.5 transition-all ${
                                isNavOpen ? "scale-100" : "scale-0"
                            }`}
                        />
                        <RxHamburgerMenu
                            className={`absolute top-1/2 -translate-y-1/2 right-0 transition-all ${
                                isNavOpen ? "scale-0" : "scale-100"
                            }`}
                        />
                    </div>
                </div>
                <nav
                    className={`transition-all absolute w-8/12 duration-500 h-screen flex flex-col top-0 right-0 bg-white py-16 px-10 gap-8 ${
                        isNavOpen
                            ? "-translate-x-0 opacity-100"
                            : "translate-x-full opacity-50"
                    }`}
                >
                    <div className="flex flex-col gap-6">
                        <h1 className="font-black text-4xl">
                            Zufar <span className="block"></span> Syabana
                        </h1>
                        <div className="flex divide-x-2 divide-stone-200">
                            <span className="text-xl font-medium text-stone-500">
                                Drafter
                            </span>
                        </div>
                    </div>
                    <ul className="flex flex-col w-fit justify-between items-start gap-4">
                        <li className="flex p-0">
                            <NavLink href="/">Home</NavLink>
                        </li>
                        <li className="flex p-0">
                            <NavLink href="/about">About</NavLink>
                        </li>
                        <li className="flex p-0">
                            <NavLink href="/projects">Projects</NavLink>
                        </li>
                        <li className="flex p-0">
                            <NavLink href="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="w-full flex flex-col gap-6">
                        <div className="w-full flex gap-2 items-center">
                            <Link href={"https://www.instagram.com/zufarrr._"}>
                                <BsInstagram />
                            </Link>
                            <Link
                                href={"https://www.facebook.com/zufar.ali.393"}
                            >
                                <BsFacebook />
                            </Link>
                            <Link href={"https://www.linkedin.com/in/zufar-ms"}>
                                <BsLinkedin />
                            </Link>
                        </div>
                        <div className="w-full text-sm font-medium">
                            <span>
                                &copy; {new Date().getFullYear()}{" "}
                                <Link href={"https://fabianazh.vercel.app"}>
                                    Fabianazh
                                </Link>
                                . All rights reserved.
                            </span>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Overlay */}
            <div
                onClick={() => openNav()}
                className={`-translate-x-0 w-screen flex transition-all fixed duration-[200] left-0 top-0 h-screen bg-black/60 ${
                    isNavOpen ? "opacity-100 z-30" : "opacity-0 z-0"
                }`}
            ></div>
            {/* End Overlay */}
        </>
    )
}
