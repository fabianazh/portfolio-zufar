"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BsInstagram, BsLinkedin } from "react-icons/bs"

function NavLink({
    children,
    href,
    className,
}: {
    children: React.ReactNode
    href: string
    className?: string
}) {
    const navActive = usePathname() === href

    return (
        <>
            <Link
                href={href}
                className={`lg:text-base relative w-fit inline-block font-medium group ${className}`}
            >
                {children}
                <div
                    className={`absolute w-full h-0.5 bottom-0 left-0 bg-black origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left ${
                        navActive ? "scale-x-100" : "scale-x-0"
                    }`}
                />
            </Link>
        </>
    )
}

export default function Sidebar() {
    return (
        <>
            <aside
                className={`w-auto fixed h-screen overflow-hidden z-50 bg-white left-0 top-0 p-16 pr-12 hidden lg:flex flex-col gap-8`}
            >
                <h1 className="font-black text-6xl">
                    Zufar <span className="block"></span> Syabana
                </h1>
                <div className="flex divide-x-2 divide-stone-200">
                    <span className="text-lg font-medium text-stone-500">
                        Arsitek
                    </span>
                </div>
                <nav className="w-full h-fit flex">
                    <ul className="flex flex-col w-full h-fit gap-3">
                        <li className="w-fit">
                            <NavLink href={"/"}>Home</NavLink>
                        </li>
                        <li className="w-fit">
                            <NavLink href={"/about"}>About</NavLink>
                        </li>
                        <li className="w-fit">
                            <NavLink href={"/projects"}>Projects</NavLink>
                        </li>
                        <li className="w-fit">
                            <NavLink href={"/contact"}>Contact</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex gap-2 items-center">
                        <Link href={""}>
                            <BsInstagram />
                        </Link>
                        <Link href={""}>
                            <BsLinkedin />
                        </Link>
                    </div>
                    <div className="w-full text-xs font-medium">
                        <span>
                            &copy; {new Date().getFullYear()} Fabianazh. All
                            rights reserved.
                        </span>
                    </div>
                </div>
            </aside>
        </>
    )
}
