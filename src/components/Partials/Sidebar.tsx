import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs"
import NavLink from "./NavLink"
import Link from "next/link"

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
                        Drafter
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
                        <Link href={"https://www.instagram.com/zufarrr._"}>
                            <BsInstagram />
                        </Link>
                        <Link href={"https://www.facebook.com/zufar.ali.393"}>
                            <BsFacebook />
                        </Link>
                        <Link href={"https://www.linkedin.com/in/zufar-ms"}>
                            <BsLinkedin />
                        </Link>
                    </div>
                    <div className="w-full text-xs font-medium">
                        <span>
                            &copy; {new Date().getFullYear()}{" "}
                            <Link href={"https://fabianazh.vercel.app"}>
                                Fabianazh
                            </Link>
                            . All rights reserved.
                        </span>
                    </div>
                </div>
            </aside>
        </>
    )
}
